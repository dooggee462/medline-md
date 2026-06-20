import { cookies } from "next/headers";
import crypto from "crypto";

/**
 * Autentificare admin simplă, fără dependențe externe.
 * Credențialele și secretul se setează din variabile de mediu (pe server),
 * NU în cod. Vezi .env.example.
 */

const USER = process.env.ADMIN_USER || "admin";
const PASSWORD = process.env.ADMIN_PASSWORD || "";
const SECRET =
  process.env.ADMIN_SESSION_SECRET || "dev-insecure-secret-change-me";

const COOKIE = "medline_admin";
const MAX_AGE = 60 * 60 * 12; // 12 ore

function sign(payload: string): string {
  const data = Buffer.from(payload).toString("base64url");
  const sig = crypto
    .createHmac("sha256", SECRET)
    .update(data)
    .digest("base64url");
  return `${data}.${sig}`;
}

function verify(token: string): boolean {
  const [data, sig] = token.split(".");
  if (!data || !sig) return false;
  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(data)
    .digest("base64url");
  if (
    sig.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  )
    return false;
  try {
    const { exp } = JSON.parse(Buffer.from(data, "base64url").toString());
    return typeof exp === "number" && exp > Date.now();
  } catch {
    return false;
  }
}

/** Verifică user + parolă (constant-time pe parolă) */
export function checkCredentials(user: string, password: string): boolean {
  if (!PASSWORD) return false; // parola nu e setată → login dezactivat
  const userOk = user === USER;
  const a = Buffer.from(password);
  const b = Buffer.from(PASSWORD);
  const passOk = a.length === b.length && crypto.timingSafeEqual(a, b);
  return userOk && passOk;
}

export async function createSession() {
  const token = sign(JSON.stringify({ u: USER, exp: Date.now() + MAX_AGE * 1000 }));
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const token = (await cookies()).get(COOKIE)?.value;
  return token ? verify(token) : false;
}

export const PASSWORD_SET = Boolean(PASSWORD);

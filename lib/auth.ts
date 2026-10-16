import { cookies, headers } from "next/headers";
import crypto from "crypto";

/**
 * Autentificare pentru panou, fără dependențe externe.
 *
 * Două roluri:
 *   admin     — Victor: tot panoul, totalurile și exportul
 *   asistent  — vede și completează doar cazurile repartizate lui
 *
 * Conturile vin din variabile de mediu (vezi .env.example), niciodată din cod:
 *   ADMIN_USER / ADMIN_PASSWORD      contul de administrator
 *   STAFF_ACCOUNTS                   "user:parolă:Nume, user:parolă:Nume"
 */

const SECRET =
  process.env.ADMIN_SESSION_SECRET || "dev-insecure-secret-change-me";

const COOKIE = "medline_admin";
const MAX_AGE = 60 * 60 * 12; // 12 ore

export type Role = "admin" | "asistent";
export type Session = { user: string; role: Role; name: string };
type Account = { password: string; role: Role; name: string };

/** Toate conturile, citite la fiecare cerere: o schimbare în .env prinde la repornire */
function accounts(): Map<string, Account> {
  const map = new Map<string, Account>();

  const admin = process.env.ADMIN_USER || "admin";
  const adminPass = process.env.ADMIN_PASSWORD || "";
  if (adminPass) {
    map.set(admin, { password: adminPass, role: "admin", name: process.env.ADMIN_NAME || "Administrator" });
  }

  for (const entry of (process.env.STAFF_ACCOUNTS || "").split(",")) {
    const [user, password, ...rest] = entry.split(":").map((s) => s.trim());
    if (!user || !password) continue;
    map.set(user, { password, role: "asistent", name: rest.join(":") || user });
  }
  return map;
}

/**
 * Numele cărora li se poate repartiza un caz: administratorul (care merge și
 * el la pacienți) și asistenții, în ordinea din configurare.
 */
export function assignableNames(): string[] {
  const all = [...accounts().values()];
  const ordered = [...all.filter((a) => a.role === "admin"), ...all.filter((a) => a.role === "asistent")];
  // Victor are și conturi de asistent: același nume nu se repetă în listă
  return [...new Set(ordered.map((a) => a.name))];
}

export function displayName(user: string): string {
  return accounts().get(user)?.name || user;
}

function sign(payload: string): string {
  const data = Buffer.from(payload).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
  return `${data}.${sig}`;
}

function read(token: string): Session | null {
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;
  const expected = crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected)))
    return null;
  try {
    const { u, r, n, exp } = JSON.parse(Buffer.from(data, "base64url").toString());
    if (typeof exp !== "number" || exp <= Date.now()) return null;
    if (r !== "admin" && r !== "asistent") return null;
    return { user: String(u), role: r, name: String(n || u) };
  } catch {
    return null;
  }
}

/*
 * Parolele sunt scurte, ca să fie ușor de dictat la telefon, deci limităm
 * încercările: 8 la 10 minute de pe același IP. Fără asta, o parolă simplă se
 * ghicește automat în câteva minute.
 * ponytail: în memorie, se golește la repornire. Un singur container.
 */
const WINDOW = 10 * 60 * 1000;
const attempts = new Map<string, number[]>();

async function tooManyAttempts(): Promise<boolean> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (attempts.size > 500) attempts.clear();
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > 8;
}

/** Verifică user + parolă (comparație constantă în timp) */
export async function checkCredentials(user: string, password: string): Promise<Session | null> {
  if (await tooManyAttempts()) return null;
  const account = accounts().get(user);
  if (!account) return null;
  const a = Buffer.from(password);
  const b = Buffer.from(account.password);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  return { user, role: account.role, name: account.name };
}

export async function createSession(session: Session) {
  const token = sign(
    JSON.stringify({ u: session.user, r: session.role, n: session.name, exp: Date.now() + MAX_AGE * 1000 }),
  );
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

export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  return token ? read(token) : null;
}

export async function isAuthenticated(): Promise<boolean> {
  return (await getSession()) !== null;
}

export const PASSWORD_SET = Boolean(process.env.ADMIN_PASSWORD);

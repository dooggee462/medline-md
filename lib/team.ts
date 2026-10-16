import { promises as fs } from "fs";
import path from "path";
import { DATA_DIR } from "./posts";
import { accountList, getSession, type Role } from "./auth";

/**
 * Numele echipei. Conturile și parolele rămân în .env, dar numele afișate se
 * schimbă din panou (pagina Echipa), fiindcă Victor nu ține minte „asistent 1,
 * asistent 2" și trebuie să le poată corecta singur.
 *
 * Fișierul ține doar suprascrierile: ce nu e aici vine din .env.
 */
const FILE = path.join(DATA_DIR, "team.json");

let cache: Record<string, string> | null = null;

async function overrides(): Promise<Record<string, string>> {
  if (!cache) {
    try {
      cache = JSON.parse(await fs.readFile(FILE, "utf8")) as Record<string, string>;
    } catch {
      cache = {};
    }
  }
  return cache;
}

export type Member = { user: string; role: Role; name: string };

/** Toate conturile, cu numele curent */
export async function team(): Promise<Member[]> {
  const custom = await overrides();
  return accountList().map((a) => ({ ...a, name: custom[a.user] || a.name }));
}

/** Numele afișat al unui cont */
export async function nameOf(user: string): Promise<string> {
  return (await team()).find((m) => m.user === user)?.name || user;
}

/**
 * Numele cărora li se poate repartiza un caz: administratorul primul, apoi
 * asistenții. Victor are mai multe conturi cu același nume, deci se repetă o
 * singură dată.
 */
export async function assignableNames(): Promise<string[]> {
  const all = await team();
  const ordered = [...all.filter((m) => m.role === "admin"), ...all.filter((m) => m.role === "asistent")];
  return [...new Set(ordered.map((m) => m.name))];
}

/** Sesiunea curentă, cu numele luat din echipă: o redenumire prinde imediat */
export async function currentUser(): Promise<Member | null> {
  const session = await getSession();
  if (!session) return null;
  return { user: session.user, role: session.role, name: await nameOf(session.user) };
}

/**
 * Schimbă numele unui cont. Întoarce numele vechi dacă s-a schimbat ceva și
 * dacă niciun alt cont nu îl mai poartă — atunci cazurile vechi trebuie mutate
 * pe numele nou.
 */
export async function setName(user: string, name: string): Promise<string | null> {
  const clean = name.trim().slice(0, 60);
  if (!clean) return null;

  const before = await team();
  const old = before.find((m) => m.user === user)?.name;
  if (!old || old === clean) return null;

  const custom = { ...(await overrides()), [user]: clean };
  cache = custom;
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(custom, null, 2), "utf8");

  // alt cont cu același nume (Victor are trei): cazurile rămân ale lui
  const stillUsed = (await team()).some((m) => m.user !== user && m.name === old);
  return stillUsed ? null : old;
}

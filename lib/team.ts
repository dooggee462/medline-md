import { promises as fs } from "fs";
import path from "path";
import { DATA_DIR } from "./posts";
import { accountList, type Role } from "./auth";
import { fold, renameAssignee } from "./cases";

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

/*
 * Cine e cine pe Telegram, ca să știm pe cine trecem comanda când apasă
 * butonul „Eu plec". Cheia e id-ul numeric al omului sau „@numele" lui de
 * Telegram; valoarea, contul din panou. Id-ul se învață singur la prima
 * apăsare, dacă numele se potrivește.
 */
const TG_FILE = path.join(DATA_DIR, "tg.json");
let tgCache: Record<string, string> | null = null;

export async function tgLinks(): Promise<Record<string, string>> {
  if (!tgCache) {
    try {
      tgCache = JSON.parse(await fs.readFile(TG_FILE, "utf8")) as Record<string, string>;
    } catch {
      tgCache = {};
    }
  }
  return tgCache;
}

async function writeLinks(next: Record<string, string>): Promise<void> {
  tgCache = next;
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(TG_FILE, JSON.stringify(next, null, 2), "utf8");
}

/** Numele de Telegram scris de Victor pentru un cont, dacă există */
export async function tgNameOf(user: string): Promise<string> {
  const links = await tgLinks();
  return Object.keys(links).find((k) => k.startsWith("@") && links[k] === user) || "";
}

/** Leagă un cont de un nume de Telegram; gol = șterge toate legăturile lui */
export async function setTelegramName(user: string, value: string): Promise<void> {
  const clean = value.trim().toLowerCase().replace(/^@?/, "");
  const links = await tgLinks();
  const next = Object.fromEntries(
    Object.entries(links).filter(([k, v]) => v !== user || (clean && !k.startsWith("@"))),
  );
  if (clean) next[`@${clean}`] = user;
  await writeLinks(next);
}

export type TgUser = { id?: number; username?: string; first_name?: string; last_name?: string };

/**
 * Cine a apăsat butonul: întâi după id-ul învățat, apoi după „@numele" scris
 * în pagina Echipa, iar la urmă după numele afișat — dar numai dacă iese un
 * singur om, altfel riscăm să trecem comanda pe cine nu trebuie.
 */
export async function memberFromTelegram(from: TgUser): Promise<Member | null> {
  const links = await tgLinks();
  const all = await team();
  const byUser = (u?: string) => all.find((m) => m.user === u) || null;
  const learn = async (m: Member) => {
    if (from.id) await writeLinks({ ...(await tgLinks()), [String(from.id)]: m.user });
    return m;
  };

  const known = byUser(from.id ? links[String(from.id)] : undefined);
  if (known) return known;

  const named = byUser(from.username ? links[`@${from.username.toLowerCase()}`] : undefined);
  if (named) return learn(named);

  const full = fold(`${from.first_name ?? ""} ${from.last_name ?? ""}`.trim());
  const first = fold(from.first_name ?? "");
  const hits = all.filter((m) => {
    const n = fold(m.name);
    return n === full || (first.length > 2 && n.split(" ")[0] === first);
  });
  // Victor are mai multe conturi cu același nume: contează să fie un singur nume
  if (hits.length && new Set(hits.map((m) => m.name)).size === 1) return learn(hits[0]);
  return null;
}

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

/** Conturile care poartă numele ăsta — Victor are mai multe */
export async function usersNamed(name: string): Promise<string[]> {
  if (!name) return [];
  return (await team()).filter((m) => m.name === name).map((m) => m.user);
}

/** Conturile de administrator: primesc tot */
export async function adminUsers(): Promise<string[]> {
  return (await team()).filter((m) => m.role === "admin").map((m) => m.user);
}

/**
 * Sesiunea curentă, cu numele luat din echipă: o redenumire prinde imediat.
 * „next/headers" se încarcă abia aici, ca fișierul să poată fi folosit și din
 * verificarea reamintirilor, care rulează în afara unei cereri.
 */
export async function currentUser(): Promise<Member | null> {
  const { getSession } = await import("./auth");
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

/*
 * Cazurile create cât timp conturile se numeau „Asistent 1", „Asistent 2" au
 * rămas pe numele acela, deci nu ieșeau la filtrarea după numele real. Le
 * mutăm o singură dată, la prima citire a registrului după pornire.
 */
let synced = false;

export async function syncLegacyNames(): Promise<void> {
  if (synced) return;
  synced = true;
  for (const m of await team()) {
    const numar = m.user.match(/^asistent(\d+)$/)?.[1];
    if (!numar) continue;
    const vechi = `Asistent ${numar}`;
    if (vechi !== m.name) await renameAssignee(vechi, m.name);
  }
}

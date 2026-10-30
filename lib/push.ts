import { promises as fs } from "fs";
import path from "path";
import webpush from "web-push";
import { DATA_DIR } from "./posts";

/**
 * Notificări pe telefon, prin panoul instalat ca aplicație: apar pe ecranul
 * blocat, sună și vibrează. Fiecare om activează o dată, pe telefonul lui.
 *
 * De ce nu Viber sau WhatsApp: un bot de Viber costă ~100 € pe lună, iar
 * WhatsApp cere verificarea firmei și plată pe mesaj. Asta e gratuită și nu
 * depinde de nimeni.
 *
 * Configurare (.env): VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT.
 * Cheile se generează o dată cu:  npx web-push generate-vapid-keys
 */
const FILE = path.join(DATA_DIR, "push.json");

export type PushSub = { endpoint: string; keys: { p256dh: string; auth: string } };
type Store = Record<string, PushSub[]>; // utilizator -> telefoanele lui

export const PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || "";

function configured(): boolean {
  if (!PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) return false;
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || "mailto:info@medline.md",
    PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY,
  );
  return true;
}

let cache: Store | null = null;
let queue: Promise<void> = Promise.resolve();

async function load(): Promise<Store> {
  if (!cache) {
    try {
      cache = JSON.parse(await fs.readFile(FILE, "utf8")) as Store;
    } catch {
      cache = {};
    }
  }
  return cache;
}

function write(fn: (s: Store) => Store): Promise<void> {
  queue = queue
    .then(async () => {
      const next = fn(await load());
      cache = next;
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.writeFile(FILE, JSON.stringify(next), "utf8");
    })
    .catch((e) => console.error("[notificări] scriere eșuată:", e));
  return queue;
}

export async function addSubscription(user: string, sub: PushSub): Promise<void> {
  await write((s) => ({
    ...s,
    [user]: [...(s[user] ?? []).filter((x) => x.endpoint !== sub.endpoint), sub],
  }));
}

export async function removeSubscription(user: string, endpoint: string): Promise<void> {
  await write((s) => ({ ...s, [user]: (s[user] ?? []).filter((x) => x.endpoint !== endpoint) }));
}

/** Pe câte telefoane are omul notificări pornite */
export async function deviceCount(user: string): Promise<number> {
  return (await load())[user]?.length ?? 0;
}

export type PushMessage = { title: string; body: string; url?: string; tag?: string };

/**
 * Trimite către toate telefoanele oamenilor din listă. Un telefon care nu mai
 * există (aplicație ștearsă, notificări oprite) se scoate singur din listă.
 */
export async function sendPush(users: string[], msg: PushMessage): Promise<number> {
  if (!configured()) return 0;
  const store = await load();
  const unici = [...new Set(users)];
  let trimise = 0;

  for (const user of unici) {
    for (const sub of store[user] ?? []) {
      try {
        await webpush.sendNotification(sub, JSON.stringify(msg));
        trimise += 1;
      } catch (e) {
        const code = (e as { statusCode?: number }).statusCode;
        if (code === 404 || code === 410) await removeSubscription(user, sub.endpoint);
        else console.error("[notificări] trimitere eșuată:", code ?? e);
      }
    }
  }
  return trimise;
}

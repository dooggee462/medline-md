import { promises as fs } from "fs";
import path from "path";
import { DATA_DIR } from "./posts";

/**
 * Mesajele către Telegram, pe două grupuri:
 *
 *   „clienti" — cererile lăsate în chatul de pe site
 *   „echipa"  — comenzile către asistenți: cazuri noi, repartizări, reamintiri
 *
 * Grupurile se aleg din panou (pagina Notificări) și se țin în data/telegram.json.
 * Dacă nu e ales niciunul, se folosesc TELEGRAM_CHAT_ID și TELEGRAM_TEAM_CHAT_ID
 * din .env; iar dacă grupul echipei lipsește, comenzile merg tot la clienți, ca
 * să nu se piardă.
 */
const FILE = path.join(DATA_DIR, "telegram.json");

export type Channel = "clienti" | "echipa";
type Chats = Partial<Record<Channel, string>>;

let cache: Chats | null = null;

async function stored(): Promise<Chats> {
  if (!cache) {
    try {
      cache = JSON.parse(await fs.readFile(FILE, "utf8")) as Chats;
    } catch {
      cache = {};
    }
  }
  return cache;
}

export async function chatIds(): Promise<Chats> {
  const s = await stored();
  return {
    clienti: s.clienti || process.env.TELEGRAM_CHAT_ID || "",
    echipa: s.echipa || process.env.TELEGRAM_TEAM_CHAT_ID || "",
  };
}

export async function setChat(channel: Channel, id: string): Promise<void> {
  const next = { ...(await stored()), [channel]: id.trim() };
  cache = next;
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(next, null, 2), "utf8");
}

async function telegram(method: string, body?: unknown) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return null;
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: body ? "POST" : "GET",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
}

export type Group = { id: string; title: string; type: string };

/**
 * Grupurile în care a fost adăugat botul, ca Victor să-l aleagă din panou.
 * Telegram ține evidența doar ~24 de ore, deci grupul trebuie să fi primit un
 * mesaj de curând.
 */
export async function discoverGroups(): Promise<Group[]> {
  try {
    const data = (await telegram("getUpdates")) as {
      result?: Record<string, { chat?: { id: number; title?: string; type: string } }>[];
    } | null;
    const found = new Map<string, Group>();
    for (const update of data?.result ?? []) {
      for (const key of ["message", "my_chat_member", "channel_post", "edited_message"]) {
        const chat = update[key]?.chat;
        if (!chat || chat.type === "private") continue;
        found.set(String(chat.id), { id: String(chat.id), title: chat.title || "fără nume", type: chat.type });
      }
    }
    return [...found.values()];
  } catch (e) {
    console.error("[telegram] nu am putut citi grupurile:", e);
    return [];
  }
}

/** Trimite în grupul potrivit; textul e simplu, fără formatare care s-ar putea strica */
export async function sendTelegram(text: string, channel: Channel = "clienti"): Promise<boolean> {
  const ids = await chatIds();
  const chatId = ids[channel] || ids.clienti;
  if (!process.env.TELEGRAM_BOT_TOKEN || !chatId) return false;

  try {
    await telegram("sendMessage", { chat_id: chatId, text });
    return true;
  } catch (e) {
    console.error("[telegram] trimitere eșuată:", e);
    return false;
  }
}

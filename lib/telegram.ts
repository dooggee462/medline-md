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
 *
 * Fiecare flux poate avea botul lui: TELEGRAM_TEAM_BOT_TOKEN pentru echipă,
 * TELEGRAM_BOT_TOKEN pentru rest. Fără cel de echipă, amândouă merg pe
 * același bot.
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

/** Botul fluxului: cel al echipei dacă e pus, altfel cel principal */
export function tokenFor(channel: Channel): string {
  const team = channel === "echipa" ? process.env.TELEGRAM_TEAM_BOT_TOKEN : "";
  return team || process.env.TELEGRAM_BOT_TOKEN || "";
}

async function telegram(method: string, token: string, body?: unknown) {
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
export async function discoverGroups(channel: Channel = "clienti"): Promise<Group[]> {
  try {
    const data = (await telegram("getUpdates", tokenFor(channel))) as {
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

/** Numele botului unui flux, ca să se știe pe cine adaugi în grup */
const names = new Map<string, string>();
export async function botName(channel: Channel): Promise<string> {
  const token = tokenFor(channel);
  if (!token) return "";
  if (!names.has(token)) {
    try {
      const me = (await telegram("getMe", token)) as { result?: { username?: string } } | null;
      names.set(token, me?.result?.username ? `@${me.result.username}` : "");
    } catch {
      names.set(token, "");
    }
  }
  return names.get(token) || "";
}

export type Button = { text: string; callback_data: string };

/** Trimite în grupul potrivit; textul e simplu, fără formatare care s-ar putea strica */
export async function sendTelegram(
  text: string,
  channel: Channel = "clienti",
  buttons?: Button[],
): Promise<boolean> {
  const ids = await chatIds();
  const token = tokenFor(channel);
  // rezerva pe grupul clienților are sens doar dacă e același bot
  const chatId = ids[channel] || (token === tokenFor("clienti") ? ids.clienti : "");
  if (!token || !chatId) return false;

  try {
    await telegram("sendMessage", token, {
      chat_id: chatId,
      text,
      ...(buttons?.length ? { reply_markup: { inline_keyboard: [buttons] } } : {}),
    });
    return true;
  } catch (e) {
    console.error("[telegram] trimitere eșuată:", e);
    return false;
  }
}

/** Bula care îi apare pe ecran celui care a apăsat butonul */
export async function answerCallback(id: string, text: string, alert = false): Promise<void> {
  try {
    await telegram("answerCallbackQuery", tokenFor("echipa"), {
      callback_query_id: id,
      text,
      show_alert: alert,
    });
  } catch (e) {
    console.error("[telegram] răspunsul la buton nu a plecat:", e);
  }
}

/** Rescrie un mesaj trimis deja și scoate butoanele de pe el */
export async function editMessage(
  chatId: string | number,
  messageId: number,
  text: string,
): Promise<boolean> {
  try {
    await telegram("editMessageText", tokenFor("echipa"), {
      chat_id: chatId,
      message_id: messageId,
      text,
      reply_markup: { inline_keyboard: [] },
    });
    return true;
  } catch (e) {
    console.error("[telegram] rescrierea mesajului a eșuat:", e);
    return false;
  }
}

/** Mesaj direct către un om, în discuția lui privată cu botul echipei */
export async function sendTo(
  chatId: number | string,
  text: string,
  replyMarkup?: unknown,
): Promise<void> {
  try {
    await telegram("sendMessage", tokenFor("echipa"), {
      chat_id: chatId,
      text,
      ...(replyMarkup ? { reply_markup: replyMarkup } : {}),
    });
  } catch (e) {
    console.error("[telegram] mesajul direct nu a plecat:", e);
  }
}

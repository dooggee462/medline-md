import { NextResponse } from "next/server";
import { cleanPath } from "@/lib/leads";
import { sendTelegram } from "@/lib/telegram";
import { sendPush } from "@/lib/push";
import { adminUsers } from "@/lib/team";

/*
 * Datele din chat ajung la clinică pe Telegram: întâi numele și telefonul
 * (obligatorii la deschiderea chatului), apoi, dacă omul apasă „Vreau să mă
 * sunați", o a doua cerere cu serviciul, zona și mesajul.
 * Nu se salvează nimic pe server: numele și telefonul trec direct în mesaj.
 *
 * Configurare (în .env pe server):
 *   TELEGRAM_BOT_TOKEN  tokenul primit de la @BotFather
 *   TELEGRAM_CHAT_ID    ID-ul conversației în care vin cererile (persoană sau grup)
 * Fără ele, endpointul răspunde 503 și chatul oferă WhatsApp și apel direct.
 */

/*
 * Endpointul trimite mesaje pe telefonul unui om, deci limităm: 5 cereri la
 * 10 minute de pe același IP.
 * ponytail: în memorie, se golește la repornire și dacă trec de 1000 de IP-uri.
 * Ajunge pentru un site local; la trafic mare, limitare în Caddy.
 */
const WINDOW = 10 * 60 * 1000;
const hits = new Map<string, number[]>();
function tooMany(ip: string): boolean {
  if (hits.size > 1000) hits.clear();
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const field = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return NextResponse.json({ ok: false }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // câmp ascuns, completat doar de roboții de spam: îi lăsăm să creadă că a mers
  if (field(body.website, 100)) return NextResponse.json({ ok: true });

  const name = field(body.name, 60);
  const phone = field(body.phone, 30);
  const digits = phone.replace(/\D/g, "").length;
  if (!name || digits < 6 || digits > 15) return NextResponse.json({ ok: false }, { status: 400 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (tooMany(ip)) return NextResponse.json({ ok: false }, { status: 429 });

  const service = field(body.service, 100);
  const zone = field(body.zone, 80);
  const message = field(body.message, 500);
  const time = new Intl.DateTimeFormat("ro-RO", {
    timeZone: "Europe/Chisinau",
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());

  // text simplu, fără parse_mode: nimic din ce scrie clientul nu poate strica formatarea
  const text = [
    body.kind === "callback"
      ? "📞 Completare la cererea de mai sus · cere să fie sunat"
      : "🔔 Client nou în chat · medline.md",
    "",
    `👤 ${name}`,
    `📞 ${phone}`,
    service ? `🩺 ${service}` : null,
    zone ? `📍 ${zone}` : null,
    message ? `📝 ${message}` : null,
    "",
    `🌐 ${body.locale === "ru" ? "RU" : "RO"} · ${cleanPath(body.page)} · ${time}`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  await sendPush(await adminUsers(), {
    title: body.kind === "callback" ? `📞 Cere să fie sunat · ${name}` : `🔔 Client nou în chat · ${name}`,
    body: [phone, service, zone, message].filter(Boolean).join(" · "),
    url: "/admin/registru/nou",
  });

  if (!(await sendTelegram(text))) {
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

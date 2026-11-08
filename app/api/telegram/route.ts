import { NextResponse } from "next/server";
import { claimCase } from "@/lib/cases";
import { adminUsers, memberFromTelegram } from "@/lib/team";
import { answerCallback, editMessage } from "@/lib/telegram";
import { sendPush } from "@/lib/push";

/**
 * Ce apasă echipa în grupul de Telegram ajunge aici.
 *
 * Deocamdată un singur buton: „Eu plec la comanda". Primul care apasă ia
 * cazul, mesajul din grup se rescrie cu numele lui, iar al doilea află pe
 * loc că a întârziat — ca să nu plece doi la același pacient și să nu-l sune
 * de două ori.
 *
 * Telegram trimite aici orice apăsare, deci cererea se verifică după
 * TELEGRAM_WEBHOOK_SECRET, antetul pe care îl pune el la fiecare cerere.
 * Legătura se face o singură dată, după instalare:
 *   curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://medline.md/api/telegram&secret_token=<SECRET>"
 */
export const dynamic = "force-dynamic";

const ora = () =>
  new Intl.DateTimeFormat("ro-RO", { timeZone: "Europe/Chisinau", timeStyle: "short" }).format(new Date());

export async function POST(req: Request) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret || req.headers.get("x-telegram-bot-api-secret-token") !== secret) {
    return new NextResponse("nu", { status: 403 });
  }

  const update = await req.json().catch(() => null);
  const cb = update?.callback_query;
  const data = String(cb?.data || "");
  // Telegram reia cererea dacă nu primește 200, deci confirmăm tot ce nu ne privește
  if (!cb || !data.startsWith("claim:")) return NextResponse.json({ ok: true });

  const id = data.slice("claim:".length);
  const who = await memberFromTelegram(cb.from ?? {});
  if (!who) {
    await answerCallback(
      cb.id,
      "Nu te recunosc. Roagă-l pe Victor să-ți scrie numele de Telegram în panou, la Echipa.",
      true,
    );
    return NextResponse.json({ ok: true });
  }

  const { ok, by, item } = await claimCase(id, who.name);
  if (!item) {
    await answerCallback(cb.id, "Cazul nu mai există în registru.", true);
    return NextResponse.json({ ok: true });
  }

  if (ok) {
    // mesajul din grup arată de acum cine pleacă, iar butonul dispare
    const chat = cb.message?.chat?.id;
    const msg = cb.message?.message_id;
    if (chat && msg) {
      await editMessage(chat, msg, `${String(cb.message?.text || "")}\n\n✅ Preluat de ${by}, ora ${ora()}`);
    }
    await answerCallback(cb.id, "Comanda e a ta. Spor!");
    await sendPush(await adminUsers(), {
      title: `🙋 ${by} a luat cazul ${item.no}`,
      body: [item.patient, [item.area, item.address].filter(Boolean).join(", ")].filter(Boolean).join(" · "),
      url: `/admin/registru/${item.id}`,
      tag: `claim-${item.id}`,
    });
  } else {
    await answerCallback(cb.id, `Prea târziu: comanda e deja la ${by}.`, true);
  }

  return NextResponse.json({ ok: true });
}

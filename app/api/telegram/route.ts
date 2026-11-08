import { NextResponse } from "next/server";
import { claimCase } from "@/lib/cases";
import {
  adminUsers,
  linkTelegram,
  memberByPhone,
  memberFromTelegram,
  rememberTelegram,
  tgLabel,
} from "@/lib/team";
import { answerCallback, editMessage, sendTo } from "@/lib/telegram";
import { sendPush } from "@/lib/push";

/**
 * Ce apasă echipa în grupul de Telegram ajunge aici.
 *
 * Tot aici ajunge și discuția privată cu botul: omul apasă „Trimite numărul
 * meu" și îl recunoaștem după numărul scris în panou, la Echipa. Așa merge și
 * pentru cine nu are „@nume" pe Telegram.
 *
 * Butonul din grup: „Eu plec la comanda". Primul care apasă ia
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

  // discuție privată cu botul: „Trimite numărul meu" ne spune cine e omul
  const msg = update?.message;
  if (msg?.chat?.type === "private") {
    await hello(msg);
    return NextResponse.json({ ok: true });
  }

  const cb = update?.callback_query;
  const data = String(cb?.data || "");
  // Telegram reia cererea dacă nu primește 200, deci confirmăm tot ce nu ne privește
  if (!cb || !data.startsWith("claim:")) return NextResponse.json({ ok: true });

  const id = data.slice("claim:".length);
  const who = await memberFromTelegram(cb.from ?? {});
  if (!who) {
    // îl ținem minte: Victor îl leagă de contul lui cu un clic, din pagina Echipa
    await rememberTelegram(cb.from ?? {});
    console.log("[telegram] apăsare de la cineva nelegat:", tgLabel(cb.from ?? {}), cb.from?.id);
    await answerCallback(
      cb.id,
      "Nu te recunosc încă. Victor te vede acum în panou, la Echipa, și te leagă de contul tău. Încearcă din nou după aceea.",
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

/** Chat privat: cerem numărul, iar cu el legăm omul de contul lui din panou */
async function hello(msg: {
  chat?: { id?: number };
  from?: { id?: number };
  contact?: { phone_number?: string; user_id?: number };
}): Promise<void> {
  const chat = msg.chat?.id;
  if (!chat) return;

  const contact = msg.contact;
  if (!contact?.phone_number) {
    await sendTo(
      chat,
      "Salut! Apasă butonul de mai jos ca să-ți recunosc numărul. După asta poți lua comenzi din grup cu „Eu plec la comanda”.",
      {
        keyboard: [[{ text: "📱 Trimite numărul meu", request_contact: true }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    );
    return;
  }

  // numai numărul propriu: altfel oricine ar putea trimite contactul altcuiva
  if (contact.user_id && msg.from?.id && contact.user_id !== msg.from.id) {
    await sendTo(chat, "Trimite propriul tău număr, nu al altcuiva.", { remove_keyboard: true });
    return;
  }

  const who = await memberByPhone(contact.phone_number);
  if (!who) {
    await sendTo(
      chat,
      `Nu găsesc numărul ${contact.phone_number} în echipă. Roagă-l pe Victor să-l scrie în panou, la Echipa, apoi încearcă din nou.`,
      { remove_keyboard: true },
    );
    return;
  }

  if (msg.from?.id) await linkTelegram(String(msg.from.id), who.user);
  await sendTo(chat, `Gata, ${who.name}. De acum butonul din grup te recunoaște.`, {
    remove_keyboard: true,
  });
}

import { markReminded, readCases, type Case } from "./cases";
import { sendTelegram } from "./telegram";
import { sendPush } from "./push";
import { adminUsers, usersNamed } from "./team";
import { localToTimestamp, visitDates } from "./when";

/**
 * Reamintiri înainte de vizită, pe telefon și în grupul asistenților:
 * cu 6 ore, cu 2 ore și cu o oră. La o programare de sâmbătă la 21:00
 * înseamnă 15:00, 19:00 și 20:00.
 *
 * O programare pe mai multe zile (perfuzii 21 sau 30 de zile la rând) ar
 * însemna 90 de mesaje dacă fiecare zi ar primi toate trei. Așa că doar
 * prima zi le primește pe toate, iar în zilele următoare vine avertizarea
 * cu o oră înainte — cea care contează când pleci la pacient.
 *
 * Verificarea rulează în fundal, în același proces cu site-ul (pornită din
 * instrumentation.ts), deci nu cere nimic în plus pe server.
 */
const LEADS = [6, 2, 1];
/** În zilele 2, 3… ale unei programări lungi: doar avertizarea de dinainte */
const NEXT_DAYS = [1];

/** „o oră", „2 ore", „6 ore" */
const ore = (lead: number) => (lead === 1 ? "o oră" : `${lead} ore`);
const EVERY = 5 * 60 * 1000;
/** Fereastră după momentul reamintirii: un caz adăugat mai târziu nu mai primește una veche */
const WINDOW = 45 * 60 * 1000;

function message(c: Case, lead: number, day: string, nth: number, total: number): string {
  return [
    `⏰ Peste ${ore(lead)} · caz ${c.no}${total > 1 ? ` · ziua ${nth} din ${total}` : ""}`,
    "",
    `👤 ${c.patient}${c.age ? `, ${c.age} ani` : ""}`,
    c.phone ? `📞 ${c.phone}` : null,
    c.address || c.area ? `📍 ${[c.area, c.address].filter(Boolean).join(", ")}` : null,
    c.service ? `🩺 ${c.service}` : null,
    `🕐 ${day} ${c.time}`,
    `👩‍⚕️ ${c.assignee || "nerepartizat"}`,
    c.notes ? `📝 ${c.notes}` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

export async function checkReminders(now = Date.now()): Promise<number> {
  const due: { c: Case; lead: number; day: string; nth: number; total: number }[] = [];

  for (const c of await readCases()) {
    if (c.status === "finalizat" || c.status === "anulat") continue;

    // o programare pe mai multe zile primește reamintiri pentru fiecare zi
    const days = visitDates(c.date, c.days);
    days.forEach((day, i) => {
      const visit = localToTimestamp(day, c.time);
      if (visit === null || visit <= now) return;

      for (const lead of i === 0 ? LEADS : NEXT_DAYS) {
        if (c.reminded?.includes(`${day}:${lead}`)) continue;
        const moment = visit - lead * 3600_000;
        if (now >= moment && now < moment + WINDOW)
          due.push({ c, lead, day, nth: i + 1, total: days.length });
      }
    });
  }

  for (const { c, lead, day, nth, total } of due) {
    // marcăm înainte de trimitere: mai bine o reamintire pierdută decât trimisă în buclă
    await markReminded(c.id, `${day}:${lead}`);
    await sendTelegram(message(c, lead, day, nth, total), "echipa");
    await sendPush([...(await adminUsers()), ...(await usersNamed(c.assignee))], {
      title: `⏰ Peste ${ore(lead)} · ${c.patient}${total > 1 ? ` (ziua ${nth}/${total})` : ""}`,
      body: [[c.area, c.address].filter(Boolean).join(", "), c.service, `azi ${c.time}`].filter(Boolean).join(" · "),
      url: `/admin/registru/${c.id}`,
      tag: `${c.id}-${day}-${lead}`,
    });
  }
  return due.length;
}

let started = false;

export function startReminders() {
  if (started) return;
  started = true;
  const run = () => void checkReminders().catch((e) => console.error("[reamintiri] eșec:", e));
  setTimeout(run, 20_000); // după ce pornește serverul
  setInterval(run, EVERY);
  console.log("[reamintiri] pornite: verificare la fiecare 5 minute");
}

import { markReminded, readCases, type Case } from "./cases";
import { sendTelegram } from "./telegram";
import { sendPush } from "./push";
import { adminUsers, usersNamed } from "./team";
import { localToTimestamp } from "./when";

/**
 * Reamintiri în grupul de Telegram înainte de vizită: cu 6 ore și cu 2 ore.
 * La o programare de sâmbătă la 21:00 înseamnă 15:00 și 19:00.
 *
 * Verificarea rulează în fundal, în același proces cu site-ul (pornită din
 * instrumentation.ts), deci nu cere nimic în plus pe server.
 */
const LEADS = [6, 2];
const EVERY = 5 * 60 * 1000;
/** Fereastră după momentul reamintirii: un caz adăugat mai târziu nu mai primește una veche */
const WINDOW = 45 * 60 * 1000;

function message(c: Case, lead: number): string {
  return [
    `⏰ Peste ${lead} ore · caz ${c.no}`,
    "",
    `👤 ${c.patient}${c.age ? `, ${c.age} ani` : ""}`,
    c.phone ? `📞 ${c.phone}` : null,
    c.address || c.area ? `📍 ${[c.area, c.address].filter(Boolean).join(", ")}` : null,
    c.service ? `🩺 ${c.service}` : null,
    `🕐 ${c.date} ${c.time}`,
    `👩‍⚕️ ${c.assignee || "nerepartizat"}`,
    c.notes ? `📝 ${c.notes}` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

export async function checkReminders(now = Date.now()): Promise<number> {
  const due: { c: Case; lead: number }[] = [];

  for (const c of await readCases()) {
    if (c.status === "finalizat" || c.status === "anulat") continue;
    const visit = localToTimestamp(c.date, c.time);
    if (visit === null || visit <= now) continue;

    for (const lead of LEADS) {
      if (c.reminded?.includes(lead)) continue;
      const moment = visit - lead * 3600_000;
      if (now >= moment && now < moment + WINDOW) due.push({ c, lead });
    }
  }

  for (const { c, lead } of due) {
    // marcăm înainte de trimitere: mai bine o reamintire pierdută decât trimisă în buclă
    await markReminded(c.id, lead);
    await sendTelegram(message(c, lead));
    await sendPush([...(await adminUsers()), ...(await usersNamed(c.assignee))], {
      title: `⏰ Peste ${lead} ore · ${c.patient}`,
      body: [[c.area, c.address].filter(Boolean).join(", "), c.service, `azi ${c.time}`].filter(Boolean).join(" · "),
      url: `/admin/registru/${c.id}`,
      tag: `${c.id}-${lead}`,
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

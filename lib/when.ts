/**
 * Ora Moldovei, nu a serverului. Serverul merge pe UTC, iar vizitele se scriu
 * în ora locală, deci o programare la 21:00 trebuie să însemne 21:00 la
 * Chișinău și vara, și iarna.
 */
const TZ = "Europe/Chisinau";

/** Cât e decalajul zonei față de UTC în acel moment (vara +3h, iarna +2h) */
function zoneOffset(ts: number): number {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(ts));
  const get = (type: string) => parts.find((p) => p.type === type)!.value;
  const asIfUtc = Date.parse(
    `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}:${get("second")}Z`,
  );
  return asIfUtc - ts;
}

/**
 * „2026-10-16" + „21:00" (ora Moldovei) → momentul exact, în milisecunde.
 * Întoarce null dacă data sau ora lipsesc ori sunt scrise greșit.
 */
export function localToTimestamp(date: string, time: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) return null;
  const naive = Date.parse(`${date}T${time}:00Z`);
  if (Number.isNaN(naive)) return null;
  // a doua trecere: lângă schimbarea orei, decalajul se ia din momentul corectat
  const once = naive - zoneOffset(naive);
  return naive - zoneOffset(once);
}

/** Ora Moldovei pentru afișare: „azi 21:00" sau „18.10 la 09:30" */
export function localLabel(date: string, time: string): string {
  const [, m, d] = date.split("-");
  return `${d}.${m}${time ? ` la ${time}` : ""}`;
}

/**
 * Zilele unei programări pe mai multe zile: ziua de început și următoarele.
 * „2026-11-08" + 3 → ["2026-11-08", "2026-11-09", "2026-11-10"]
 */
export function visitDates(date: string, days = 1): string[] {
  const n = Math.min(Math.max(Math.round(days) || 1, 1), 31);
  if (n === 1 || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return [date];
  // pornim de la miezul zilei în UTC: adunarea de 24 de ore nu alunecă la schimbarea orei
  const start = Date.parse(`${date}T12:00:00Z`);
  return Array.from({ length: n }, (_, i) => new Date(start + i * 86400_000).toISOString().slice(0, 10));
}

/** „3 zile · 08.11–10.11" pentru afișare; null dacă e o singură zi */
export function daysLabel(date: string, days = 1): string | null {
  const all = visitDates(date, days);
  if (all.length < 2) return null;
  const dm = (d: string) => `${d.slice(8, 10)}.${d.slice(5, 7)}`;
  return `${all.length} zile · ${dm(all[0])}–${dm(all[all.length - 1])}`;
}

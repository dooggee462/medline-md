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

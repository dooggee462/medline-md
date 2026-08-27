import { promises as fs } from "fs";
import path from "path";
import { DATA_DIR } from "./posts";

/**
 * Contorizarea contactelor venite de pe site: apeluri, WhatsApp, Viber,
 * Messenger și programări trimise din formular.
 *
 * Se salvează agregat pe zi → pagină → tip, nu eveniment cu eveniment:
 *   { "2026-08-27": { "/ro/codare": { call: 3, whatsapp: 1 } } }
 *
 * ponytail: fișierul crește cu numărul de pagini distincte pe zi (~1 MB/an la
 * 20 de pagini active). Dacă devine incomod, șterge zilele mai vechi de un an
 * la scriere — datele vechi oricum nu se mai consultă.
 */

const FILE = path.join(DATA_DIR, "leads.json");

/** Tipurile acceptate — endpointul e public, deci nimic în afara listei */
export const LEAD_TYPES = [
  "call",
  "whatsapp",
  "viber",
  "messenger",
  "form",
] as const;
export type LeadType = (typeof LEAD_TYPES)[number];

/** { zi: { pagină: { tip: număr } } } */
export type Leads = Record<string, Record<string, Partial<Record<LeadType, number>>>>;

export function isLeadType(v: unknown): v is LeadType {
  return typeof v === "string" && (LEAD_TYPES as readonly string[]).includes(v);
}

/**
 * Curăță calea primită de la client: păstrează doar path-ul, fără query sau
 * hash, și refuză orice nu arată a rută internă. Fără asta, oricine ar putea
 * umple fișierul cu chei inventate.
 */
export function cleanPath(v: unknown): string {
  if (typeof v !== "string") return "/";
  const p = v.split("?")[0].split("#")[0].trim();
  if (!p.startsWith("/") || p.length > 120 || p.includes("..")) return "/";
  // scoate slash-ul final, ca /ro/blog/ și /ro/blog să nu apară separat
  return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
}

export async function readLeads(): Promise<Leads> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as Leads;
  } catch {
    return {};
  }
}

/** Incrementează contorul de azi pentru tipul și pagina date */
/**
 * Ziua curentă în ora Moldovei, nu UTC: serverul rulează pe UTC, iar Chișinăul
 * e cu 2-3 ore înainte. Cu `toISOString()`, un apel primit la 01:00 noaptea ar
 * fi contorizat pe ziua precedentă — exact intervalul în care clinica lucrează.
 */
function today(): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Chisinau",
  }).format(new Date());
}

export async function recordLead(type: LeadType, page: string): Promise<void> {
  const leads = await readLeads();
  const day = today();
  const byPage = (leads[day] = leads[day] ?? {});
  const counts = (byPage[page] = byPage[page] ?? {});
  counts[type] = (counts[type] ?? 0) + 1;
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(leads), "utf8");
}

export type LeadSummary = {
  total: number;
  byType: Record<LeadType, number>;
  days: { day: string; total: number; byType: Partial<Record<LeadType, number>> }[];
  pages: { page: string; total: number; byType: Partial<Record<LeadType, number>> }[];
};

/** Totaluri pe ultimele `days` zile (implicit 30) */
export function summarize(leads: Leads, days = 30): LeadSummary {
  const from = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Chisinau" })
    .format(new Date(Date.now() - (days - 1) * 864e5));
  const byType = Object.fromEntries(LEAD_TYPES.map((t) => [t, 0])) as Record<LeadType, number>;
  const dayRows: LeadSummary["days"] = [];
  const pageMap = new Map<string, Partial<Record<LeadType, number>>>();
  let total = 0;

  for (const [day, byPage] of Object.entries(leads)) {
    if (day < from) continue;
    const dayCounts: Partial<Record<LeadType, number>> = {};
    let dayTotal = 0;

    for (const [page, counts] of Object.entries(byPage)) {
      const acc = pageMap.get(page) ?? {};
      for (const t of LEAD_TYPES) {
        const n = counts[t] ?? 0;
        if (!n) continue;
        byType[t] += n;
        dayCounts[t] = (dayCounts[t] ?? 0) + n;
        acc[t] = (acc[t] ?? 0) + n;
        dayTotal += n;
      }
      if (Object.keys(acc).length) pageMap.set(page, acc);
    }

    total += dayTotal;
    if (dayTotal) dayRows.push({ day, total: dayTotal, byType: dayCounts });
  }

  dayRows.sort((a, b) => b.day.localeCompare(a.day));
  const pages = [...pageMap.entries()]
    .map(([page, counts]) => ({
      page,
      byType: counts,
      total: LEAD_TYPES.reduce((s, t) => s + (counts[t] ?? 0), 0),
    }))
    .sort((a, b) => b.total - a.total);

  return { total, byType, days: dayRows, pages };
}

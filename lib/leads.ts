import { promises as fs } from "fs";
import path from "path";
import { DATA_DIR } from "./posts";

/**
 * Contorizarea contactelor venite de pe site: apeluri, WhatsApp, Viber,
 * Messenger și programări trimise din formular.
 *
 * Se salvează agregat pe zi și pe tip, nu eveniment cu eveniment — fișierul
 * rămâne mic la nesfârșit și e tot ce trebuie ca să răspunzi la „câți clienți
 * am avut luna asta".
 *
 * ponytail: agregare zi+tip. Dacă va fi nevoie de detalii (ce pagină, ce oră,
 * ce dispozitiv), trece pe un log linie-cu-linie sau pe GA4 — datele de aici
 * nu se pot despărți retroactiv.
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

/** { "2026-08-27": { call: 12, whatsapp: 5 } } */
export type Leads = Record<string, Partial<Record<LeadType, number>>>;

export function isLeadType(v: unknown): v is LeadType {
  return typeof v === "string" && (LEAD_TYPES as readonly string[]).includes(v);
}

export async function readLeads(): Promise<Leads> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as Leads;
  } catch {
    return {};
  }
}

/** Incrementează contorul de azi pentru tipul dat */
export async function recordLead(type: LeadType): Promise<void> {
  const leads = await readLeads();
  const day = new Date().toISOString().slice(0, 10);
  leads[day] = leads[day] ?? {};
  leads[day][type] = (leads[day][type] ?? 0) + 1;
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(leads), "utf8");
}

export type LeadSummary = {
  total: number;
  byType: Record<LeadType, number>;
  days: { day: string; total: number; byType: Partial<Record<LeadType, number>> }[];
};

/** Totaluri pe ultimele `days` zile (implicit 30) */
export function summarize(leads: Leads, days = 30): LeadSummary {
  const from = new Date(Date.now() - (days - 1) * 864e5).toISOString().slice(0, 10);
  const byType = Object.fromEntries(LEAD_TYPES.map((t) => [t, 0])) as Record<LeadType, number>;
  const rows: LeadSummary["days"] = [];
  let total = 0;

  for (const [day, counts] of Object.entries(leads)) {
    if (day < from) continue;
    let dayTotal = 0;
    for (const t of LEAD_TYPES) {
      const n = counts[t] ?? 0;
      byType[t] += n;
      dayTotal += n;
    }
    total += dayTotal;
    if (dayTotal) rows.push({ day, total: dayTotal, byType: counts });
  }
  rows.sort((a, b) => b.day.localeCompare(a.day));
  return { total, byType, days: rows };
}

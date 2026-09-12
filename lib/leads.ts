import { promises as fs } from "fs";
import path from "path";
import { DATA_DIR } from "./posts";

/**
 * Statistici de pe site: vizitatori unici, afișări de pagini și persoanele
 * care au inițiat un contact (apel, WhatsApp, Viber, Messenger, formular).
 *
 * „Persoană" = un ID aleatoriu generat în browser, fără nicio dată personală.
 * Cine apasă de cinci ori pe „Sună" apare o singură dată. Limite: alt telefon,
 * alt browser sau cookie-uri șterse = persoană nouă.
 *
 * Structura: { zi: { views, visitors: [id], contacts: { id: { tip: pagina } } } }
 * Se păstrează ultimele 400 de zile.
 *
 * Fișier separat de leads.json (formatul vechi, fără deduplicare), care rămâne
 * pe disc neatins.
 */

const FILE = path.join(DATA_DIR, "stats.json");
const KEEP_DAYS = 400;

/** Tipurile acceptate — endpointul e public, deci nimic în afara listei */
export const LEAD_TYPES = ["call", "whatsapp", "viber", "messenger", "form"] as const;
export type LeadType = (typeof LEAD_TYPES)[number];

type Day = {
  views: number;
  visitors: string[];
  /** id vizitator -> tip contact -> prima pagină de pe care a contactat */
  contacts: Record<string, Partial<Record<LeadType, string>>>;
};
type Stats = Record<string, Day>;

export function isLeadType(v: unknown): v is LeadType {
  return typeof v === "string" && (LEAD_TYPES as readonly string[]).includes(v);
}

/** ID-ul vine din browser: acceptăm doar forma pe care o generăm noi */
export function isVisitorId(v: unknown): v is string {
  return typeof v === "string" && /^[a-z0-9]{8,32}$/i.test(v);
}

/**
 * Curăță calea primită de la client: doar path, fără query/hash, doar rute
 * interne. Fără asta, oricine ar putea umple fișierul cu chei inventate.
 */
export function cleanPath(v: unknown): string {
  if (typeof v !== "string") return "/";
  const p = v.split("?")[0].split("#")[0].trim();
  if (!p.startsWith("/") || p.length > 120 || p.includes("..")) return "/";
  return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
}

/**
 * Data în ora Moldovei, nu UTC: serverul rulează pe UTC, iar un apel primit la
 * 01:00 noaptea ar ajunge pe ziua precedentă — exact când clinica lucrează.
 */
function dayOf(date: Date): string {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Chisinau" }).format(date);
}

/*
 * ponytail: tot fișierul stă în memorie și se rescrie la fiecare vizită, iar
 * scrierile trec printr-o coadă ca două cereri simultane să nu-și calce
 * modificările. Merge pentru un proces Node și câteva sute de vizite pe zi;
 * la zeci de mii, trece pe SQLite.
 */
let cache: Stats | null = null;
let queue: Promise<void> = Promise.resolve();

async function load(): Promise<Stats> {
  if (!cache) {
    try {
      cache = JSON.parse(await fs.readFile(FILE, "utf8")) as Stats;
    } catch {
      cache = {};
    }
  }
  return cache;
}

function mutate(fn: (s: Stats, day: Day) => void): Promise<void> {
  queue = queue
    .then(async () => {
      const s = await load();
      const today = dayOf(new Date());
      const day = (s[today] ??= { views: 0, visitors: [], contacts: {} });
      fn(s, day);
      const oldest = dayOf(new Date(Date.now() - KEEP_DAYS * 864e5));
      for (const d of Object.keys(s)) if (d < oldest) delete s[d];
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.writeFile(FILE, JSON.stringify(s), "utf8");
    })
    .catch((e) => console.error("[stats] scriere eșuată:", e));
  return queue;
}

export function recordVisit(vid: string): Promise<void> {
  return mutate((_, day) => {
    day.views += 1;
    if (!day.visitors.includes(vid)) day.visitors.push(vid);
  });
}

export function recordContact(vid: string, type: LeadType, page: string): Promise<void> {
  return mutate((_, day) => {
    if (!day.visitors.includes(vid)) day.visitors.push(vid);
    const c = (day.contacts[vid] ??= {});
    c[type] ??= page; // repetările aceleiași persoane nu mai adaugă nimic
  });
}

export type StatsSummary = {
  visitors: number;
  views: number;
  contacters: number;
  /** procent din vizitatori care au inițiat un contact */
  conversion: number;
  byType: Record<LeadType, number>;
  days: { day: string; visitors: number; views: number; contacters: number }[];
  pages: { page: string; people: number; byType: Partial<Record<LeadType, number>> }[];
};

/** Totaluri pe ultimele `days` zile (implicit 30) */
export async function summarize(days = 30): Promise<StatsSummary> {
  await queue;
  const s = await load();
  const from = dayOf(new Date(Date.now() - (days - 1) * 864e5));

  const visitors = new Set<string>();
  const contacters = new Set<string>();
  const byType = Object.fromEntries(LEAD_TYPES.map((t) => [t, new Set<string>()])) as Record<LeadType, Set<string>>;
  const pages = new Map<string, Partial<Record<LeadType, Set<string>>>>();
  const rows: StatsSummary["days"] = [];
  let views = 0;

  for (const [day, d] of Object.entries(s)) {
    if (day < from) continue;
    views += d.views;
    d.visitors.forEach((v) => visitors.add(v));
    for (const [vid, types] of Object.entries(d.contacts)) {
      contacters.add(vid);
      visitors.add(vid);
      for (const [t, page] of Object.entries(types) as [LeadType, string][]) {
        byType[t].add(vid);
        const p = pages.get(page) ?? {};
        (p[t] ??= new Set()).add(vid);
        pages.set(page, p);
      }
    }
    rows.push({
      day,
      visitors: d.visitors.length,
      views: d.views,
      contacters: Object.keys(d.contacts).length,
    });
  }

  rows.sort((a, b) => b.day.localeCompare(a.day));

  return {
    visitors: visitors.size,
    views,
    contacters: contacters.size,
    conversion: visitors.size ? Math.round((contacters.size / visitors.size) * 1000) / 10 : 0,
    byType: Object.fromEntries(LEAD_TYPES.map((t) => [t, byType[t].size])) as Record<LeadType, number>,
    days: rows,
    pages: [...pages.entries()]
      .map(([page, t]) => {
        const all = new Set<string>();
        const counts: Partial<Record<LeadType, number>> = {};
        for (const [type, set] of Object.entries(t) as [LeadType, Set<string>][]) {
          counts[type] = set.size;
          set.forEach((v) => all.add(v));
        }
        return { page, people: all.size, byType: counts };
      })
      .sort((a, b) => b.people - a.people),
  };
}

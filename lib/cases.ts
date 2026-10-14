import { promises as fs } from "fs";
import path from "path";
import { DATA_DIR } from "./posts";
import { SITE } from "./site";

/**
 * Registrul de vizite: cine e pacientul, unde locuiește, ce serviciu cere,
 * cărui asistent i s-a repartizat și cât s-a încasat.
 *
 * ⚠️ Spre deosebire de statistici, fișierul ăsta conține DATE PERSONALE și
 * date despre sănătate. Se citește doar din panou, cu sesiune validă.
 */

const FILE = path.join(DATA_DIR, "cases.json");

export const STATUSES = ["nou", "repartizat", "în lucru", "finalizat", "anulat"] as const;
export type Status = (typeof STATUSES)[number];

export const SOURCES = ["apel", "WhatsApp", "Viber", "chat site", "formular", "recomandare", "alta"] as const;
export const PAYMENTS = ["", "numerar", "transfer"] as const;

/** Sectoarele Chișinăului plus localitățile deservite, din configurația site-ului */
export const AREAS = [
  "Botanica",
  "Buiucani",
  "Centru",
  "Ciocana",
  "Rîșcani",
  "Durlești",
  "Codru",
  ...SITE.areaServed,
];

export type Case = {
  id: string;
  /** Număr de dosar, ex. 2026-0147 */
  no: string;
  date: string; // ziua vizitei, YYYY-MM-DD
  time: string; // ora vizitei, HH:MM (poate lipsi)
  patient: string;
  age: string;
  phone: string;
  contact: string; // persoana de contact (rudă, însoțitor)
  area: string;
  address: string;
  service: string;
  assignee: string;
  status: Status;
  source: string;
  /** Lei încasați; 0 cât timp nu s-a încasat nimic */
  amount: number;
  payment: string;
  notes: string;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt?: string;
};

/*
 * ponytail: un fișier JSON ținut în memorie, cu o coadă de scriere, ca la
 * statistici. Duce câteva mii de dosare, adică ani de lucru. La zeci de mii
 * sau la mai mulți oameni care scriu simultan, se trece pe SQLite.
 */
let cache: Case[] | null = null;
let queue: Promise<void> = Promise.resolve();

export async function readCases(): Promise<Case[]> {
  if (!cache) {
    try {
      cache = JSON.parse(await fs.readFile(FILE, "utf8")) as Case[];
    } catch {
      cache = [];
    }
  }
  return cache;
}

function write(fn: (cases: Case[]) => Case[]): Promise<void> {
  queue = queue
    .then(async () => {
      const next = fn(await readCases());
      cache = next;
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.writeFile(FILE, JSON.stringify(next, null, 2), "utf8");
    })
    .catch((e) => console.error("[registru] scriere eșuată:", e));
  return queue;
}

/** Data de azi în ora Moldovei — serverul rulează pe UTC */
export function today(): string {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Chisinau" }).format(new Date());
}

function stamp(): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Chisinau",
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());
}

/** Următorul număr din anul vizitei: 2026-0001, 2026-0002… */
function nextNo(cases: Case[], date: string): string {
  const year = (date || today()).slice(0, 4);
  const last = cases
    .filter((c) => c.no.startsWith(`${year}-`))
    .map((c) => Number(c.no.slice(5)) || 0)
    .reduce((a, b) => Math.max(a, b), 0);
  return `${year}-${String(last + 1).padStart(4, "0")}`;
}

export async function getCase(id: string): Promise<Case | undefined> {
  return (await readCases()).find((c) => c.id === id);
}

export async function saveCase(input: Omit<Case, "no" | "createdBy" | "createdAt">, user: string): Promise<void> {
  await write((cases) => {
    const i = cases.findIndex((c) => c.id === input.id);
    if (i === -1) {
      return [{ ...input, no: nextNo(cases, input.date), createdBy: user, createdAt: stamp() }, ...cases];
    }
    const next = [...cases];
    next[i] = { ...cases[i], ...input, updatedBy: user, updatedAt: stamp() };
    return next;
  });
}

export async function setStatus(id: string, status: Status, user: string): Promise<void> {
  await write((cases) =>
    cases.map((c) => (c.id === id ? { ...c, status, updatedBy: user, updatedAt: stamp() } : c)),
  );
}

export async function removeCase(id: string): Promise<void> {
  await write((cases) => cases.filter((c) => c.id !== id));
}

export type Filter = {
  month?: string; // YYYY-MM
  assignee?: string;
  status?: string;
  area?: string;
  q?: string;
};

/** Doar cifrele, ca „+373 69 123 456" și „069123456" să se potrivească */
const digits = (s: string) => s.replace(/\D/g, "");

export function filterCases(cases: Case[], f: Filter): Case[] {
  const q = (f.q || "").trim().toLowerCase();
  const qDigits = digits(q);
  return cases
    .filter((c) => !f.month || c.date.startsWith(f.month))
    .filter((c) => !f.assignee || c.assignee === f.assignee)
    .filter((c) => !f.status || c.status === f.status)
    .filter((c) => !f.area || c.area === f.area)
    .filter((c) => {
      if (!q) return true;
      if (qDigits.length >= 3 && digits(c.phone).includes(qDigits)) return true;
      return `${c.patient} ${c.no} ${c.address} ${c.service} ${c.contact}`.toLowerCase().includes(q);
    })
    .sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`));
}

export type Totals = {
  count: number;
  amount: number;
  done: number;
  byAssignee: { name: string; count: number; amount: number }[];
  byService: { name: string; count: number; amount: number }[];
};

export function totals(cases: Case[]): Totals {
  const group = (key: (c: Case) => string) => {
    const map = new Map<string, { name: string; count: number; amount: number }>();
    for (const c of cases) {
      const name = key(c) || "—";
      const row = map.get(name) ?? { name, count: 0, amount: 0 };
      row.count += 1;
      row.amount += c.amount || 0;
      map.set(name, row);
    }
    return [...map.values()].sort((a, b) => b.count - a.count);
  };

  return {
    count: cases.length,
    amount: cases.reduce((s, c) => s + (c.amount || 0), 0),
    done: cases.filter((c) => c.status === "finalizat").length,
    byAssignee: group((c) => c.assignee),
    byService: group((c) => c.service),
  };
}

/** Vizitele anterioare ale aceluiași telefon — „a 3-a vizită, ultima pe…" */
export async function historyFor(phone: string, exceptId?: string): Promise<Case[]> {
  const d = digits(phone);
  if (d.length < 6) return [];
  return (await readCases())
    .filter((c) => c.id !== exceptId && digits(c.phone).endsWith(d.slice(-8)))
    .sort((a, b) => b.date.localeCompare(a.date));
}

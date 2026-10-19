import { promises as fs } from "fs";
import path from "path";
import { DATA_DIR } from "./posts";
import { SERVICE_LIST } from "./content";

/**
 * Prețurile și preparatele, pentru întrebările pacienților. Le scrie Victor,
 * le citesc asistenții pe telefon, în fața pacientului, ca să nu-l mai sune pe
 * el la fiecare întrebare.
 *
 * E internă: stă în spatele parolei, nu apare pe site și nu ajunge în Google.
 */
const FILE = path.join(DATA_DIR, "info.json");

export type InfoItem = {
  service: string;
  price: string;
  /** ce intră în tratament: preparate, materiale */
  included: string;
};

export type Info = {
  items: InfoItem[];
  /** reguli generale, sub tabel */
  notes: string;
  updatedBy: string;
  updatedAt: string;
};

/** Lista goală pornește de la serviciile de pe site, ca să nu le scrie de mână */
export function emptyItems(): InfoItem[] {
  return SERVICE_LIST.map((s) => ({ service: s.ro, price: "", included: "" }));
}

export async function readInfo(): Promise<Info> {
  try {
    const raw = JSON.parse(await fs.readFile(FILE, "utf8"));
    return {
      items: Array.isArray(raw.items) ? raw.items : [],
      // formatul vechi era un singur text; îl păstrăm la observații
      notes: typeof raw.notes === "string" ? raw.notes : typeof raw.text === "string" ? raw.text : "",
      updatedBy: raw.updatedBy ?? "",
      updatedAt: raw.updatedAt ?? "",
    };
  } catch {
    return { items: [], notes: "", updatedBy: "", updatedAt: "" };
  }
}

export async function saveInfo(items: InfoItem[], notes: string, user: string): Promise<void> {
  const info: Info = {
    items: items
      .map((i) => ({
        service: i.service.trim().slice(0, 120),
        price: i.price.trim().slice(0, 60),
        included: i.included.trim().slice(0, 600),
      }))
      .filter((i) => i.service),
    notes: notes.trim().slice(0, 5000),
    updatedBy: user,
    updatedAt: new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Europe/Chisinau",
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date()),
  };
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(info, null, 2), "utf8");
}

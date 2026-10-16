import { promises as fs } from "fs";
import path from "path";
import { DATA_DIR } from "./posts";

/**
 * Pagina de informații pentru asistenți: prețurile pe servicii și preparatele
 * care intră în fiecare tratament. O scrie Victor, o citesc asistenții în fața
 * pacientului, ca să nu-l mai sune pe el la fiecare întrebare.
 *
 * E internă: stă în spatele parolei, nu apare pe site și nu ajunge în Google.
 */
const FILE = path.join(DATA_DIR, "info.json");

export type Info = { text: string; updatedBy: string; updatedAt: string };

const EMPTY: Info = { text: "", updatedBy: "", updatedAt: "" };

export async function readInfo(): Promise<Info> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as Info;
  } catch {
    return EMPTY;
  }
}

export async function saveInfo(text: string, user: string): Promise<void> {
  const info: Info = {
    text: text.slice(0, 50_000),
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

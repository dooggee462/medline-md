import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { getSession } from "@/lib/auth";
import { filterCases, readCases, totals, type Case } from "@/lib/cases";

export const dynamic = "force-dynamic";

/** Antetul fișierului, în ordinea coloanelor */
function row(c: Case) {
  return {
    Nr: c.no,
    Data: c.date,
    Ora: c.time,
    Pacient: c.patient,
    Vârsta: c.age,
    Telefon: c.phone,
    Contact: c.contact,
    Sector: c.area,
    Adresa: c.address,
    Serviciu: c.service,
    Asistent: c.assignee,
    Status: c.status,
    Sursa: c.source,
    "Sumă (lei)": c.amount || 0,
    Plata: c.payment,
    Observații: c.notes,
    "Înregistrat de": c.createdBy,
    "Înregistrat la": c.createdAt,
  };
}

function xlsxFile(cases: Case[]): ArrayBuffer {
  const rows = cases.map(row);
  const sheet = XLSX.utils.json_to_sheet(rows);
  sheet["!cols"] = [10, 11, 7, 22, 7, 16, 22, 12, 34, 24, 14, 12, 12, 11, 11, 30, 14, 16].map((wch) => ({ wch }));
  if (rows.length) {
    sheet["!autofilter"] = { ref: XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: rows.length, c: 17 } }) };
    sheet["!freeze"] = { xSplit: "0", ySplit: "1" };
  }

  const sum = totals(cases);
  const totalRows = [
    { Categorie: "TOTAL", Nume: "", Vizite: sum.count, Lei: sum.amount },
    { Categorie: "", Nume: "", Vizite: "", Lei: "" },
    ...sum.byAssignee.map((r) => ({ Categorie: "Asistent", Nume: r.name, Vizite: r.count, Lei: r.amount })),
    { Categorie: "", Nume: "", Vizite: "", Lei: "" },
    ...sum.byService.map((r) => ({ Categorie: "Serviciu", Nume: r.name, Vizite: r.count, Lei: r.amount })),
  ];
  const totalSheet = XLSX.utils.json_to_sheet(totalRows);
  totalSheet["!cols"] = [{ wch: 12 }, { wch: 32 }, { wch: 9 }, { wch: 12 }];

  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, sheet, "Vizite");
  XLSX.utils.book_append_sheet(book, totalSheet, "Totaluri");
  return XLSX.write(book, { type: "array", bookType: "xlsx" }) as ArrayBuffer;
}

/*
 * CSV pentru Excel în limba română: separator „;", linii CRLF și BOM la
 * început, altfel Excel pune tot rândul într-o singură coloană și strică
 * diacriticele.
 */
function csvFile(cases: Case[]): string {
  const rows = cases.map(row);
  const headers = Object.keys(row(cases[0] ?? ({} as Case)));
  const cell = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [headers.map(cell).join(";"), ...rows.map((r) => headers.map((h) => cell((r as Record<string, unknown>)[h])).join(";"))];
  return `﻿${lines.join("\r\n")}\r\n`;
}

/** Cazurile cerute: fie cele bifate, fie tot ce trece de filtre */
async function selected(ids: string[], f: Record<string, string>): Promise<Case[]> {
  const all = await readCases();
  if (ids.length) {
    const wanted = new Set(ids);
    return all.filter((c) => wanted.has(c.id)).sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`));
  }
  return filterCases(all, { month: f.luna, assignee: f.asistent, status: f.status, area: f.sector, q: f.q });
}

function download(cases: Case[], format: string, label: string) {
  if (format === "csv") {
    return new NextResponse(csvFile(cases), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="registru-medline-${label}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  }
  // Blob: tipul pe care îl acceptă Response pentru conținut binar
  return new NextResponse(new Blob([xlsxFile(cases)]), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="registru-medline-${label}.xlsx"`,
      "Cache-Control": "no-store",
    },
  });
}

/** Fișierul conține datele pacienților, deci doar administratorul îl poate lua */
async function denied() {
  const session = await getSession();
  return !session || session.role !== "admin";
}

/** Export după filtrele din adresă (butoanele „Excel" și „CSV" de sus) */
export async function GET(req: Request) {
  if (await denied()) return new NextResponse("Acces interzis", { status: 403 });
  const p = new URL(req.url).searchParams;
  const f = Object.fromEntries(["luna", "asistent", "status", "sector", "q"].map((k) => [k, p.get(k) || ""]));
  const cases = await selected([], f);
  return download(cases, p.get("format") || "xlsx", f.luna || "tot");
}

/** Export doar al cazurilor bifate în listă */
export async function POST(req: Request) {
  if (await denied()) return new NextResponse("Acces interzis", { status: 403 });
  const fd = await req.formData();
  const ids = fd.getAll("id").map(String).slice(0, 5000);
  const f = Object.fromEntries(["luna", "asistent", "status", "sector", "q"].map((k) => [k, String(fd.get(k) || "")]));
  const cases = await selected(ids, f);
  const label = ids.length ? `selectate-${cases.length}` : f.luna || "tot";
  return download(cases, String(fd.get("format") || "csv"), label);
}

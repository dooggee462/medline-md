"use client";

import { useState } from "react";
import type { InfoItem } from "@/lib/info";

/**
 * Lista de prețuri așa cum o citește asistentul pe telefon: caută după
 * serviciu și vede prețul mare, lângă ce intră în tratament.
 */
export function PriceList({ items }: { items: InfoItem[] }) {
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const shown = needle
    ? items.filter((i) => `${i.service} ${i.included}`.toLowerCase().includes(needle))
    : items;

  return (
    <div className="mt-5">
      <input
        id="cauta"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Caută serviciul…"
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
      />

      {shown.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
          Niciun serviciu care să conțină „{q}”.
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {shown.map((i) => (
            <li key={i.service} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 p-4">
              <p className="min-w-0 flex-1 font-semibold text-slate-800">{i.service}</p>
              <p className="shrink-0 text-lg font-bold tabular-nums text-brand-700">
                {i.price || <span className="text-base font-medium text-slate-300">necompletat</span>}
              </p>
              {i.included && (
                <p className="w-full whitespace-pre-line text-sm text-slate-500">{i.included}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

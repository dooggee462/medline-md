import Link from "next/link";
import { redirect } from "next/navigation";
import { assignableNames, currentUser } from "@/lib/team";
import { SelectAll } from "@/components/admin/SelectAll";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { logoutAction } from "../actions";
import { deleteCaseAction, deleteManyAction, setStatusAction } from "./actions";
import {
  AREAS,
  STATUSES,
  filterCases,
  readCases,
  totals,
  today,
  type Case,
  type Status,
} from "@/lib/cases";

export const dynamic = "force-dynamic";

const CHIP: Record<Status, string> = {
  nou: "bg-amber-100 text-amber-800",
  repartizat: "bg-blue-100 text-blue-800",
  "în lucru": "bg-violet-100 text-violet-800",
  finalizat: "bg-green-100 text-green-800",
  anulat: "bg-slate-200 text-slate-600",
};

const field =
  "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500";

function lei(n: number) {
  return `${n.toLocaleString("ro-RO")} lei`;
}

export default async function RegistryPage({
  searchParams,
}: {
  searchParams: Promise<{ luna?: string; asistent?: string; status?: string; sector?: string; q?: string }>;
}) {
  const session = await currentUser();
  if (!session) redirect("/admin/login");

  const sp = await searchParams;
  const filter = {
    month: sp.luna || "",
    // asistentul vede doar cazurile lui, indiferent ce ar pune în adresă
    assignee: session.role === "admin" ? sp.asistent || "" : session.name,
    status: sp.status || "",
    area: sp.sector || "",
    q: sp.q || "",
  };

  const all = await readCases();
  const cases = filterCases(all, filter);
  const sum = totals(cases);
  const query = new URLSearchParams(
    Object.entries({ luna: sp.luna, asistent: sp.asistent, status: sp.status, sector: sp.sector, q: sp.q }).filter(
      ([, v]) => v,
    ) as [string, string][],
  ).toString();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Registru <span className="text-brand-600">vizite</span>
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="text-slate-500">{session.name}</span>
          <Link href="/admin/informatii" className="font-semibold text-brand-700 hover:underline">
            Informații
          </Link>
          <Link href="/admin/telefon" className="font-medium text-slate-500 hover:text-brand-700">
            Pe telefon
          </Link>
          {session.role === "admin" && (
            <>
              <Link href="/admin/echipa" className="font-semibold text-brand-700 hover:underline">
                Echipa
              </Link>
              <Link href="/admin" className="font-semibold text-brand-700 hover:underline">
                Panou
              </Link>
            </>
          )}
          <form action={logoutAction}>
            <button className="rounded-lg border border-slate-300 px-3 py-1.5 font-semibold text-slate-600 hover:bg-slate-50">
              Ieși
            </button>
          </form>
        </div>
      </header>

      <form className="mt-6 flex flex-wrap items-end gap-2">
        <input type="month" name="luna" defaultValue={sp.luna} className={field} aria-label="Luna" />
        {session.role === "admin" && (
          <select name="asistent" defaultValue={sp.asistent ?? ""} className={field} aria-label="Asistent">
            <option value="">Toți asistenții</option>
            {(await assignableNames()).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        )}
        <select name="status" defaultValue={sp.status ?? ""} className={field} aria-label="Status">
          <option value="">Toate statusurile</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select name="sector" defaultValue={sp.sector ?? ""} className={field} aria-label="Sector">
          <option value="">Toate sectoarele</option>
          {AREAS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <input name="q" defaultValue={sp.q} placeholder="nume, telefon, nr." className={`${field} min-w-[11rem] flex-1`} />
        <button className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900">
          Filtrează
        </button>
        {query && (
          <Link href="/admin/registru" className="px-2 py-2 text-sm text-slate-500 hover:text-slate-700">
            Resetează
          </Link>
        )}
      </form>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-3">
          <Total title="Cazuri" value={String(sum.count)} />
          <Total title="Finalizate" value={String(sum.done)} />
          {session.role === "admin" && <Total title="Încasat" value={lei(sum.amount)} accent />}
        </div>
        <div className="ml-auto flex gap-2">
          <Link
            href="/admin/registru/nou"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            + Caz nou
          </Link>
        </div>
      </div>

      {session.role === "admin" && cases.length > 0 && (
        <form
          id="selectie"
          method="post"
          action="/admin/registru/export"
          className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
        >
          {/* fără bifă, se descarcă tot ce trece de filtrele de mai sus */}
          <input type="hidden" name="luna" value={sp.luna ?? ""} />
          <input type="hidden" name="asistent" value={sp.asistent ?? ""} />
          <input type="hidden" name="status" value={sp.status ?? ""} />
          <input type="hidden" name="sector" value={sp.sector ?? ""} />
          <input type="hidden" name="q" value={sp.q ?? ""} />
          <SelectAll label="Bifează tot" />
          <span className="text-xs text-slate-400">Fără bifă se descarcă toate cele {cases.length} cazuri filtrate.</span>
          <div className="ml-auto flex gap-2">
            <button
              name="format"
              value="csv"
              className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900"
            >
              ⤓ CSV
            </button>
            <button
              name="format"
              value="xlsx"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              ⤓ Excel
            </button>
            <ConfirmButton
              formAction={deleteManyAction}
              message="Ștergi definitiv cazurile bifate? Nu se mai pot recupera."
              className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              Șterge bifate
            </ConfirmButton>
          </div>
        </form>
      )}

      {cases.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
          {all.length === 0 ? "Niciun caz încă. Apasă „Caz nou”." : "Niciun caz pentru filtrul ales."}
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {cases.map((c) => (
            <CaseRow key={c.id} item={c} admin={session.role === "admin"} />
          ))}
        </ul>
      )}

      {session.role === "admin" && sum.count > 0 && (
        <section className="mt-10 grid gap-6 sm:grid-cols-2">
          <Breakdown title="Pe asistent" rows={sum.byAssignee} />
          <Breakdown title="Pe serviciu" rows={sum.byService} />
        </section>
      )}
    </main>
  );
}

function Total({ title, value, accent }: { title: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-2">
      <p className="text-xs text-slate-500">{title}</p>
      <p className={`text-lg font-bold ${accent ? "text-brand-700" : "text-slate-800"}`}>{value}</p>
    </div>
  );
}

function Breakdown({ title, rows }: { title: string; rows: { name: string; count: number; amount: number }[] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="text-sm font-bold text-slate-700">{title}</h2>
      <ul className="mt-2 divide-y divide-slate-100 text-sm">
        {rows.map((r) => (
          <li key={r.name} className="flex items-baseline justify-between gap-3 py-1.5">
            <span className="truncate text-slate-600">{r.name}</span>
            <span className="shrink-0 tabular-nums text-slate-500">
              {r.count} · <strong className="text-slate-800">{lei(r.amount)}</strong>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CaseRow({ item, admin }: { item: Case; admin: boolean }) {
  const map = item.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.address}, ${item.area || "Chișinău"}`)}`
    : null;

  return (
    <li className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {admin && (
          <input
            type="checkbox"
            name="id"
            value={item.id}
            form="selectie"
            aria-label={`Selectează cazul ${item.no}`}
            className="h-4 w-4 self-center accent-brand-600"
          />
        )}
        <Link href={`/admin/registru/${item.id}`} className="font-mono text-sm font-semibold text-brand-700 hover:underline">
          {item.no}
        </Link>
        <span className="text-sm text-slate-500">
          {item.date === today() ? "azi" : item.date}
          {item.time ? ` · ${item.time}` : ""}
        </span>
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${CHIP[item.status]}`}>{item.status}</span>
        {item.amount > 0 && (
          <span className="text-sm font-semibold text-slate-700">{lei(item.amount)}</span>
        )}
        <Link
          href={`/admin/registru/${item.id}`}
          className="ml-auto text-sm font-medium text-slate-400 hover:text-brand-700"
        >
          Deschide →
        </Link>
      </div>

      <div className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
        <span className="font-semibold text-slate-800">{item.patient}</span>
        {item.age && <span className="text-slate-400">{item.age} ani</span>}
        {item.phone && (
          <a href={`tel:${item.phone.replace(/\s/g, "")}`} className="font-medium text-brand-700 hover:underline">
            {item.phone}
          </a>
        )}
      </div>

      <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-slate-500">
        {item.service && <span>{item.service}</span>}
        <span className="text-slate-400">{item.assignee || "nerepartizat"}</span>
        {map ? (
          <a href={map} target="_blank" rel="noopener noreferrer" className="hover:text-brand-700 hover:underline">
            {item.area ? `${item.area}, ` : ""}
            {item.address} ↗
          </a>
        ) : (
          item.area && <span>{item.area}</span>
        )}
      </div>

      {item.notes && <p className="mt-1 text-sm text-slate-400">{item.notes}</p>}

      <form action={setStatusAction} className="mt-2 flex items-center gap-2">
        <input type="hidden" name="id" value={item.id} />
        <select
          name="status"
          defaultValue={item.status}
          aria-label="Schimbă statusul"
          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50">
          Salvează statusul
        </button>
        {admin && (
          <ConfirmButton
            formAction={deleteCaseAction}
            message={`Ștergi definitiv cazul ${item.no} (${item.patient})? Nu se mai poate recupera.`}
            className="rounded-lg border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
          >
            Șterge
          </ConfirmButton>
        )}
        {admin && item.source && <span className="ml-auto text-xs text-slate-400">sursa: {item.source}</span>}
      </form>
    </li>
  );
}

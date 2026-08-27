import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { readLeads, summarize, LEAD_TYPES, type LeadType } from "@/lib/leads";

export const dynamic = "force-dynamic";

const LABELS: Record<LeadType, string> = {
  call: "Apeluri",
  whatsapp: "WhatsApp",
  viber: "Viber",
  messenger: "Messenger",
  form: "Formular",
};

const COLORS: Record<LeadType, string> = {
  call: "bg-brand-600",
  whatsapp: "bg-green-600",
  viber: "bg-purple-600",
  messenger: "bg-blue-600",
  form: "bg-amber-500",
};

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ zile?: string }>;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const { zile } = await searchParams;
  const days = [7, 30, 90, 365].includes(Number(zile)) ? Number(zile) : 30;

  const leads = await readLeads();
  const s = summarize(leads, days);
  const maxDay = Math.max(1, ...s.days.map((d) => d.total));

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Contacte <span className="text-brand-600">de pe site</span>
        </h1>
        <Link href="/admin" className="text-sm font-medium text-slate-500 hover:text-brand-700">
          ← Înapoi la articole
        </Link>
      </header>

      <div className="mt-6 flex gap-2">
        {[7, 30, 90, 365].map((d) => (
          <Link
            key={d}
            href={`/admin/contacte?zile=${d}`}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
              d === days
                ? "bg-brand-600 text-white"
                : "border border-slate-300 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {d === 365 ? "1 an" : `${d} zile`}
          </Link>
        ))}
      </div>

      <p className="mt-8 text-5xl font-extrabold text-slate-900">{s.total}</p>
      <p className="text-slate-500">
        contacte în ultimele {days === 365 ? "12 luni" : `${days} zile`}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {LEAD_TYPES.map((t) => (
          <div key={t} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-2xl font-bold text-slate-900">{s.byType[t]}</p>
            <p className="mt-0.5 text-sm text-slate-500">{LABELS[t]}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-bold text-slate-800">Pe zile</h2>
      {s.days.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          Încă niciun contact înregistrat.
          <span className="mt-1 block text-sm">
            Numărătoarea pornește de la prima apăsare pe un buton de contact de pe site.
          </span>
        </p>
      ) : (
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {s.days.map((d) => (
            <div key={d.day} className="flex items-center gap-4 border-b border-slate-100 px-4 py-3 last:border-0">
              <span className="w-24 shrink-0 text-sm font-medium text-slate-600">
                {new Date(d.day).toLocaleDateString("ro-RO", { day: "numeric", month: "short" })}
              </span>
              <div className="flex h-5 flex-1 overflow-hidden rounded-full bg-slate-100">
                {LEAD_TYPES.map((t) =>
                  d.byType[t] ? (
                    <div
                      key={t}
                      className={COLORS[t]}
                      style={{ width: `${((d.byType[t] ?? 0) / maxDay) * 100}%` }}
                      title={`${LABELS[t]}: ${d.byType[t]}`}
                    />
                  ) : null
                )}
              </div>
              <span className="w-8 shrink-0 text-right text-sm font-bold text-slate-900">
                {d.total}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
        {LEAD_TYPES.map((t) => (
          <span key={t} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${COLORS[t]}`} />
            {LABELS[t]}
          </span>
        ))}
      </div>

      <p className="mt-8 rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-600">
        Se numără apăsările pe butoanele de contact, nu clienții confirmați — aceeași
        persoană care sună de două ori apare de două ori. Cifrele arată cât interes
        generează site-ul, nu câte programări s-au făcut efectiv.
      </p>
    </main>
  );
}

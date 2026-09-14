import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { summarize, LEAD_TYPES, type LeadType } from "@/lib/leads";

export const dynamic = "force-dynamic";

const LABELS: Record<LeadType, string> = {
  call: "Apeluri",
  whatsapp: "WhatsApp",
  viber: "Viber",
  messenger: "Messenger",
  form: "Formular",
  chat: "Chat pe site",
};

const COLORS: Record<LeadType, string> = {
  call: "bg-brand-600",
  whatsapp: "bg-green-600",
  viber: "bg-purple-600",
  messenger: "bg-blue-600",
  form: "bg-amber-500",
  chat: "bg-sky-600",
};

const PERIODS = [7, 30, 90, 365];

export default async function StatsPage({
  searchParams,
}: {
  searchParams: Promise<{ zile?: string }>;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const { zile } = await searchParams;
  const days = PERIODS.includes(Number(zile)) ? Number(zile) : 30;
  const s = await summarize(days);
  const maxVisitors = Math.max(1, ...s.days.map((d) => d.visitors));
  const period = days === 365 ? "ultimele 12 luni" : `ultimele ${days} zile`;

  const cards = [
    { value: s.visitors, label: "vizitatori unici", hint: "persoane diferite care au deschis site-ul" },
    { value: s.views, label: "afișări de pagini", hint: "câte pagini au fost deschise în total" },
    { value: s.contacters, label: "persoane care au contactat", hint: "au sunat sau au scris măcar o dată" },
    { value: `${s.conversion}%`, label: "rata de conversie", hint: "din vizitatori, câți au contactat" },
  ];

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Statistici <span className="text-brand-600">site</span>
        </h1>
        <Link href="/admin" className="text-sm font-medium text-slate-500 hover:text-brand-700">
          ← Înapoi la articole
        </Link>
      </header>

      <div className="mt-6 flex flex-wrap gap-2">
        {PERIODS.map((d) => (
          <Link
            key={d}
            href={`/admin/contacte?zile=${d}`}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
              d === days ? "bg-brand-600 text-white" : "border border-slate-300 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {d === 365 ? "1 an" : `${d} zile`}
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-3xl font-extrabold text-slate-900">{c.value}</p>
            <p className="mt-1 text-sm font-semibold text-slate-700">{c.label}</p>
            <p className="mt-1 text-xs text-slate-500">{c.hint}</p>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-slate-500">Toate cifrele: {period}.</p>

      <h2 className="mt-10 text-lg font-bold text-slate-800">Persoane care au contactat, pe canale</h2>
      <p className="text-sm text-slate-500">
        O persoană care a sunat și a scris pe WhatsApp apare la ambele canale, dar o singură dată în total.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {LEAD_TYPES.map((t) => (
          <div key={t} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="flex items-center gap-2 text-2xl font-bold text-slate-900">
              <span className={`h-2.5 w-2.5 rounded-full ${COLORS[t]}`} />
              {s.byType[t]}
            </p>
            <p className="mt-0.5 text-sm text-slate-500">{LABELS[t]}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-bold text-slate-800">Pe zile</h2>
      {s.days.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          Încă nicio vizită înregistrată în această perioadă.
        </p>
      ) : (
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {s.days.map((d) => (
            <div key={d.day} className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-0">
              <span className="w-16 shrink-0 text-sm font-medium text-slate-600">
                {new Date(`${d.day}T12:00:00`).toLocaleDateString("ro-RO", { day: "numeric", month: "short" })}
              </span>
              <div className="h-4 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full bg-brand-200" style={{ width: `${(d.visitors / maxVisitors) * 100}%` }} />
              </div>
              <span className="w-28 shrink-0 text-right text-xs text-slate-600 sm:w-44 sm:text-sm">
                <strong className="text-slate-900">{d.visitors}</strong> vizitatori ·{" "}
                <strong className={d.contacters ? "text-brand-700" : "text-slate-900"}>{d.contacters}</strong> contacte
              </span>
            </div>
          ))}
        </div>
      )}

      <h2 className="mt-10 text-lg font-bold text-slate-800">De pe ce pagini contactează oamenii</h2>
      {s.pages.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">Încă nimic de arătat.</p>
      ) : (
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {s.pages.map((p) => (
            <div key={p.page} className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-0">
              <a
                href={p.page}
                target="_blank"
                rel="noopener noreferrer"
                title={p.page}
                className="min-w-0 flex-1 truncate text-sm font-medium text-brand-700 hover:underline"
              >
                {p.page}
              </a>
              <span className="hidden shrink-0 gap-2 text-xs text-slate-500 sm:flex">
                {LEAD_TYPES.filter((t) => p.byType[t]).map((t) => (
                  <span key={t} className="flex items-center gap-1">
                    <span className={`h-2 w-2 rounded-full ${COLORS[t]}`} />
                    {p.byType[t]}
                  </span>
                ))}
              </span>
              <span className="w-20 shrink-0 text-right text-sm text-slate-600">
                <strong className="text-slate-900">{p.people}</strong> {p.people === 1 ? "persoană" : "persoane"}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 space-y-2 rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-600">
        <p>
          <strong>Cum se numără o persoană:</strong> fiecare vizitator primește în browser un cod anonim, fără
          nume sau telefon. Cine apasă de mai multe ori pe „Sună" contează o singură dată.
        </p>
        <p>
          <strong>Limite:</strong> aceeași persoană de pe alt telefon sau alt browser apare ca persoană nouă. Iar
          apăsarea butonului nu înseamnă neapărat că apelul s-a încheiat cu o programare.
        </p>
        <p>
          <strong>Pe zile:</strong> cine revine în zile diferite e numărat în fiecare zi, deci suma zilelor poate fi
          mai mare decât totalul de sus.
        </p>
      </div>
    </main>
  );
}

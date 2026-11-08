import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/team";
import { deviceCount, PUBLIC_KEY } from "@/lib/push";
import { botName, chatIds, discoverGroups } from "@/lib/telegram";
import { PushButton } from "@/components/admin/PushButton";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { setChatAction, testTelegramAction } from "./actions";

export const dynamic = "force-dynamic";

const CANALE = [
  { cheie: "echipa" as const, titlu: "Comenzi către asistenți", ce: "cazuri noi, repartizări, reamintiri" },
  { cheie: "clienti" as const, titlu: "Cereri de pe site", ce: "ce lasă oamenii în chatul site-ului" },
];

export default async function NotificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ proba?: string; grup?: string }>;
}) {
  const session = await currentUser();
  if (!session) redirect("/admin/login");

  const { proba, grup } = await searchParams;
  const admin = session.role === "admin";
  const telefoane = await deviceCount(session.user);
  const chats = await chatIds();
  const telegram = Boolean(process.env.TELEGRAM_BOT_TOKEN && (chats.clienti || chats.echipa));
  // grupurile în care a fost adăugat botul fiecărui flux, ca să se aleagă din listă
  const [grupuri, boti] = admin
    ? await Promise.all([
        Promise.all(CANALE.map((c) => discoverGroups(c.cheie))),
        Promise.all(CANALE.map((c) => botName(c.cheie))),
      ])
    : [CANALE.map(() => []), CANALE.map(() => "")];

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/admin/registru" className="text-sm font-medium text-brand-700 hover:underline">
        ← Registru
      </Link>
      <h1 className="mt-3 text-2xl font-extrabold text-slate-900">
        Notificări pe <span className="text-brand-600">telefon</span>
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Anunțurile vin cu sunet, ca un mesaj obișnuit, și se deschid direct pe caz. Fiecare om pornește
        notificările pe telefonul lui.
      </p>

      <div className="mt-6">
        <PushButton publicKey={PUBLIC_KEY} />
      </div>

      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <dt className="text-xs text-slate-500">Telefoanele tale cu notificări</dt>
          <dd className="text-lg font-bold text-slate-800">{telefoane}</dd>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <dt className="text-xs text-slate-500">Grupul de Telegram</dt>
          <dd className={`text-lg font-bold ${telegram ? "text-green-700" : "text-amber-700"}`}>
            {telegram ? "configurat" : "neconfigurat"}
          </dd>
        </div>
      </dl>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="text-sm font-bold text-slate-700">Ce primești</h2>
        <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
          {admin ? (
            <>
              <li>• fiecare caz nou și fiecare repartizare</li>
              <li>• reamintiri cu 6 și cu 2 ore înainte de orice vizită</li>
              <li>• cererile lăsate în chatul de pe site</li>
            </>
          ) : (
            <>
              <li>• cazurile repartizate ție</li>
              <li>• reamintiri cu 6 și cu 2 ore înainte de vizitele tale</li>
            </>
          )}
        </ul>
        <p className="mt-3 text-xs text-slate-400">
          Grupul de Telegram primește în continuare tot, ca rezervă.
        </p>
      </section>

      {admin && (
        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-bold text-slate-700">Grupuri de Telegram</h2>
          <p className="mt-1 text-sm text-slate-500">
            Două fluxuri separate, ca să nu se amestece comenzile echipei cu cererile clienților.
          </p>

          {proba && (
            <p className={`mt-3 rounded-lg p-3 text-sm ${proba === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
              {proba === "ok" ? "Proba a plecat. Verifică grupul." : "Nu a plecat. Grupul nu e ales sau botul nu mai e în el."}
            </p>
          )}
          {grup && <p className="mt-3 rounded-lg bg-green-50 p-3 text-sm text-green-700">Grup salvat.</p>}

          <div className="mt-4 space-y-3">
            {CANALE.map((c, idx) => (
              <div key={c.cheie} className="rounded-lg border border-slate-200 p-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-800">{c.titlu}</p>
                    <p className="text-xs text-slate-500">{c.ce}</p>
                  </div>
                  <span className="text-right">
                    <span className={`block font-mono text-xs ${chats[c.cheie] ? "text-slate-500" : "text-amber-700"}`}>
                      {chats[c.cheie] || "niciun grup"}
                    </span>
                    {boti[idx] && <span className="block font-mono text-xs text-slate-400">{boti[idx]}</span>}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {grupuri[idx].map((g) => (
                    <form key={g.id} action={setChatAction}>
                      <input type="hidden" name="channel" value={c.cheie} />
                      <input type="hidden" name="id" value={g.id} />
                      <button
                        disabled={chats[c.cheie] === g.id}
                        className="rounded-lg border border-brand-200 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-50 disabled:opacity-40"
                      >
                        {chats[c.cheie] === g.id ? `✓ ${g.title}` : `Folosește „${g.title}”`}
                      </button>
                    </form>
                  ))}
                  <form action={testTelegramAction}>
                    <input type="hidden" name="channel" value={c.cheie} />
                    <SubmitButton pendingLabel="…">Trimite o probă</SubmitButton>
                  </form>
                </div>

                {/* dacă grupul nu apare în listă, se lipește ID-ul direct */}
                <form action={setChatAction} className="mt-2 flex flex-wrap gap-2">
                  <input type="hidden" name="channel" value={c.cheie} />
                  <input
                    id={`id_${c.cheie}`}
                    name="id"
                    defaultValue={chats[c.cheie]}
                    placeholder="ID-ul grupului, ex. -1001234567890"
                    className="min-w-[12rem] flex-1 rounded-lg border border-slate-300 px-3 py-1.5 font-mono text-xs outline-none focus:border-brand-500"
                  />
                  <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                    Salvează ID-ul
                  </button>
                </form>
              </div>
            ))}
          </div>

          {grupuri.every((g) => g.length === 0) && (
            <p className="mt-3 text-xs text-slate-400">
              Niciun grup găsit acum. Scrie un mesaj în grup și reîncarcă pagina, sau lipește direct
              ID-ul în câmpul de mai sus.
            </p>
          )}

          <details className="mt-4 text-sm text-slate-600">
            <summary className="cursor-pointer font-semibold">Cum adaugi un grup nou</summary>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>În Telegram, creează grupul, de exemplu „Medline Comenzi echipă”.</li>
              <li>
                Adaugă în el pe asistenți și botul fluxului — numele lui scrie mai sus, în dreapta
                fiecărui flux.
              </li>
              <li>Scrie un mesaj în grup, orice.</li>
              <li>Reîncarcă pagina asta: grupul apare mai sus, îl alegi cu un buton.</li>
              <li>
                Dacă nu apare: în Telegram, deschide grupul în browser (web.telegram.org) și ia numărul
                din adresă, de forma <span className="mono">-100…</span>, apoi lipește-l în câmp.
              </li>
            </ol>
            <p className="mt-2 text-xs text-slate-400">
              Telegram ține minte grupurile doar vreo 24 de ore după ultimul mesaj. Dacă grupul nu apare,
              scrie din nou ceva în el și reîncarcă.
            </p>
          </details>
        </section>
      )}

      <p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
        Pe iPhone, notificările merg doar dacă panoul e pus pe ecranul principal și deschis de acolo, nu
        din Safari. Pașii sunt la{" "}
        <Link href="/admin/telefon" className="font-semibold underline">
          Pe telefon
        </Link>
        .
      </p>
    </main>
  );
}

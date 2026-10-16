import Link from "next/link";
import { redirect } from "next/navigation";
import { SERVICE_LIST } from "@/lib/content";
import { currentUser } from "@/lib/team";
import { readInfo } from "@/lib/info";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { saveInfoAction } from "./actions";

export const dynamic = "force-dynamic";

/**
 * Când pagina e goală, formularul pornește cu toate serviciile prestate, în
 * ordinea de pe site: Victor completează doar prețul și preparatele, nu scrie
 * lista de la zero.
 */
const SABLON = [
  "## Cum folosim pagina asta",
  "Completați prețul și preparatele pentru fiecare serviciu. Ce scrieți aici văd toți asistenții, pe telefon, în fața pacientului.",
  "",
  ...SERVICE_LIST.flatMap((s) => [`## ${s.ro}`, "Preț: ... lei", "Preparate incluse: ...", ""]),
  "## Alte reguli",
  "- medicamentele prescrise: le cumpără pacientul sau le aducem noi, la preț",
  "- deplasarea în suburbii: ...",
].join("\n");

/** Afișare simplă: „## " e titlu, „- " e punct de listă, restul sunt paragrafe */
function Rendered({ text }: { text: string }) {
  return (
    <div className="mt-6 space-y-3 rounded-xl border border-slate-200 bg-white p-5">
      {text.split("\n").map((line, i) => {
        const l = line.trim();
        if (!l) return <div key={i} className="h-2" />;
        if (l.startsWith("## "))
          return (
            <h2 key={i} className="pt-2 text-lg font-bold text-slate-900">
              {l.slice(3)}
            </h2>
          );
        if (l.startsWith("- "))
          return (
            <p key={i} className="pl-4 text-slate-700">
              • {l.slice(2)}
            </p>
          );
        return (
          <p key={i} className="text-slate-700">
            {l}
          </p>
        );
      })}
    </div>
  );
}

export default async function InfoPage({
  searchParams,
}: {
  searchParams: Promise<{ salvat?: string; editare?: string }>;
}) {
  const session = await currentUser();
  if (!session) redirect("/admin/login");

  const info = await readInfo();
  const { salvat, editare } = await searchParams;
  const admin = session.role === "admin";
  const editing = admin && (editare === "1" || !info.text);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/registru" className="text-sm font-medium text-brand-700 hover:underline">
          ← Registru
        </Link>
        {admin && !editing && (
          <Link
            href="/admin/informatii?editare=1"
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Modifică
          </Link>
        )}
      </div>

      <h1 className="mt-3 text-2xl font-extrabold text-slate-900">
        Informații pentru <span className="text-brand-600">echipă</span>
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Prețuri și preparate, pentru întrebările pacienților. Pagină internă: nu apare pe site.
      </p>

      {salvat && (
        <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">Salvat.</p>
      )}

      {editing ? (
        <form action={saveInfoAction} className="mt-6 space-y-3">
          <textarea
            id="text"
            name="text"
            rows={22}
            defaultValue={info.text || SABLON}
            className="w-full rounded-xl border border-slate-300 p-4 font-mono text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
          />
          <p className="text-xs text-slate-400">
            Un rând care începe cu <code>##</code> devine titlu, unul care începe cu <code>-</code> devine
            punct de listă. În rest, scrie normal.
          </p>
          <div className="flex items-center gap-3">
            <SubmitButton pendingLabel="Se salvează…">Salvează</SubmitButton>
            <Link href="/admin/informatii" className="text-sm font-medium text-slate-500 hover:text-slate-700">
              Renunță
            </Link>
          </div>
        </form>
      ) : info.text ? (
        <>
          <Rendered text={info.text} />
          {info.updatedAt && (
            <p className="mt-3 text-xs text-slate-400">
              Actualizat de {info.updatedBy}, {info.updatedAt}
            </p>
          )}
        </>
      ) : (
        <p className="mt-8 rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
          Victor nu a adăugat încă informațiile.
        </p>
      )}
    </main>
  );
}

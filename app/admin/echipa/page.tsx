import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser, team } from "@/lib/team";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { saveTeamAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function TeamPage({
  searchParams,
}: {
  searchParams: Promise<{ salvat?: string }>;
}) {
  const session = await currentUser();
  if (!session) redirect("/admin/login");
  if (session.role !== "admin") redirect("/admin/registru");

  const members = await team();
  const { salvat } = await searchParams;

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/admin/registru" className="text-sm font-medium text-brand-700 hover:underline">
        ← Registru
      </Link>
      <h1 className="mt-3 text-2xl font-extrabold text-slate-900">Echipa</h1>
      <p className="mt-1 text-sm text-slate-500">
        Scrie numele real al fiecărui cont. Numele apare în lista de repartizare, în anunțurile de pe
        Telegram și în fișierele Excel. Parolele se schimbă pe server, nu de aici.
      </p>

      {salvat !== undefined && (
        <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
          Salvat.{" "}
          {Number(salvat) > 0
            ? `${salvat} caz(uri) au trecut pe numele nou.`
            : "Cazurile existente nu au fost afectate."}
        </p>
      )}

      <form action={saveTeamAction} className="mt-6 space-y-3">
        {members.map((m) => (
          <div key={m.user} className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
            <span className="w-24 shrink-0 font-mono text-xs text-slate-400">{m.user}</span>
            <input
              id={`name_${m.user}`}
              name={`name_${m.user}`}
              defaultValue={m.name}
              maxLength={60}
              className="min-w-[12rem] flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                m.role === "admin" ? "bg-brand-100 text-brand-700" : "bg-slate-100 text-slate-500"
              }`}
            >
              {m.role === "admin" ? "administrator" : "asistent"}
            </span>
          </div>
        ))}
        <div className="pt-2">
          <SubmitButton pendingLabel="Se salvează…">Salvează numele</SubmitButton>
        </div>
      </form>

      <p className="mt-6 text-xs text-slate-400">
        Dacă două conturi poartă același nume, cazurile lor se văd împreună — așa sunt legate conturile
        lui Victor.
      </p>
    </main>
  );
}

import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser, pendingTelegram, team, tgNameOf } from "@/lib/team";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { linkTelegramAction, saveTeamAction } from "./actions";

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
  // cine a apăsat butonul din grup și nu a fost recunoscut
  const asteptare = Object.entries(await pendingTelegram());

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
      <p className="mt-2 text-sm text-slate-500">
        În dreapta scrie cum îl cheamă pe om pe Telegram (<span className="font-mono">@ilie</span> sau
        numele afișat), ca butonul „Eu plec la comanda" din grup să treacă cazul pe el. Dacă numele din
        panou e același cu cel din Telegram, se leagă singur la prima apăsare; dacă nu, omul apasă o
        dată și apare mai jos, de unde îl legi cu un clic.
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
        {await Promise.all(members.map(async (m) => (
          <div key={m.user} className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
            <span className="w-24 shrink-0 font-mono text-xs text-slate-400">{m.user}</span>
            <input
              id={`name_${m.user}`}
              name={`name_${m.user}`}
              defaultValue={m.name}
              maxLength={60}
              className="min-w-[12rem] flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
            <input
              id={`tg_${m.user}`}
              name={`tg_${m.user}`}
              defaultValue={await tgNameOf(m.user)}
              maxLength={40}
              placeholder="nume Telegram"
              className="w-32 rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                m.role === "admin" ? "bg-brand-100 text-brand-700" : "bg-slate-100 text-slate-500"
              }`}
            >
              {m.role === "admin" ? "administrator" : "asistent"}
            </span>
          </div>
        )))}
        <div className="pt-2">
          <SubmitButton pendingLabel="Se salvează…">Salvează numele</SubmitButton>
        </div>
      </form>

      {asteptare.length > 0 && (
        <section className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <h2 className="text-sm font-bold text-amber-900">Oameni de pe Telegram, nelegați încă</h2>
          <p className="mt-1 text-sm text-amber-800">
            Au apăsat butonul din grup, dar nu știu al cui cont sunt. Alege contul și apasă „Leagă" —
            după asta, comanda trece pe numele lui. Cine nu e din echipă: „Ignoră".
          </p>
          <ul className="mt-3 space-y-2">
            {asteptare.map(([id, nume]) => (
              <li key={id}>
                <form action={linkTelegramAction} className="flex flex-wrap items-center gap-2">
                  <input type="hidden" name="tgid" value={id} />
                  <span className="min-w-[8rem] flex-1 font-semibold text-slate-800">{nume}</span>
                  <select
                    name="user"
                    defaultValue=""
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm"
                  >
                    <option value="">— alege contul</option>
                    {members.map((m) => (
                      <option key={m.user} value={m.user}>
                        {m.name} ({m.user})
                      </option>
                    ))}
                  </select>
                  <button className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-900">
                    Leagă
                  </button>
                  <button
                    name="ignora"
                    value="1"
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-50"
                  >
                    Ignoră
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-6 text-xs text-slate-400">
        Dacă două conturi poartă același nume, cazurile lor se văd împreună — așa sunt legate conturile
        lui Victor.
      </p>
    </main>
  );
}

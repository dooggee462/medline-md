import Link from "next/link";
import { redirect } from "next/navigation";
import { SITE } from "@/lib/site";
import { currentUser } from "@/lib/team";

export const dynamic = "force-dynamic";

const PASI = [
  {
    titlu: "Pe iPhone",
    pasi: [
      `Deschide ${SITE.url}/admin în Safari (nu în Chrome)`,
      "Autentifică-te cu utilizatorul și parola primite",
      "Apasă butonul de Partajare, pătratul cu săgeata în sus, din bara de jos",
      "Alege „Adaugă la ecranul principal”",
      "Apasă „Adaugă”, sus în dreapta",
      "Deschide aplicația de pe ecran și apasă „Notificări” → „Activează notificările”",
    ],
  },
  {
    titlu: "Pe Android",
    pasi: [
      `Deschide ${SITE.url}/admin în Chrome`,
      "Autentifică-te cu utilizatorul și parola primite",
      "Apasă meniul cu trei puncte, sus în dreapta",
      "Alege „Adaugă la ecranul principal” sau „Instalează aplicația”",
      "Confirmă cu „Adaugă”",
      "Deschide aplicația de pe ecran și apasă „Notificări” → „Activează notificările”",
    ],
  },
];

export default async function PhonePage() {
  const session = await currentUser();
  if (!session) redirect("/admin/login");

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/admin/registru" className="text-sm font-medium text-brand-700 hover:underline">
        ← Registru
      </Link>
      <h1 className="mt-3 text-2xl font-extrabold text-slate-900">Registrul pe telefon</h1>
      <p className="mt-1 text-sm text-slate-500">
        Se pune pe ecranul telefonului ca o aplicație, cu iconiță. Se deschide direct în registru, fără
        să mai cauți adresa.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {PASI.map((p) => (
          <div key={p.titlu} className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="font-bold text-slate-800">{p.titlu}</h2>
            <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-slate-600">
              {p.pasi.map((pas) => (
                <li key={pas}>{pas}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
        Autentificarea ține 12 ore, apoi cere parola din nou. Telefonul o poate reține, ca să nu o
        scrii de fiecare dată.
      </p>
    </main>
  );
}

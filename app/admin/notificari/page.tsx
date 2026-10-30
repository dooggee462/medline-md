import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/team";
import { deviceCount, PUBLIC_KEY } from "@/lib/push";
import { PushButton } from "@/components/admin/PushButton";

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  const session = await currentUser();
  if (!session) redirect("/admin/login");

  const telefoane = await deviceCount(session.user);
  const telegram = Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);

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
          {session.role === "admin" ? (
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

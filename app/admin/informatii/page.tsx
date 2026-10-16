import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/team";
import { emptyItems, readInfo, type InfoItem } from "@/lib/info";
import { PriceList } from "@/components/admin/PriceList";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { saveInfoAction } from "./actions";

export const dynamic = "force-dynamic";

/** Rânduri libere la final, ca să se poată adăuga servicii fără buton special */
const EXTRA = 3;

const input =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

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
  const editing = admin && (editare === "1" || info.items.length === 0);

  // la prima deschidere, serviciile de pe site sunt deja în listă
  const rows: InfoItem[] = [
    ...(info.items.length ? info.items : emptyItems()),
    ...Array.from({ length: EXTRA }, () => ({ service: "", price: "", included: "" })),
  ];

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
            Modifică prețurile
          </Link>
        )}
      </div>

      <h1 className="mt-3 text-2xl font-extrabold text-slate-900">
        Prețuri și <span className="text-brand-600">preparate</span>
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        {editing
          ? "Completează prețul și ce intră în tratament. Un rând fără denumire nu se salvează, deci poți șterge un serviciu ștergându-i numele."
          : "Pentru întrebările pacienților. Pagină internă: nu apare pe site."}
      </p>

      {salvat && <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">Salvat.</p>}

      {editing ? (
        <form action={saveInfoAction} className="mt-6 space-y-3">
          {rows.map((row, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="flex flex-wrap gap-2">
                <input
                  id={`service_${i}`}
                  name={`service_${i}`}
                  defaultValue={row.service}
                  placeholder="Denumirea serviciului"
                  maxLength={120}
                  className={`${input} min-w-[12rem] flex-[3]`}
                />
                <input
                  id={`price_${i}`}
                  name={`price_${i}`}
                  defaultValue={row.price}
                  placeholder="Preț, ex. 400 lei"
                  maxLength={60}
                  className={`${input} min-w-[8rem] flex-1`}
                />
              </div>
              <input
                id={`included_${i}`}
                name={`included_${i}`}
                defaultValue={row.included}
                placeholder="Ce intră în tratament: preparate, materiale"
                maxLength={300}
                className={`${input} mt-2`}
              />
            </div>
          ))}

          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <label htmlFor="notes" className="mb-1 block text-sm font-medium text-slate-700">
              Alte reguli, pentru toate serviciile
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              defaultValue={info.notes}
              placeholder="Ex.: medicamentele prescrise le cumpără pacientul sau le aducem noi, la preț. Deplasarea în suburbii: ..."
              className={input}
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <SubmitButton pendingLabel="Se salvează…">Salvează</SubmitButton>
            {info.items.length > 0 && (
              <Link href="/admin/informatii" className="text-sm font-medium text-slate-500 hover:text-slate-700">
                Renunță
              </Link>
            )}
          </div>
        </form>
      ) : (
        <>
          <PriceList items={info.items} />
          {info.notes && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
              <h2 className="text-sm font-bold text-slate-700">Alte reguli</h2>
              <p className="mt-1 whitespace-pre-line text-sm text-slate-600">{info.notes}</p>
            </div>
          )}
          {info.updatedAt && (
            <p className="mt-3 text-xs text-slate-400">
              Actualizat de {info.updatedBy}, {info.updatedAt}
            </p>
          )}
        </>
      )}
    </main>
  );
}

import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession, staffNames } from "@/lib/auth";
import { getCase, historyFor } from "@/lib/cases";
import { CaseForm } from "@/components/admin/CaseForm";
import { saveCaseAction, deleteCaseAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditCasePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const { error } = await searchParams;
  const item = await getCase(id);
  if (!item) notFound();
  // asistentul deschide doar cazurile lui
  if (session.role !== "admin" && item.assignee !== session.name) redirect("/admin/registru");

  const history = await historyFor(item.phone, item.id);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin/registru" className="text-sm font-medium text-brand-700 hover:underline">
        ← Registru
      </Link>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Caz <span className="text-brand-600">{item.no}</span>
        </h1>
        {session.role === "admin" && (
          <form action={deleteCaseAction}>
            <input type="hidden" name="id" value={item.id} />
            <button className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50">
              Șterge cazul
            </button>
          </form>
        )}
      </div>
      <CaseForm
        action={saveCaseAction}
        session={session}
        staff={staffNames()}
        value={item}
        history={history}
        error={error}
      />
    </main>
  );
}

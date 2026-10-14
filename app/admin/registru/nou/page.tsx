import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, staffNames } from "@/lib/auth";
import { CaseForm } from "@/components/admin/CaseForm";
import { saveCaseAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewCasePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  const { error } = await searchParams;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin/registru" className="text-sm font-medium text-brand-700 hover:underline">
        ← Registru
      </Link>
      <h1 className="mt-3 text-2xl font-extrabold text-slate-900">Caz nou</h1>
      <CaseForm action={saveCaseAction} session={session} staff={staffNames()} error={error} />
    </main>
  );
}

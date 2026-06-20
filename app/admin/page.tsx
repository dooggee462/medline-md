import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { readPosts } from "@/lib/posts";
import { logoutAction, deletePostAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const posts = await readPosts();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Medline <span className="text-brand-600">Admin</span>
        </h1>
        <div className="flex items-center gap-3">
          <a href="/ro/blog" target="_blank" className="text-sm font-medium text-slate-500 hover:text-brand-700">
            Vezi blogul ↗
          </a>
          <form action={logoutAction}>
            <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
              Ieși
            </button>
          </form>
        </div>
      </header>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">Articole ({posts.length})</h2>
        <Link href="/admin/new" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
          + Adaugă articol
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
          Niciun articol încă. Apasă „Adaugă articol" ca să creezi primul.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {posts.map((p) => (
            <li key={p.id} className="flex items-center gap-4 p-4">
              {p.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.cover} alt="" className="h-12 w-16 shrink-0 rounded object-cover" />
              ) : (
                <span className="grid h-12 w-16 shrink-0 place-items-center rounded bg-brand-50 text-brand-400">
                  {p.tiktok ? "▶" : "—"}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-slate-800">{p.ro.title}</p>
                <p className="truncate text-sm text-slate-400">{p.date} · /{p.slug}</p>
              </div>
              <Link href={`/admin/${p.id}/edit`} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50">
                Editează
              </Link>
              <form action={deletePostAction}>
                <input type="hidden" name="id" value={p.id} />
                <button className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50">
                  Șterge
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

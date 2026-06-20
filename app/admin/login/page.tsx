import { redirect } from "next/navigation";
import { loginAction } from "../actions";
import { isAuthenticated, PASSWORD_SET } from "@/lib/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAuthenticated()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <h1 className="text-center text-2xl font-extrabold text-slate-900">
          Medline <span className="text-brand-600">Admin</span>
        </h1>
        <p className="mt-1 text-center text-sm text-slate-500">
          Autentificare administrator
        </p>

        {!PASSWORD_SET && (
          <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-700">
            ⚠️ Parola nu este setată. Setează variabilele <code>ADMIN_USER</code>,{" "}
            <code>ADMIN_PASSWORD</code> și <code>ADMIN_SESSION_SECRET</code> pe server.
          </p>
        )}

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            User sau parolă greșite.
          </p>
        )}

        <form action={loginAction} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="user">
              Utilizator
            </label>
            <input
              id="user"
              name="user"
              required
              autoComplete="username"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="password">
              Parolă
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Intră în panou
          </button>
        </form>
      </div>
    </main>
  );
}

import Link from "next/link";
import { SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <html lang="ro">
      <body style={{ fontFamily: "system-ui, sans-serif" }}>
        <main className="grid min-h-screen place-items-center bg-brand-50 px-6 text-center">
          <div>
            <p className="text-6xl font-extrabold text-brand-600">404</p>
            <h1 className="mt-4 text-2xl font-bold text-slate-900">
              Pagina nu a fost găsită
            </h1>
            <p className="mt-2 text-slate-600">
              Ne pare rău, pagina căutată nu există.
            </p>
            <Link
              href="/ro"
              className="mt-6 inline-block rounded-full bg-brand-600 px-6 py-3 font-semibold text-white"
            >
              Înapoi la {SITE.name}.md
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}

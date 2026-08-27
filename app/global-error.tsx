"use client";

import { SITE } from "@/lib/site";

/**
 * Ultima plasă de siguranță: prinde erorile care scapă din layout-ul root.
 * Fără ea, o excepție în producție lasă vizitatorul cu ecran alb.
 *
 * Trebuie să conțină propriile <html>/<body> — înlocuiește tot layout-ul —
 * și e Client Component, cerință Next.js. De aceea are stiluri inline: nu se
 * poate baza pe CSS-ul aplicației, care s-ar putea să fie exact ce a crăpat.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ro">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <main
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "1.5rem",
            textAlign: "center",
            background: "#f0fdf9",
            color: "#0f172a",
          }}
        >
          <div style={{ maxWidth: "30rem" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
              A apărut o problemă tehnică
            </h1>
            <p style={{ marginTop: "0.75rem", lineHeight: 1.6, color: "#475569" }}>
              Ne pare rău. Dacă ai nevoie de asistență medicală acum, sună-ne
              direct — răspundem non-stop.
            </p>

            <a
              href={`tel:${SITE.phoneRaw}`}
              style={{
                display: "inline-block",
                marginTop: "1.5rem",
                padding: "0.9rem 1.75rem",
                borderRadius: "9999px",
                background: "#0d9488",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.125rem",
                textDecoration: "none",
              }}
            >
              {SITE.phone}
            </a>

            <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <button
                onClick={reset}
                style={{
                  padding: "0.6rem 1.25rem",
                  borderRadius: "9999px",
                  border: "1px solid #cbd5e1",
                  background: "#fff",
                  color: "#334155",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Încearcă din nou
              </button>
              <a
                href="/ro"
                style={{
                  padding: "0.6rem 1.25rem",
                  borderRadius: "9999px",
                  border: "1px solid #cbd5e1",
                  color: "#334155",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Prima pagină
              </a>
            </div>

            {error.digest && (
              <p style={{ marginTop: "2rem", fontSize: "0.75rem", color: "#94a3b8" }}>
                Cod eroare: {error.digest}
              </p>
            )}
          </div>
        </main>
      </body>
    </html>
  );
}

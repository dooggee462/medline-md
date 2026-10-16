import type { Metadata, Viewport } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin — Medline.md",
  robots: { index: false, follow: false },
  // panoul se poate pune pe ecranul telefonului, ca o aplicație
  manifest: "/admin/app.webmanifest",
  appleWebApp: { capable: true, title: "Registru", statusBarStyle: "default" },
  icons: { apple: "/icon-512.png" },
};

export const viewport: Viewport = {
  themeColor: "#059669",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className="min-h-screen bg-slate-100 font-sans text-slate-800">
        {children}
      </body>
    </html>
  );
}

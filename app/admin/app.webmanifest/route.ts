/**
 * Manifest separat pentru panou: pus pe ecranul telefonului, se deschide
 * direct în registru, cu iconiță și fără bara browserului.
 * Site-ul public are manifestul lui, în app/manifest.ts.
 */
export const dynamic = "force-static";

export function GET() {
  return Response.json(
    {
      name: "Medline Registru",
      short_name: "Registru",
      description: "Registrul de vizite Medline",
      start_url: "/admin/registru",
      scope: "/admin",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#059669",
      orientation: "portrait",
      icons: [
        { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      ],
    },
    { headers: { "Content-Type": "application/manifest+json" } },
  );
}

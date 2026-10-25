import { NextRequest, NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/site";

/**
 * Scurtături SEO: URL scurt → pagina serviciului, pe limba potrivită.
 * Ex: medline.md/perfuzii → /ro/servicii/perfuzii-la-domiciliu
 * Slug-urile sunt copiate din RU_SLUG (lib/content.ts) — nu importăm
 * content.ts aici ca să nu umflăm bundle-ul de middleware (edge).
 */
const SERVICE_SHORTCUTS: Record<string, { ro: string; ru: string }> = {
  perfuzii: { ro: "perfuzii-la-domiciliu", ru: "kapelnicy-na-domu" },
  injectii: { ro: "injectii-la-domiciliu", ru: "inekcii-na-domu" },
  ingrijire: { ro: "ingrijire-bolnavi-la-domiciliu", ru: "uhod-za-bolnymi-na-domu" },
  consult: { ro: "consult-medical-la-domiciliu", ru: "medicinskiy-osmotr-na-domu" },
  pansamente: { ro: "pansamente-ingrijire-plagi", ru: "perevyazki-i-uhod-za-ranami" },
  tratament: { ro: "tratament-post-alcool", ru: "lechenie-posle-alkogolya" },
  binge: { ro: "tratament-post-alcool", ru: "lechenie-posle-alkogolya" },
};

/**
 * Redirecționează cererile fără prefix de limbă către limba potrivită.
 * Ex: /  ->  /ro   (sau /ru dacă browserul preferă rusa)
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  /**
   * www.medline.md → medline.md. Pe server, www răspundea cu 200 și o copie
   * completă a site-ului (Caddy nu-l redirecționa), deci Google vedea două
   * site-uri identice. Plasa de siguranță e aici, ca să nu depindă de
   * configurația proxy-ului.
   */
  const host = request.headers.get("host") ?? "";
  if (host.startsWith("www.")) {
    return NextResponse.redirect(
      `https://${host.slice(4)}${pathname}${search}`,
      308
    );
  }

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  // Detectează limba preferată din header
  const accept = request.headers.get("accept-language") ?? "";
  const prefersRu = /\bru\b/i.test(accept);
  const locale = prefersRu ? "ru" : DEFAULT_LOCALE;

  const url = request.nextUrl.clone();
  const key = pathname.replace(/^\/+|\/+$/g, "").toLowerCase();
  const svc = SERVICE_SHORTCUTS[key];

  if (svc) {
    url.pathname = `/${locale}/servicii/${svc[locale as "ro" | "ru"] ?? svc.ro}`;
  } else if (key === "detox") {
    url.pathname = `/${locale}/detoxifiere`;
  } else if (key === "narcolog" || key === "narkolog") {
    url.pathname = `/${locale}/narcolog`;
  } else if (key === "codare") {
    url.pathname = `/${locale}/codare`;
  } else {
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  }
  const res = NextResponse.redirect(url, 308);
  res.headers.set("Vary", "Accept-Language");
  return res;
}

export const config = {
  // Sare peste fișiere statice, API și fișierele SEO
  matcher: [
    "/((?!_next|api|admin|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|.*\\.).*)",
  ],
};

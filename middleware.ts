import { NextRequest, NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/site";

/**
 * Redirecționează cererile fără prefix de limbă către limba potrivită.
 * Ex: /  ->  /ro   (sau /ru dacă browserul preferă rusa)
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  // Detectează limba preferată din header
  const accept = request.headers.get("accept-language") ?? "";
  const prefersRu = /\bru\b/i.test(accept);
  const locale = prefersRu ? "ru" : DEFAULT_LOCALE;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Sare peste fișiere statice, API și fișierele SEO
  matcher: [
    "/((?!_next|api|admin|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|.*\\.).*)",
  ],
};

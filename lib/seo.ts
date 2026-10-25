import { SITE, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";

/**
 * Câmpurile OpenGraph comune tuturor paginilor.
 *
 * Next nu îmbină `openGraph` din layout cu cel din pagină — îl înlocuiește
 * complet. Fără acest spread, paginile interioare apăreau pe Facebook, Viber,
 * Telegram și WhatsApp fără imagine și fără limbă (doar text gol).
 * Folosire: `openGraph: { ...ogDefaults(locale), title, description, url }`
 */
export function ogDefaults(locale: Locale) {
  return {
    type: "website" as const,
    siteName: SITE.name,
    locale: locale === "ro" ? "ro_RO" : "ru_RU",
    alternateLocale: locale === "ro" ? ["ru_RU"] : ["ro_RO"],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: getDictionary(locale).meta.ogAlt,
      },
    ],
  };
}

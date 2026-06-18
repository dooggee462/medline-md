/**
 * Configurația centrală a site-ului Medline.md
 * ────────────────────────────────────────────
 * ⚠️  ÎNLOCUIEȘTE valorile placeholder cu datele reale ale clinicii.
 *     Tot ce ține de contact, SEO și branding se schimbă DOAR de aici.
 */

export const SITE = {
  /** Domeniul live (fără slash final) — folosit pentru canonical, sitemap, OG */
  url: "https://medline.md",

  /** Numele clinicii */
  name: "Medline",
  legalName: "Medline.md",

  /** Telefon */
  phone: "+373 61 003 863",
  /** Doar cifre, pentru linkuri tel: */
  phoneRaw: "+37361003863",

  /** WhatsApp — doar cifre, fără + și fără spații (format wa.me) */
  whatsapp: "37361003863",

  /** Viber — număr în format internațional, cu + (pentru viber://chat) */
  viber: "+37361003863",

  /**
   * Facebook Messenger — username-ul paginii (m.me/USERNAME)
   * ⚠️ Verifică username-ul exact al paginii Facebook (poate diferi de „MedLine").
   */
  messenger: "MedLine",

  /** Email de contact / destinația programărilor — ⚠️ înlocuiește cu email real */
  email: "contact@medline.md",

  /** Adresa fizică (oficiul central) */
  address: {
    street: "str. Dacia 15/1, et. 3",
    city: "Chișinău",
    region: "Chișinău",
    postalCode: "MD-2001",
    country: "MD",
    /** ⚠️ Coordonate aproximative — actualizează cu cele exacte ale oficiului */
    lat: 46.9817,
    lng: 28.8835,
  },

  /** Sloganul brandului */
  slogan: "Ușor. Rapid. Acasă.",

  /** Program de lucru (afișat + folosit în schema.org) */
  hours: {
    weekdays: "00:00 – 24:00",
    saturday: "00:00 – 24:00",
    sunday: "24/7 — non-stop",
  },

  /** Rețele sociale (lasă gol "" dacă nu există) */
  social: {
    facebook: "https://facebook.com/MedLine",
    instagram: "https://instagram.com/medline_expert",
    tiktok: "https://tiktok.com/@medline",
  },

  /** An înființare (pentru schema + footer) */
  founded: "2015",
} as const;

export type Locale = "ro" | "ru";
export const LOCALES: Locale[] = ["ro", "ru"];
export const DEFAULT_LOCALE: Locale = "ro";

/** Link WhatsApp prefcompletat */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Link Viber prefcompletat (deschide aplicația Viber) */
export function viberLink(message?: string) {
  const num = SITE.viber.replace(/[^\d+]/g, "");
  return message
    ? `viber://chat?number=${encodeURIComponent(num)}&text=${encodeURIComponent(message)}`
    : `viber://chat?number=${encodeURIComponent(num)}`;
}

/** Link Facebook Messenger */
export function messengerLink() {
  return `https://m.me/${SITE.messenger}`;
}

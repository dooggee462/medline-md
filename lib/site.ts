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

  /** Facebook Messenger — ID-ul paginii (m.me/ID) */
  messenger: "61578767017537",

  /**
   * Email de contact. Funcționează prin ImprovMX (redirecționare), nu e o
   * cutie poștală proprie: mesajele ajung în contul Gmail al firmei.
   * Alias-uri active: info@, contact@, programare@, admin@, victor@
   */
  email: "info@medline.md",

  /**
   * NU există sediu cu primire de pacienți — serviciile se fac exclusiv la
   * domiciliul pacientului (confirmat de client). Se folosește doar `city`,
   * pentru areaServed în schema.org; strada rămâne nefolosită.
   */
  address: {
    street: "",
    city: "Chișinău",
    region: "Chișinău",
    postalCode: "MD-2001",
    country: "MD",
    /** ⚠️ Coordonate aproximative — actualizează cu cele exacte ale oficiului */
    lat: 46.9817,
    lng: 28.8835,
  },

  /**
   * Localitățile deservite, în afară de Chișinău (confirmate de client).
   * Apar în schema.org areaServed și pe pagina de contact.
   */
  areaServed: [
    "Ciorescu",
    "Tohatin",
    "Ialoveni",
    "Vatra",
    "Sîngera",
    "Bubuieci",
    "Băcioi",
  ],

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
    facebook: "https://www.facebook.com/profile.php?id=61578767017537",
    instagram: "https://instagram.com/medline_health",
    tiktok: "https://www.tiktok.com/@medlinehealth",
  },

  /**
   * Link direct pentru lăsat recenzie pe Google (din Google Business Profile).
   * Format: https://g.page/r/XXXX/review  sau  https://search.google.com/local/writereview?placeid=XXXX
   * Lasă gol "" până ai profilul Google — atunci butonul Google apare automat.
   */
  reviewUrl: "https://g.page/r/CViJVna_59QmEAI/review",

  /**
   * Datele firmei din Registrul de Stat — informație PUBLICĂ, verificabilă
   * oricine. Se folosesc în schema.org ca să lege site-ul de o entitate
   * juridică reală: pentru Google, un site medical cu firmă identificabilă
   * are altă greutate decât unul anonim.
   *
   * Documentele propriu-zise (diplome, licențe) NU se publică — conțin date
   * cu caracter personal. Registrul public e suficient.
   */
  company: {
    legalName: "Societatea cu Răspundere Limitată MEDLINE HEALTH",
    shortName: "MEDLINE HEALTH SRL",
    idno: "1025607003895",
    /** Adresa juridică din registru — NU e sediu cu primire de pacienți */
    registeredAddress: "mun. Chișinău, str. Gh. Asachi 53, ap. 44, MD-2065",
  },

  /**
   * Analytics — lasă gol "" până ai ID-urile (nu se încarcă nimic dacă sunt goale).
   * ga4: din Google Analytics (ex. "G-XXXXXXXXXX")
   * metaPixel: din Facebook/Meta Events Manager (ex. "123456789012345")
   */
  analytics: {
    ga4: "G-VN876JXGD8",
    metaPixel: "",
  },

  /**
   * Codul de verificare Google Search Console (doar codul, ex. "abc123...").
   * Îl iei din Search Console → metoda „HTML tag". Lasă gol până îl ai.
   */
  googleVerification: "",
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

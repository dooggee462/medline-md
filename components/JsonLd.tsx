import { SITE, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";
import { SERVICES, serviceHref } from "@/lib/content";

/**
 * Structured data (schema.org) pentru rich results în Google:
 * - MedicalClinic / MedicalBusiness  (Local SEO + Knowledge Panel)
 * - FAQPage                          (rich snippet cu întrebări)
 * - BreadcrumbList                   (breadcrumbs în SERP)
 */
export function JsonLd({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const url = `${SITE.url}/${locale}`;

  const clinic = {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "MedicalBusiness", "LocalBusiness"],
    "@id": `${SITE.url}/#clinic`,
    name: SITE.legalName,
    // Entitate juridică verificabilă în Registrul de Stat — semnal de încredere
    legalName: SITE.company.legalName,
    taxID: SITE.company.idno,
    description: dict.meta.description,
    url,
    telephone: SITE.phoneRaw,
    email: SITE.email,
    image: `${SITE.url}/og-image.png`,
    logo: `${SITE.url}/icon-512.png`,
    priceRange: "$$",
    founder: { "@id": `${SITE.url}/#founder` },
    // Serviciu la domiciliu (fără sediu cu primire pacienți) — fără adresă fizică
    // Chișinău + suburbiile deservite — semnal de acoperire pentru căutările locale
    areaServed: [
      { "@type": "City", name: SITE.address.city },
      ...SITE.areaServed.map((name) => ({ "@type": "Place", name })),
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [
      SITE.social.facebook,
      SITE.social.instagram,
      SITE.social.tiktok,
    ].filter(Boolean),
    // Din lista reală de servicii: o pagină nouă apare automat și aici
    availableService: SERVICES.map((s) => ({
      "@type": "MedicalProcedure",
      name: s.content[locale].h1,
      description: s.content[locale].short,
      url: `${SITE.url}${serviceHref(locale, s.slug)}`,
    })),
    // Nota reală din Google Business Profile — se actualizează în SITE.rating
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.rating.value,
      reviewCount: String(SITE.rating.count),
      bestRating: "5",
      worstRating: "1",
    },
    review: dict.reviews.items.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewBody: r.text,
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    })),
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SITE.name,
        item: url,
      },
    ],
  };

  return (
    <>
      {[clinic, faq, breadcrumb].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

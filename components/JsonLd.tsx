import { SITE, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";

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
    image: `${SITE.url}/og-image.png`,
    logo: `${SITE.url}/icon.svg`,
    priceRange: "$$",
    medicalSpecialty: "Nursing",
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
    availableService: dict.services.items.map((s) => ({
      "@type": "MedicalProcedure",
      name: s.title,
      description: s.desc,
    })),
    /**
     * Nota reală din Google Business Profile, verificabilă public de oricine.
     * ⚠️ Se actualizează MANUAL: când numărul de recenzii crește, schimbă aici.
     * Un rating care nu corespunde cu profilul Google e tratat ca dată falsă.
     */
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "10",
      bestRating: "5",
      worstRating: "1",
    },
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

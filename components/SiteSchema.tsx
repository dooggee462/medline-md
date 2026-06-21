import { SITE, type Locale } from "@/lib/site";

/**
 * Schema globală de brand (pe fiecare pagină):
 * - Organization / MedicalOrganization (entitate de brand pentru Knowledge Panel)
 * - WebSite (pentru sitelinks)
 */
export function SiteSchema({ locale }: { locale: Locale }) {
  const org = {
    "@context": "https://schema.org",
    "@type": ["Organization", "MedicalOrganization"],
    "@id": `${SITE.url}/#organization`,
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/icon.svg`,
    image: `${SITE.url}/og-image.png`,
    foundingDate: SITE.founded,
    slogan: SITE.slogan,
    founder: {
      "@type": "Person",
      name: "Sochirean Victor",
      jobTitle: "Asistent medical",
    },
    areaServed: { "@type": "City", name: SITE.address.city },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phoneRaw,
      contactType: "customer service",
      areaServed: "MD",
      availableLanguage: ["ro", "ru"],
    },
    sameAs: [
      SITE.social.facebook,
      SITE.social.instagram,
      SITE.social.tiktok,
    ].filter(Boolean),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.legalName,
    inLanguage: locale,
    publisher: { "@id": `${SITE.url}/#organization` },
  };

  return (
    <>
      {[org, website].map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}

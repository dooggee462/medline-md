import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { notFound } from "next/navigation";
import { LOCALES, SITE, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";
import { CookieConsent } from "@/components/CookieConsent";
import { BackToTop } from "@/components/BackToTop";
import { MobileCallBar } from "@/components/MobileCallBar";
import { Analytics } from "@/components/Analytics";
import { SiteSchema } from "@/components/SiteSchema";
import { ContactTracker } from "@/components/ContactTracker";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

// Font serif elegant pentru wordmark-ul logoului (stil clasic, ca în brand)
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["italic", "normal"],
  display: "swap",
  variable: "--font-cormorant",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const path = `/${locale}`;

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    applicationName: SITE.name,
    authors: [{ name: SITE.legalName }],
    alternates: {
      canonical: path,
      languages: {
        ro: "/ro",
        ru: "/ru",
        "x-default": "/ro",
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: dict.meta.title,
      description: dict.meta.description,
      url: path,
      locale: locale === "ro" ? "ro_RO" : "ru_RU",
      alternateLocale: locale === "ro" ? ["ru_RU"] : ["ro_RO"],
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: dict.meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <html lang={locale} className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans pb-14 lg:pb-0">
        <SiteSchema locale={locale as Locale} />
        {children}
        <BackToTop label={dict.ui.backToTop} />
        <MobileCallBar dict={dict} />
        <CookieConsent dict={dict} />
        <Analytics />
        <ContactTracker />
      </body>
    </html>
  );
}

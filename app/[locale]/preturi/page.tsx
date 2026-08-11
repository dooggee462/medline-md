import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, SITE, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";
import { SERVICE_LIST } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer, FloatingContact } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { IconCheck, IconClock } from "@/components/Icons";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === "ro"
      ? "Servicii Medicale la Domiciliu în Chișinău — Lista Completă | Medline.md"
      : "Медицинские Услуги на Дому в Кишинёве — Полный Список | Medline.md";
  const description =
    locale === "ro"
      ? "Lista serviciilor medicale la domiciliu Medline în Chișinău: injecții, perfuzii, complex de vitamine, tratament post-alcool, codare, pansamente și îngrijirea bolnavilor. Activăm 24/7."
      : "Список медицинских услуг на дому Medline в Кишинёве: инъекции, капельницы, витамины, лечение после алкоголя, кодирование, перевязки и уход за больными. Работаем 24/7.";
  return {
    title,
    description,
    keywords:
      locale === "ro"
        ? "preturi servicii medicale la domiciliu Chisinau, cat costa perfuzie, pret injectie la domiciliu, pret codare, cat costa detoxifiere, tarife asistenta medicala domiciliu"
        : "цены медицинские услуги на дому Кишинёв, сколько стоит капельница, цена инъекции на дому, цена кодирования, стоимость детокса, тарифы медпомощь на дому",
    alternates: {
      canonical: `/${locale}/preturi`,
      languages: { ro: "/ro/preturi", ru: "/ru/preturi", "x-default": "/ro/preturi" },
    },
    openGraph: { title, description, url: `/${locale}/preturi` },
  };
}

export default async function ServicesListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!LOCALES.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: dict.ui.pricesTitle,
    itemListElement: SERVICE_LIST.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s[locale],
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listLd) }} />
      <Header locale={locale} dict={dict} />
      <main>
        <section className="bg-gradient-to-b from-brand-50/70 to-white py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: dict.ui.breadcrumbHome, href: `/${locale}` },
                { name: dict.nav.prices, href: `/${locale}/preturi` },
              ]}
            />
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              {dict.ui.pricesTitle}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {dict.ui.pricesSubtitle}
            </p>
          </div>
        </section>

        {/* Lista de servicii — stil flyer (verde-forest + bife aurii) */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-forest-800 to-forest-950 p-6 shadow-xl shadow-forest-900/20 sm:p-10">
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
                {locale === "ro" ? "Servicii prestate" : "Оказываемые услуги"}
              </p>
              <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
                {SERVICE_LIST.map((s) => (
                  <li
                    key={s.ro}
                    className="flex items-center gap-3 border-b border-white/10 py-3.5"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold-500/50 text-gold-400">
                      <IconCheck className="h-4 w-4" />
                    </span>
                    <span className="font-medium text-white/95">{s[locale]}</span>
                    {s.featured && (
                      <span className="ml-auto rounded-full bg-gold-500/20 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-gold-300">
                        {locale === "ro" ? "Nou" : "Новое"}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/${locale}/contact#programare`}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-7 py-3.5 text-base font-bold text-forest-950 shadow-sm transition-all hover:from-gold-300 hover:to-gold-500"
                >
                  {dict.ui.ctaButton}
                </Link>
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {SITE.phone}
                </a>
              </div>
            </div>

            <p className="mt-6 flex items-start gap-2 text-sm leading-relaxed text-slate-500">
              <IconClock className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
              {dict.ui.pricesNote}
            </p>
          </div>
        </section>

        <CtaBand locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
      <FloatingContact dict={dict} />
    </>
  );
}

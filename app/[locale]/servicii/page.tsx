import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";
import { SERVICES, serviceHref } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer, FloatingContact } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { SERVICE_ICONS, IconCheck } from "@/components/Icons";

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
  const title =
    locale === "ro"
      ? "Servicii de Asistență Medicală la Domiciliu în Chișinău | Medline.md"
      : "Услуги Медицинской Помощи на Дому в Кишинёве | Medline.md";
  const description =
    locale === "ro"
      ? "Toate serviciile medicale la domiciliu Medline: perfuzii, injecții, îngrijirea bolnavilor, consult medical și pansamente în Chișinău."
      : "Все услуги медицинской помощи на дому Medline: капельницы, инъекции, уход за больными, медосмотр и перевязки в Кишинёве.";
  return {
    title,
    description,
    keywords:
      locale === "ro"
        ? "servicii medicale la domiciliu Chisinau, asistenta medicala la domiciliu, perfuzii la domiciliu, injectii la domiciliu, ingrijire bolnavi, consult medical domiciliu, pansamente la domiciliu"
        : "медицинские услуги на дому Кишинёв, медпомощь на дому, капельницы на дому, инъекции на дому, уход за больными, медосмотр на дому, перевязки на дому",
    alternates: {
      canonical: `/${locale}/servicii`,
      languages: { ro: "/ro/servicii", ru: "/ru/servicii", "x-default": "/ro/servicii" },
    },
    openGraph: { title, description, url: `/${locale}/servicii` },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!LOCALES.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main>
        <section className="bg-gradient-to-b from-brand-50/70 to-white py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: dict.ui.breadcrumbHome, href: `/${locale}` },
                { name: dict.nav.services, href: `/${locale}/servicii` },
              ]}
            />
            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              {dict.services.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              {dict.services.subtitle}
            </p>
          </div>
        </section>

        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s) => {
                const Icon = SERVICE_ICONS[s.icon] ?? IconCheck;
                const c = s.content[locale];
                return (
                  <Link
                    key={s.slug}
                    href={serviceHref(locale, s.slug)}
                    className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h2 className="mt-5 text-xl font-bold text-slate-900">{c.h1}</h2>
                    <p className="mt-2 flex-1 leading-relaxed text-slate-600">{c.short}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                      {dict.ui.readMore}
                      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <CtaBand locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
      <FloatingContact dict={dict} />
    </>
  );
}

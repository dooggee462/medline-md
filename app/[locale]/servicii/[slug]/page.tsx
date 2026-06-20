import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, SITE, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";
import { SERVICES, getServiceByLocaleSlug, localizeSlug, serviceHref } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer, FloatingContact } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SERVICE_ICONS, IconCheck, IconClock } from "@/components/Icons";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SERVICES.map((s) => ({ locale, slug: localizeSlug(s.slug, locale) }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceByLocaleSlug(slug);
  if (!service) return {};
  const c = service.content[locale];
  const path = `/${locale}/servicii/${slug}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    alternates: {
      canonical: path,
      languages: {
        ro: `/ro/servicii/${service.slug}`,
        ru: `/ru/servicii/${localizeSlug(service.slug, "ru")}`,
        "x-default": `/ro/servicii/${service.slug}`,
      },
    },
    openGraph: { title: c.metaTitle, description: c.metaDescription, url: path },
  };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!LOCALES.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const service = getServiceByLocaleSlug(slug);
  if (!service) notFound();
  const dict = getDictionary(locale);
  const c = service.content[locale];
  const Icon = SERVICE_ICONS[service.icon] ?? IconCheck;
  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: c.h1,
    description: c.metaDescription,
    url: `${SITE.url}/${locale}/servicii/${slug}`,
    provider: {
      "@type": "MedicalClinic",
      name: SITE.legalName,
      telephone: SITE.phoneRaw,
      areaServed: SITE.address.city,
    },
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Header locale={locale} dict={dict} />

      <main>
        {/* Hero serviciu */}
        <section className="bg-gradient-to-b from-brand-50/70 to-white py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: dict.ui.breadcrumbHome, href: `/${locale}` },
                { name: dict.nav.services, href: `/${locale}/servicii` },
                { name: c.h1, href: `/${locale}/servicii/${slug}` },
              ]}
            />
            <div className="mt-6 flex items-start gap-5">
              <span className="hidden shrink-0 place-items-center rounded-2xl bg-brand-600 p-4 text-white sm:grid">
                <Icon className="h-8 w-8" />
              </span>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  {c.h1}
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">{c.lead}</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/contact#programare`}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-6 py-3 text-base font-bold text-forest-950 shadow-lg shadow-gold-600/30 transition-all hover:from-gold-300 hover:to-gold-500"
              >
                {dict.ui.bookThisService}
              </Link>
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-800 transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                {SITE.phone}
              </a>
            </div>
          </div>
        </section>

        {/* Conținut */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto grid max-w-4xl gap-12 px-4 sm:px-6 lg:px-8">
            <article className="prose-content space-y-10">
              {c.sections.map((sec) => (
                <div key={sec.heading}>
                  <h2 className="text-2xl font-bold text-slate-900">{sec.heading}</h2>
                  {sec.body.map((p, i) => (
                    <p key={i} className="mt-3 leading-relaxed text-slate-600">{p}</p>
                  ))}
                </div>
              ))}
            </article>

            <div className="grid gap-8 sm:grid-cols-2">
              {/* Indicații */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-7">
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                  <IconClock className="h-5 w-5 text-brand-600" />
                  {dict.ui.indications}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {c.indications.map((item) => (
                    <li key={item} className="flex gap-2.5 text-slate-700">
                      <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Beneficii */}
              <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-7">
                <h2 className="text-xl font-bold text-slate-900">{dict.ui.benefits}</h2>
                <ul className="mt-4 space-y-2.5">
                  {c.benefits.map((item) => (
                    <li key={item} className="flex gap-2.5 text-slate-700">
                      <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{dict.faq.title}</h2>
              <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {c.faq.map((f) => (
                  <details key={f.q} className="group px-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-5 font-semibold text-slate-900">
                      {f.q}
                      <span className="text-brand-600 transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="pb-5 leading-relaxed text-slate-600">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Servicii conexe */}
        <section className="border-t border-slate-100 bg-slate-50 py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900">{dict.ui.relatedServices}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {related.map((s) => {
                const RIcon = SERVICE_ICONS[s.icon] ?? IconCheck;
                const rc = s.content[locale];
                return (
                  <Link
                    key={s.slug}
                    href={serviceHref(locale, s.slug)}
                    className="group rounded-2xl border border-slate-100 bg-white p-6 transition-all hover:border-brand-200 hover:shadow-lg"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white">
                      <RIcon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 font-bold text-slate-900">{rc.h1}</h3>
                    <p className="mt-1 text-sm text-slate-600">{rc.short}</p>
                  </Link>
                );
              })}
            </div>
            <div className="mt-8">
              <Link href={`/${locale}/servicii`} className="text-sm font-semibold text-brand-700 hover:underline">
                ← {dict.ui.allServices}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} dict={dict} />
      <FloatingContact dict={dict} />
    </>
  );
}

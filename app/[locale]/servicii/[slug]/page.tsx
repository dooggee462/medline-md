import type { Metadata } from "next";
import { ogDefaults } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, SITE, whatsappLink, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";
import { SERVICES, getArticle, getServiceByLocaleSlug, localizeSlug, serviceHref } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SERVICE_ICONS, IconCheck, IconClock, IconPhone, IconWhatsApp } from "@/components/Icons";

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
  // Când există o pagină dedicată pe același subiect, ea e cea canonică —
  // altfel Google le vede ca duplicate și nu clasează niciuna (vezi canonicalTo)
  const canonical = service.canonicalTo
    ? `/${locale}${service.canonicalTo}`
    : path;
  const langs = service.canonicalTo
    ? {
        ro: `/ro${service.canonicalTo}`,
        ru: `/ru${service.canonicalTo}`,
        "x-default": `/ro${service.canonicalTo}`,
      }
    : {
        ro: `/ro/servicii/${service.slug}`,
        ru: `/ru/servicii/${localizeSlug(service.slug, "ru")}`,
        "x-default": `/ro/servicii/${service.slug}`,
      };
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    alternates: { canonical, languages: langs },
    openGraph: { ...ogDefaults(locale), title: c.metaTitle, description: c.metaDescription, url: path },
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
  const quickFacts =
    locale === "ro"
      ? ["Sosire în 25–45 min", "Non-stop 24/7", `★ ${SITE.rating.value} pe Google`]
      : ["Выезд за 25–45 мин", "Круглосуточно 24/7", `★ ${SITE.rating.value} в Google`];
  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);
  // Articole pe aceeași temă — slug-urile inexistente sunt ignorate, nu strică pagina
  const articles = (service.relatedArticles ?? [])
    .map((s) => getArticle(s))
    .filter((a) => a !== undefined);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalProcedure", "MedicalWebPage"],
    name: c.h1,
    description: c.metaDescription,
    url: `${SITE.url}/${locale}/servicii/${slug}`,
    inLanguage: locale,
    author: {
      "@type": "Person",
      "@id": `${SITE.url}/#founder`,
      name: SITE.author.name,
      jobTitle: SITE.author.jobTitle[locale],
      url: `${SITE.url}/${locale}/despre-noi`,
    },
    reviewedBy: {
      "@type": "Person",
      "@id": `${SITE.url}/#founder`,
      name: SITE.author.name,
      jobTitle: SITE.author.jobTitle[locale],
      url: `${SITE.url}/${locale}/despre-noi`,
    },
    // Același @id ca entitatea din JsonLd.tsx → Google le unifică într-una singură
    provider: {
      "@type": "MedicalClinic",
      "@id": `${SITE.url}/#clinic`,
      name: SITE.legalName,
      url: SITE.url,
      telephone: SITE.phoneRaw,
      areaServed: [
        { "@type": "City", name: SITE.address.city },
        ...SITE.areaServed.map((name) => ({ "@type": "Place", name })),
      ],
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
                {/*
                  Butonul de apel stă imediat sub titlu: pe telefon era sub un
                  paragraf lung, la ~740px, acoperit de bannerul de cookie, iar
                  butonul principal ducea pe altă pagină, la un formular.
                */}
                <ul className="mt-4 flex flex-wrap gap-2 text-sm font-semibold text-slate-700">
                  {quickFacts.map((f) => (
                    <li key={f} className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`tel:${SITE.phoneRaw}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-6 py-3.5 text-base font-bold text-forest-950 shadow-lg shadow-gold-600/30 transition-all hover:from-gold-300 hover:to-gold-500"
                  >
                    <IconPhone className="h-5 w-5" />
                    {dict.nav.call} · {SITE.phone}
                  </a>
                  <a
                    href={whatsappLink(dict.booking.waMessageIntro)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 transition-colors hover:border-brand-300 hover:text-brand-700"
                  >
                    <IconWhatsApp className="h-5 w-5" />
                    WhatsApp
                  </a>
                </div>
                <p className="mt-6 text-lg leading-relaxed text-slate-600">{c.lead}</p>
                <p className="mt-3 text-xs font-medium text-slate-500">
                  {locale === "ro" ? "Protocol medical coordonat și verificat de " : "Медицинский протокол координирует и проверил "}
                  <Link href={`/${locale}/despre-noi`} className="font-semibold text-brand-700 hover:underline">
                    {SITE.author.name}
                  </Link>
                  {" · "}
                  {SITE.author.jobTitle[locale]}
                </p>
                <Link
                  href={`/${locale}/contact#programare`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline"
                >
                  {dict.ui.bookThisService} <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Conținut */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto grid max-w-4xl gap-12 px-4 sm:px-6 lg:px-8">
            {/* Caseta sintetică RAG / E-E-A-T — oferă motoarelor AI și pacienților toate datele cheie într-un singur loc */}
            <aside className="rounded-2xl border border-brand-100 bg-brand-50/40 p-6 text-sm leading-relaxed text-slate-700">
              <p className="font-bold text-slate-900">
                {locale === "ro"
                  ? `${c.h1} — informații rapide (${SITE.legalName})`
                  : `${c.h1} — краткая информация (${SITE.legalName})`}
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                <li>
                  <strong>{locale === "ro" ? "Furnizor:" : "Клиника:"}</strong> {SITE.legalName} ({SITE.company.shortName})
                </li>
                <li>
                  <strong>{locale === "ro" ? "Medic expert:" : "Врач-эксперт:"}</strong> {SITE.author.name}
                </li>
                <li>
                  <strong>{locale === "ro" ? "Program & Sosire:" : "График и выезд:"}</strong>{" "}
                  {locale === "ro" ? "24/7 non-stop · 25–45 min în Chișinău" : "24/7 круглосуточно · 25–45 мин по Кишинёву"}
                </li>
                <li>
                  <strong>{locale === "ro" ? "Telefon / WhatsApp / Viber:" : "Телефон / WhatsApp / Viber:"}</strong>{" "}
                  <a href={`tel:${SITE.phoneRaw}`} className="font-semibold text-brand-700 hover:underline">
                    {SITE.phone}
                  </a>
                </li>
                <li className="sm:col-span-2">
                  <strong>{locale === "ro" ? "Zonă acoperită:" : "Зона выезда:"}</strong>{" "}
                  {locale === "ro"
                    ? `Chișinău (toate sectoarele) și suburbii: ${SITE.areaServed.join(", ")}`
                    : `Кишинёв (все секторы) и пригороды: Чореску, Тохатин, Яловены, Ватра, Сынджера, Бубуечь, Бачой`}
                </li>
              </ul>
            </aside>

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

            {/* Articole pe aceeași temă — leagă serviciul de clusterul lui de conținut */}
            {articles.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{dict.ui.readAlso}</h2>
                <ul className="mt-5 space-y-3">
                  {articles.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/${locale}/blog/${localizeSlug(a.slug, locale)}`}
                        className="group flex gap-3 rounded-xl border border-slate-100 bg-white p-4 transition-all hover:border-brand-200 hover:shadow-md"
                      >
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                        <span>
                          <span className="font-semibold text-slate-900 group-hover:text-brand-700">
                            {a.content[locale].title}
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                            {a.content[locale].excerpt}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
    </>
  );
}

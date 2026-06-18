import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, SITE, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";
import { ARTICLES, getArticle } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer, FloatingContact } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { ReadingProgress, ShareButtons } from "@/components/ShareButtons";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    ARTICLES.map((a) => ({ locale, slug: a.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const art = getArticle(slug);
  if (!art) return {};
  const c = art.content[locale];
  const path = `/${locale}/blog/${slug}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    alternates: {
      canonical: path,
      languages: { ro: `/ro/blog/${slug}`, ru: `/ru/blog/${slug}`, "x-default": `/ro/blog/${slug}` },
    },
    openGraph: {
      type: "article",
      title: c.metaTitle,
      description: c.metaDescription,
      url: path,
      publishedTime: art.date,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!LOCALES.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const art = getArticle(slug);
  if (!art) notFound();
  const dict = getDictionary(locale);
  const c = art.content[locale];
  const dateLabel = new Date(art.date).toLocaleDateString(
    locale === "ro" ? "ro-RO" : "ru-RU",
    { day: "numeric", month: "long", year: "numeric" }
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.metaDescription,
    datePublished: art.date,
    dateModified: art.date,
    inLanguage: locale,
    mainEntityOfPage: `${SITE.url}/${locale}/blog/${slug}`,
    author: { "@type": "Organization", name: SITE.legalName },
    publisher: {
      "@type": "Organization",
      name: SITE.legalName,
      logo: { "@type": "ImageObject", url: `${SITE.url}/icon.svg` },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgress />
      <Header locale={locale} dict={dict} />
      <main>
        <section className="bg-gradient-to-b from-brand-50/70 to-white py-12 lg:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: dict.ui.breadcrumbHome, href: `/${locale}` },
                { name: dict.nav.blog, href: `/${locale}/blog` },
                { name: c.title, href: `/${locale}/blog/${slug}` },
              ]}
            />
            <time className="mt-6 block text-sm font-medium text-brand-600">
              {dict.ui.publishedOn} {dateLabel} · {art.readMinutes} {dict.ui.minRead}
            </time>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {c.title}
            </h1>
          </div>
        </section>

        <section className="py-10 lg:py-14">
          <article className="mx-auto max-w-3xl space-y-6 px-4 sm:px-6 lg:px-8">
            {c.sections.map((sec, i) => (
              <div key={i}>
                {sec.heading && (
                  <h2 className="mb-3 mt-4 text-2xl font-bold text-slate-900">{sec.heading}</h2>
                )}
                {sec.body.map((p, j) => (
                  <p key={j} className="mt-3 text-lg leading-relaxed text-slate-700">{p}</p>
                ))}
              </div>
            ))}

            <div className="flex flex-col gap-6 border-t border-slate-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <Link href={`/${locale}/blog`} className="text-sm font-semibold text-brand-700 hover:underline">
                ← {dict.ui.backToBlog}
              </Link>
              <ShareButtons
                url={`${SITE.url}/${locale}/blog/${slug}`}
                title={c.title}
                label={dict.ui.share}
              />
            </div>
          </article>
        </section>

        <CtaBand locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
      <FloatingContact dict={dict} />
    </>
  );
}

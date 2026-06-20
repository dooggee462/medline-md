import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";
import { ARTICLES } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer, FloatingContact } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";

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
      ? "Blog — Sfaturi despre Asistența Medicală la Domiciliu | Medline.md"
      : "Блог — Советы о Медицинской Помощи на Дому | Medline.md";
  const description =
    locale === "ro"
      ? "Articole și sfaturi practice despre îngrijirea la domiciliu, perfuzii, îngrijirea vârstnicilor și sănătate, de la echipa Medline.md."
      : "Статьи и практичные советы об уходе на дому, капельницах, уходе за пожилыми и здоровье от команды Medline.md.";
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { ro: "/ro/blog", ru: "/ru/blog", "x-default": "/ro/blog" },
    },
    openGraph: { title, description, url: `/${locale}/blog` },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!LOCALES.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const articles = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main>
        <section className="bg-gradient-to-b from-brand-50/70 to-white py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: dict.ui.breadcrumbHome, href: `/${locale}` },
                { name: dict.nav.blog, href: `/${locale}/blog` },
              ]}
            />
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              {dict.nav.blog}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              {dict.ui.recentArticles}
            </p>
          </div>
        </section>

        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((art) => {
                const c = art.content[locale];
                return (
                  <Link
                    key={art.slug}
                    href={`/${locale}/blog/${art.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/5"
                  >
                    <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                      {art.tiktok ? (
                        <svg viewBox="0 0 24 24" className="h-16 w-16 opacity-95" fill="currentColor">
                          <circle cx="12" cy="12" r="11" fill="rgba(255,255,255,0.15)" />
                          <path d="M10 8.5v7l6-3.5-6-3.5Z" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" className="h-14 w-14 opacity-90" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 4v16M4 12h16" />
                        </svg>
                      )}
                      {art.tiktok && (
                        <span className="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-xs font-bold backdrop-blur">
                          ▶ Video
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <time className="text-xs font-medium text-brand-600">
                        {new Date(art.date).toLocaleDateString(locale === "ro" ? "ro-RO" : "ru-RU", { day: "numeric", month: "long", year: "numeric" })}
                        {" · "}{art.readMinutes} {dict.ui.minRead}
                      </time>
                      <h2 className="mt-2 text-lg font-bold leading-snug text-slate-900 group-hover:text-brand-700">
                        {c.title}
                      </h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{c.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                        {dict.ui.readMore}
                        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                      </span>
                    </div>
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

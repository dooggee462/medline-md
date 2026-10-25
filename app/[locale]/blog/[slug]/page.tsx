import type { Metadata } from "next";
import { ogDefaults } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, SITE, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";
import { getBlogPost, getBlogList } from "@/lib/posts";
import { SERVICES } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { ReadingProgress, ShareButtons } from "@/components/ShareButtons";
import { TikTokEmbed } from "@/components/TikTokEmbed";

export const dynamic = "force-dynamic";

/** Transformă textul cu sintaxă [etichetă](/link) în noduri cu linkuri */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!m) return part;
        const [, label, href] = m;
        return href.startsWith("/") ? (
          <Link key={i} href={href} className="font-semibold text-brand-700 hover:underline">
            {label}
          </Link>
        ) : (
          <a key={i} href={href} className="font-semibold text-brand-700 hover:underline">
            {label}
          </a>
        );
      })}
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug, locale);
  if (!post) return {};
  const path = `/${locale}/blog/${slug}`;
  // Clipurile scurte (-video) au ~30 cuvinte și titluri similare cu serviciile:
  // rămân accesibile pe site, dar nu se indexează separat ca să nu canibalizeze serviciile.
  const isThinVideo = post.roSlug.endsWith("-video");
  return {
    title: post.metaTitle.includes("Medline")
      ? post.metaTitle
      : `${post.metaTitle} | Medline.md`,
    description: post.metaDescription,
    keywords: post.keywords,
    ...(isThinVideo
      ? { robots: { index: false, follow: true } }
      : {}),
    alternates: {
      canonical: path,
      languages: {
        ro: `/ro/blog/${post.roSlug}`,
        ru: `/ru/blog/${post.ruSlug}`,
        "x-default": `/ro/blog/${post.roSlug}`,
      },
    },
    openGraph: {
      ...ogDefaults(locale),
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: path,
      publishedTime: post.date,
      images: [post.cover || "/og-image.png"],
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
  const post = await getBlogPost(slug, locale);
  if (!post) notFound();
  const dict = getDictionary(locale);
  // Întâi articolele de pe aceeași temă (din serviciile care listează și
  // articolul curent), apoi cele mai noi. Înainte erau aceleași 3 articole
  // pe toate paginile, iar cele despre codare nu primeau aproape niciun link.
  const cluster = new Set(
    SERVICES.filter((s) => s.relatedArticles?.includes(post.roSlug)).flatMap(
      (s) => s.relatedArticles ?? []
    )
  );
  const others = (await getBlogList(locale)).filter(
    (b) => b.slug !== post.slug && !b.roSlug.endsWith("-video")
  );
  const related = [
    ...others.filter((b) => cluster.has(b.roSlug)),
    ...others.filter((b) => !cluster.has(b.roSlug)),
  ].slice(0, 3);
  const dateLabel = new Date(post.date).toLocaleDateString(
    locale === "ro" ? "ro-RO" : "ru-RU",
    { day: "numeric", month: "long", year: "numeric" }
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Article", "MedicalWebPage"],
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale,
    image: post.cover ? `${SITE.url}${post.cover}` : `${SITE.url}/og-image.png`,
    mainEntityOfPage: `${SITE.url}/${locale}/blog/${slug}`,
    author: {
      "@type": "Person",
      "@id": `${SITE.url}/#founder`,
      name: SITE.author.name,
      jobTitle: SITE.author.jobTitle[locale],
      url: `${SITE.url}/${locale}/despre-noi`,
      affiliation: { "@type": "MedicalOrganization", "@id": `${SITE.url}/#organization`, name: SITE.legalName },
    },
    reviewedBy: {
      "@type": "Person",
      "@id": `${SITE.url}/#founder`,
      name: SITE.author.name,
      jobTitle: SITE.author.jobTitle[locale],
      url: `${SITE.url}/${locale}/despre-noi`,
    },
    publisher: {
      "@type": "MedicalOrganization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.legalName,
      logo: { "@type": "ImageObject", url: `${SITE.url}/icon-512.png` },
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
                { name: post.title, href: `/${locale}/blog/${slug}` },
              ]}
            />
            <time className="mt-6 block text-sm font-medium text-brand-600">
              {dict.ui.publishedOn} {dateLabel} · {post.readMinutes} {dict.ui.minRead}
            </time>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-sm text-slate-600">
              {locale === "ro" ? "Autor & verificare medicală: " : "Автор и медицинская проверка: "}
              <Link href={`/${locale}/despre-noi`} className="font-semibold text-brand-700 hover:underline">
                {SITE.author.name}
              </Link>
              {" — "}
              {SITE.author.jobTitle[locale]}
            </p>
          </div>
        </section>

        <section className="py-10 lg:py-14">
          <article className="mx-auto max-w-3xl space-y-6 px-4 sm:px-6 lg:px-8">
            {post.cover && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.cover} alt={post.title} className="w-full rounded-2xl object-cover" />
            )}
            {post.tiktok && (
              <div className="mb-4">
                <TikTokEmbed url={post.tiktok} />
              </div>
            )}
            {post.blocks.map((b, i) => {
              if (b.type === "heading") {
                if (b.level === 2)
                  return <h2 key={i} className="mt-8 text-2xl font-bold text-slate-900">{b.text}</h2>;
                if (b.level === 3)
                  return <h3 key={i} className="mt-6 text-xl font-bold text-slate-900">{b.text}</h3>;
                return <h4 key={i} className="mt-5 text-lg font-semibold text-slate-900">{b.text}</h4>;
              }
              return <p key={i} className="text-lg leading-relaxed text-slate-700"><RichText text={b.text} /></p>;
            })}

            {/* Caseta de autoritate medicală și contact direct (E-E-A-T + RAG pentru AI) */}
            <aside className="mt-8 rounded-2xl border border-brand-100 bg-brand-50/50 p-6 text-sm leading-relaxed text-slate-700">
              <p className="font-bold text-slate-900">
                {locale === "ro"
                  ? `Asistență medicală la domiciliu în Chișinău — ${SITE.legalName}`
                  : `Медицинская помощь на дому в Кишинёве — ${SITE.legalName}`}
              </p>
              <p className="mt-1.5">
                {locale === "ro"
                  ? `Articol verificat de ${SITE.author.name} (${SITE.author.jobTitle.ro}). Echipa ${SITE.legalName} (${SITE.company.shortName}) intervine la domiciliu 24/7 în Chișinău și suburbii (${SITE.areaServed.join(", ")}), cu timp de sosire de 25–45 minute. Pentru programări sau urgențe la domiciliu (perfuzii, injecții, detoxifiere post-alcool, codare, îngrijire bolnavi), sunați sau scrieți pe WhatsApp/Viber la `
                  : `Статья проверена: ${SITE.author.name} (${SITE.author.jobTitle.ru}). Команда ${SITE.legalName} (${SITE.company.shortName}) выезжает на дом 24/7 по Кишинёву и пригородам (время приезда 25–45 минут). Для вызова на дом (капельницы, уколы, вывод из запоя, детоксикация, кодирование, уход за больными) звоните или пишите в WhatsApp/Viber: `}
                <a href={`tel:${SITE.phoneRaw}`} className="font-bold text-brand-700 hover:underline">
                  {SITE.phone}
                </a>
                .
              </p>
            </aside>

            <div className="flex flex-col gap-6 border-t border-slate-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <Link href={`/${locale}/blog`} className="text-sm font-semibold text-brand-700 hover:underline">
                ← {dict.ui.backToBlog}
              </Link>
              <ShareButtons
                url={`${SITE.url}/${locale}/blog/${slug}`}
                title={post.title}
                label={dict.ui.share}
              />
            </div>
          </article>
        </section>

        {/* Articole conexe */}
        {related.length > 0 && (
          <section className="border-t border-slate-100 bg-slate-50 py-12 lg:py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-slate-900">
                {locale === "ro" ? "Citește și" : "Читайте также"}
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/${locale}/blog/${r.slug}`}
                    className="group rounded-2xl border border-slate-100 bg-white p-5 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
                  >
                    <time className="text-xs font-medium text-brand-600">
                      {new Date(r.date).toLocaleDateString(locale === "ro" ? "ro-RO" : "ru-RU", { day: "numeric", month: "long", year: "numeric" })}
                    </time>
                    <h3 className="mt-2 font-bold leading-snug text-slate-900 group-hover:text-brand-700">
                      {r.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-600">{r.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CtaBand locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}

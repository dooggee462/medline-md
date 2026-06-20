import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, SITE, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";
import { TIKTOK_VIDEOS } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer, FloatingContact } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { TikTokGallery } from "@/components/TikTokGallery";
import { IconTiktok } from "@/components/Icons";

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
  return {
    title:
      locale === "ro"
        ? "Video — Asistență Medicală la Domiciliu | Medline.md"
        : "Видео — Медицинская Помощь на Дому | Medline.md",
    description: dict.ui.videoSubtitle,
    alternates: {
      canonical: `/${locale}/video`,
      languages: { ro: "/ro/video", ru: "/ru/video", "x-default": "/ro/video" },
    },
    openGraph: { title: dict.ui.videoTitle, description: dict.ui.videoSubtitle, url: `/${locale}/video` },
  };
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!LOCALES.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const hasVideos = TIKTOK_VIDEOS.length > 0;

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main>
        <section className="bg-gradient-to-b from-brand-50/70 to-white py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: dict.ui.breadcrumbHome, href: `/${locale}` },
                { name: dict.nav.video, href: `/${locale}/video` },
              ]}
            />
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              {dict.ui.videoTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              {dict.ui.videoSubtitle}
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {hasVideos ? (
              <TikTokGallery urls={TIKTOK_VIDEOS} />
            ) : (
              <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-forest-900 text-gold-400">
                  <IconTiktok className="h-8 w-8" />
                </span>
                <p className="mt-5 leading-relaxed text-slate-600">
                  {dict.ui.videoEmpty}
                </p>
                {SITE.social.tiktok && (
                  <a
                    href={SITE.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-7 py-3.5 text-base font-bold text-forest-950 shadow-lg transition-transform hover:scale-[1.02]"
                  >
                    <IconTiktok className="h-5 w-5" />
                    {dict.ui.videoFollow}
                  </a>
                )}
              </div>
            )}
          </div>
        </section>

        <CtaBand locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
      <FloatingContact dict={dict} />
    </>
  );
}

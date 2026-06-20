import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, SITE, whatsappLink, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";
import { serviceHref } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer, FloatingContact } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { IconDrop, IconStar, IconShield, IconCheck, IconPhone, IconWhatsApp } from "@/components/Icons";

const DETOX: Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    sections: { heading: string; body: string[] }[];
    faq: { q: string; a: string }[];
  }
> = {
  ro: {
    metaTitle:
      "Detoxifiere Post-Alcool la Domiciliu în Chișinău | Ieșire din Binge — Medline.md",
    metaDescription:
      "Detoxifiere post-alcool la domiciliu în Chișinău: perfuzii de detoxifiere, ieșire din binge, complex de vitamine și codare. Discret, anonim, 24/7. Sună acum.",
    keywords:
      "detoxifiere post-alcool, iesire din binge Chisinau, detoxifiere alcool la domiciliu, vivod iz zapoya Chisinau, perfuzie dupa alcool, codare anti-alcool Chisinau",
    sections: [
      {
        heading: "Ce este detoxifierea post-alcool",
        body: [
          "Detoxifierea post-alcool este un set de proceduri medicale care ajută organismul să elimine toxinele acumulate după consumul de alcool și să-și revină mai repede. Se realizează prin perfuzii cu soluții de rehidratare, vitamine și substanțe care ameliorează simptomele neplăcute: greață, tremurături, deshidratare, dureri de cap, anxietate și slăbiciune.",
          "La Medline aducem aceste proceduri direct la domiciliu, în Chișinău și împrejurimi, sub supravegherea unei asistente medicale autorizate — rapid, sigur și complet confidențial.",
        ],
      },
      {
        heading: "Cum decurge o vizită",
        body: [
          "Ne suni sau ne scrii, ne spui pe scurt situația, iar noi ajungem la tine în cel mai scurt timp — suntem disponibili 24/7. Asistenta evaluează starea generală, măsoară funcțiile vitale și montează perfuzia potrivită, rămânând lângă pacient pe tot parcursul.",
          "Pentru cazurile mai grave sau cu afecțiuni asociate, recomandăm și un consult medical de specialitate. Pentru cei care doresc un pas suplimentar către o viață fără alcool, oferim și serviciul de codare, după o evaluare prealabilă.",
        ],
      },
      {
        heading: "De ce să alegi detoxifierea la domiciliu",
        body: [
          "Acasă, pacientul se simte în siguranță, evită aglomerația și privirile din spital și își păstrează intimitatea. Pentru multe persoane, discreția este decisivă — de aceea garantăm confidențialitate deplină, fără judecăți.",
          "Intervenim rapid, cu materiale sterile de unică folosință și asistente cu experiență, astfel încât refacerea să fie cât mai blândă și sigură.",
        ],
      },
    ],
    faq: [
      {
        q: "Serviciul este cu adevărat confidențial?",
        a: "Da, absolut. Toate vizitele sunt discrete, la domiciliu, cu respect deplin pentru intimitatea pacientului. Nu cerem și nu divulgăm informații inutile.",
      },
      {
        q: "Cât de repede puteți ajunge?",
        a: "Suntem disponibili 24/7. În Chișinău ajungem de obicei în aproximativ 30 de minute de la apel.",
      },
      {
        q: "Detoxifierea vindecă dependența de alcool?",
        a: "Detoxifierea ameliorează starea fizică după consum, dar nu tratează dependența în sine. Pentru asta există codarea și sprijinul de specialitate — te putem îndruma.",
      },
      {
        q: "Am nevoie de prescripție?",
        a: "Pentru anumite soluții poate fi necesară o evaluare medicală. Sună-ne și îți spunem exact ce e nevoie pentru cazul tău.",
      },
    ],
  },
  ru: {
    metaTitle:
      "Вывод из Запоя на Дому в Кишинёве | Детоксикация после Алкоголя — Medline.md",
    metaDescription:
      "Вывод из запоя на дому в Кишинёве: детокс-капельницы, восстановление, витаминный комплекс и кодирование. Анонимно, конфиденциально, 24/7. Звоните.",
    keywords:
      "вывод из запоя Кишинёв, детоксикация после алкоголя на дому, капельница после алкоголя, вывод из запоя на дому, кодирование от алкоголя Кишинёв",
    sections: [
      {
        heading: "Что такое детоксикация после алкоголя",
        body: [
          "Детоксикация после алкоголя — это набор медицинских процедур, которые помогают организму вывести накопившиеся токсины и быстрее восстановиться. Проводится с помощью капельниц с растворами для регидратации, витаминами и веществами, облегчающими неприятные симптомы: тошноту, тремор, обезвоживание, головную боль, тревогу и слабость.",
          "В Medline мы привозим эти процедуры прямо на дом, в Кишинёве и окрестностях, под наблюдением сертифицированной медсестры — быстро, безопасно и полностью конфиденциально.",
        ],
      },
      {
        heading: "Как проходит визит",
        body: [
          "Вы звоните или пишете, кратко описываете ситуацию, и мы приезжаем как можно скорее — мы доступны 24/7. Медсестра оценивает общее состояние, измеряет жизненные показатели и ставит подходящую капельницу, оставаясь рядом с пациентом всё время.",
          "При тяжёлых случаях или сопутствующих заболеваниях рекомендуем консультацию специалиста. Для тех, кто хочет сделать шаг к жизни без алкоголя, мы также предлагаем кодирование — после предварительной оценки.",
        ],
      },
      {
        heading: "Почему стоит выбрать детокс на дому",
        body: [
          "Дома пациент чувствует себя в безопасности, избегает очередей и взглядов в больнице и сохраняет приватность. Для многих анонимность решающа — поэтому мы гарантируем полную конфиденциальность, без осуждения.",
          "Мы выезжаем быстро, со стерильными одноразовыми материалами и опытными медсёстрами, чтобы восстановление было мягким и безопасным.",
        ],
      },
    ],
    faq: [
      {
        q: "Услуга действительно анонимна?",
        a: "Да, абсолютно. Все визиты дискретны, на дому, с полным уважением к приватности пациента.",
      },
      {
        q: "Как быстро вы приедете?",
        a: "Мы доступны 24/7. По Кишинёву обычно приезжаем примерно за 30 минут после звонка.",
      },
      {
        q: "Детокс лечит алкогольную зависимость?",
        a: "Детокс облегчает физическое состояние после употребления, но не лечит саму зависимость. Для этого есть кодирование и помощь специалиста — мы направим вас.",
      },
      {
        q: "Нужен ли рецепт?",
        a: "Для некоторых растворов может понадобиться медицинская оценка. Позвоните — мы скажем, что нужно для вашего случая.",
      },
    ],
  },
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = DETOX[locale];
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    keywords: d.keywords,
    alternates: {
      canonical: `/${locale}/detoxifiere`,
      languages: { ro: "/ro/detoxifiere", ru: "/ru/detoxifiere", "x-default": "/ro/detoxifiere" },
    },
    openGraph: { title: d.metaTitle, description: d.metaDescription, url: `/${locale}/detoxifiere` },
  };
}

export default async function DetoxPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!LOCALES.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const d = DETOX[locale];
  const a = dict.alcohol;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: d.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const procLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: a.title,
    description: d.metaDescription,
    url: `${SITE.url}/${locale}/detoxifiere`,
    provider: { "@type": "MedicalClinic", name: SITE.legalName, telephone: SITE.phoneRaw, areaServed: SITE.address.city },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(procLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Header locale={locale} dict={dict} />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-forest-800 to-forest-950 py-16 text-white lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="[&_a]:text-gold-300">
              <Breadcrumbs
                items={[
                  { name: dict.ui.breadcrumbHome, href: `/${locale}` },
                  { name: dict.nav.detox, href: `/${locale}/detoxifiere` },
                ]}
              />
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-gold-400">
              {a.eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              {a.title}{" "}
              <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                {a.titleAccent}
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-50/90">{a.subtitle}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {a.points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm font-medium text-brand-50">
                  <IconCheck className="h-4 w-4 text-gold-400" /> {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={`tel:${SITE.phoneRaw}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-8 py-4 text-base font-bold text-forest-950 shadow-lg transition-transform hover:scale-[1.02]">
                <IconPhone className="h-5 w-5" /> {a.cta}
              </a>
              <a href={whatsappLink(dict.booking.waMessageIntro)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10">
                <IconWhatsApp className="h-5 w-5" /> WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Servicii */}
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {a.items.map((item, i) => {
                const Icon = [IconDrop, IconStar, IconShield][i] ?? IconDrop;
                return (
                  <Link key={item.title} href={serviceHref(locale, item.slug)} className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h2 className="mt-5 text-xl font-bold text-slate-900">{item.title}</h2>
                    <p className="mt-2 leading-relaxed text-slate-600">{item.desc}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Conținut SEO */}
        <section className="pb-14 lg:pb-20">
          <div className="mx-auto max-w-4xl space-y-10 px-4 sm:px-6 lg:px-8">
            {d.sections.map((sec) => (
              <div key={sec.heading}>
                <h2 className="text-2xl font-bold text-slate-900">{sec.heading}</h2>
                {sec.body.map((p, i) => (
                  <p key={i} className="mt-3 text-lg leading-relaxed text-slate-700">{p}</p>
                ))}
              </div>
            ))}

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{dict.faq.title}</h2>
              <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {d.faq.map((f) => (
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

        <CtaBand locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
      <FloatingContact dict={dict} />
    </>
  );
}

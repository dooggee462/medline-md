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
import { IconShield, IconDrop, IconStar, IconCheck, IconPhone, IconWhatsApp } from "@/components/Icons";

const CODARE: Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    breadcrumb: string;
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    points: string[];
    cta: string;
    cards: { title: string; desc: string; href: (locale: Locale) => string }[];
    sections: { heading: string; body: string[] }[];
    faq: { q: string; a: string }[];
  }
> = {
  ro: {
    metaTitle:
      "Codare Anti-Alcool în Chișinău | Codare la Domiciliu 24/7 — Medline.md",
    metaDescription:
      "Codare anti-alcool în Chișinău, la domiciliu: procedură sigură și confidențială, după evaluare medicală, cu acordul pacientului. Programare discretă, 24/7. Sună acum.",
    keywords:
      "codare Chisinau, codare la domiciliu, codare anti-alcool, codare alcool Chisinau, codare alcool pret, codare impotriva alcoolului, codare alcoolism, codare la domiciliu Chisinau, kodirovanie ot alkogolya Chisinau",
    breadcrumb: "Codare",
    eyebrow: "Confidențial · La domiciliu · 24/7",
    title: "Codare anti-alcool în Chișinău,",
    titleAccent: "direct la tine acasă",
    subtitle:
      "Procedura de codare împotriva dependenței de alcool, efectuată la domiciliu, în condiții sigure — după o evaluare prealabilă și cu acordul informat al pacientului. Discret, fără cozi, fără priviri străine.",
    points: ["100% confidențial", "Evaluare medicală prealabilă", "Programare discretă 24/7"],
    cta: "Sună pentru programare",
    cards: [
      {
        title: "Codare anti-alcool",
        desc: "Detalii complete despre procedură: condiții, pregătire, contraindicații și întrebări frecvente.",
        href: (l) => serviceHref(l, "codare-anti-alcool"),
      },
      {
        title: "Tratament post-alcool",
        desc: "Perfuzii de detoxifiere și refacere înainte de codare — ieșirea din binge este primul pas obligatoriu.",
        href: (l) => serviceHref(l, "tratament-post-alcool"),
      },
      {
        title: "Detoxifiere la domiciliu",
        desc: "Rehidratare, vitamine și ameliorarea stării după consum, sub supraveghere medicală.",
        href: (l) => `/${l}/detoxifiere`,
      },
    ],
    sections: [
      {
        heading: "Ce este codarea anti-alcool",
        body: [
          "Codarea este o procedură care susține decizia de a renunța la alcool, creând o barieră împotriva consumului. Se efectuează numai după o evaluare medicală prealabilă, cu acordul informat al pacientului și după o perioadă de abstinență — nu se face în stare de ebrietate.",
          "La Medline, procedura are loc la domiciliu, în Chișinău și împrejurimi: fără drumuri la clinică, fără săli de așteptare, cu discreție totală. Pentru mulți pacienți, intimitatea propriei case este exact ce face pasul acesta posibil.",
        ],
      },
      {
        heading: "Cum decurge codarea la domiciliu",
        body: [
          "Ne suni sau ne scrii pe WhatsApp și discutăm situația — anonim și fără obligații. Stabilim împreună data, iar înainte de procedură pacientul trece printr-o evaluare: starea generală, istoricul de consum, eventualele contraindicații.",
          "Dacă pacientul se află încă sub efectul alcoolului sau în binge, începem cu detoxifierea — perfuzii de refacere — și abia apoi, după perioada necesară de abstinență, efectuăm codarea. Totul sub supravegherea personalului medical calificat.",
        ],
      },
      {
        heading: "Cât costă codarea în Chișinău",
        body: [
          "Prețul depinde de metoda aleasă și de durata efectului dorit — de aceea nu afișăm un tarif unic. Sună-ne și, după o scurtă discuție despre situația ta, îți spunem exact costul, fără taxe ascunse. Consultarea telefonică este gratuită și confidențială.",
        ],
      },
    ],
    faq: [
      {
        q: "Se poate face codarea la domiciliu?",
        a: "Da. Echipa Medline se deplasează la domiciliu în Chișinău și împrejurimi, iar procedura se efectuează în condiții sigure, cu materiale sterile, după evaluarea prealabilă a pacientului.",
      },
      {
        q: "Cât costă codarea?",
        a: "Prețul depinde de metoda aleasă și de durata efectului. Sună-ne la +373 61 003 863 — după o scurtă evaluare telefonică îți comunicăm costul exact. Discuția este gratuită și confidențială.",
      },
      {
        q: "Ce pregătire este necesară înainte de codare?",
        a: "Este necesară o perioadă de abstinență de la alcool înainte de procedură — durata exactă o stabilim la evaluare. Dacă pacientul este în binge, începem cu detoxifiere prin perfuzii, apoi programăm codarea.",
      },
      {
        q: "Este confidențial?",
        a: "Absolut. Vizita are loc la domiciliu, discret, fără înregistrări inutile și fără divulgarea informațiilor. Confidențialitatea este principiul nostru de bază.",
      },
      {
        q: "Se poate face codarea fără acordul persoanei?",
        a: "Nu. Codarea se efectuează numai cu acordul informat al pacientului — atât din motive etice și legale, cât și pentru că motivația personală este esențială pentru rezultat.",
      },
    ],
  },
  ru: {
    metaTitle:
      "Кодирование от Алкоголя в Кишинёве | Кодировка на Дому 24/7 — Medline.md",
    metaDescription:
      "Кодирование от алкоголя в Кишинёве на дому: безопасная и конфиденциальная процедура после медицинской оценки, с согласия пациента. Дискретная запись, 24/7. Звоните.",
    keywords:
      "кодирование Кишинёв, кодирование от алкоголя, кодировка на дому, кодирование от алкоголизма Кишинёв, кодировка от алкоголя цена, кодирование на дому Кишинёв",
    breadcrumb: "Кодирование",
    eyebrow: "Конфиденциально · На дому · 24/7",
    title: "Кодирование от алкоголя в Кишинёве,",
    titleAccent: "прямо у вас дома",
    subtitle:
      "Процедура кодирования от алкогольной зависимости на дому, в безопасных условиях — после предварительной оценки и с информированного согласия пациента. Дискретно, без очередей и посторонних глаз.",
    points: ["100% конфиденциально", "Предварительная медицинская оценка", "Дискретная запись 24/7"],
    cta: "Позвонить и записаться",
    cards: [
      {
        title: "Кодирование от алкоголя",
        desc: "Подробно о процедуре: условия, подготовка, противопоказания и частые вопросы.",
        href: (l) => serviceHref(l, "codare-anti-alcool"),
      },
      {
        title: "Восстановление после алкоголя",
        desc: "Детокс-капельницы и восстановление перед кодированием — вывод из запоя это обязательный первый шаг.",
        href: (l) => serviceHref(l, "tratament-post-alcool"),
      },
      {
        title: "Детоксикация на дому",
        desc: "Регидратация, витамины и облегчение состояния после употребления, под медицинским наблюдением.",
        href: (l) => `/${l}/detoxifiere`,
      },
    ],
    sections: [
      {
        heading: "Что такое кодирование от алкоголя",
        body: [
          "Кодирование — это процедура, которая поддерживает решение отказаться от алкоголя, создавая барьер против употребления. Проводится только после предварительной медицинской оценки, с информированного согласия пациента и после периода трезвости — в состоянии опьянения процедура не выполняется.",
          "В Medline процедура проходит на дому, в Кишинёве и окрестностях: без поездок в клинику, без залов ожидания, с полной дискретностью. Для многих пациентов именно приватность собственного дома делает этот шаг возможным.",
        ],
      },
      {
        heading: "Как проходит кодирование на дому",
        body: [
          "Вы звоните или пишете в WhatsApp, и мы обсуждаем ситуацию — анонимно и без обязательств. Назначаем дату, а перед процедурой пациент проходит оценку: общее состояние, история употребления, возможные противопоказания.",
          "Если пациент ещё под воздействием алкоголя или в запое, начинаем с детоксикации — восстановительных капельниц — и только после необходимого периода трезвости проводим кодирование. Всё под наблюдением квалифицированного медперсонала.",
        ],
      },
      {
        heading: "Сколько стоит кодирование в Кишинёве",
        body: [
          "Цена зависит от выбранного метода и желаемой длительности эффекта, поэтому мы не публикуем единый тариф. Позвоните нам — после короткого разговора о вашей ситуации мы назовём точную стоимость, без скрытых платежей. Телефонная консультация бесплатна и конфиденциальна.",
        ],
      },
    ],
    faq: [
      {
        q: "Можно ли сделать кодирование на дому?",
        a: "Да. Команда Medline выезжает на дом в Кишинёве и окрестностях, процедура проводится в безопасных условиях, со стерильными материалами, после предварительной оценки пациента.",
      },
      {
        q: "Сколько стоит кодирование?",
        a: "Цена зависит от метода и длительности эффекта. Позвоните по номеру +373 61 003 863 — после короткой телефонной оценки мы назовём точную стоимость. Разговор бесплатный и конфиденциальный.",
      },
      {
        q: "Какая подготовка нужна перед кодированием?",
        a: "Перед процедурой необходим период трезвости — точную длительность определяем при оценке. Если пациент в запое, начинаем с детокс-капельниц, затем назначаем кодирование.",
      },
      {
        q: "Это конфиденциально?",
        a: "Абсолютно. Визит проходит на дому, дискретно, без лишних записей и разглашения информации. Конфиденциальность — наш базовый принцип.",
      },
      {
        q: "Можно ли закодировать человека без его согласия?",
        a: "Нет. Кодирование проводится только с информированного согласия пациента — как по этическим и юридическим причинам, так и потому, что личная мотивация решающа для результата.",
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
  const d = CODARE[locale];
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    keywords: d.keywords,
    alternates: {
      canonical: `/${locale}/codare`,
      languages: { ro: "/ro/codare", ru: "/ru/codare", "x-default": "/ro/codare" },
    },
    openGraph: { title: d.metaTitle, description: d.metaDescription, url: `/${locale}/codare` },
  };
}

export default async function CodarePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!LOCALES.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const d = CODARE[locale];

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
    name: `${d.title} ${d.titleAccent}`,
    description: d.metaDescription,
    url: `${SITE.url}/${locale}/codare`,
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
                  { name: d.breadcrumb, href: `/${locale}/codare` },
                ]}
              />
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-gold-400">
              {d.eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              {d.title}{" "}
              <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                {d.titleAccent}
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-50/90">{d.subtitle}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {d.points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm font-medium text-brand-50">
                  <IconCheck className="h-4 w-4 text-gold-400" /> {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={`tel:${SITE.phoneRaw}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-8 py-4 text-base font-bold text-forest-950 shadow-lg transition-transform hover:scale-[1.02]">
                <IconPhone className="h-5 w-5" /> {d.cta}
              </a>
              <a href={whatsappLink(dict.booking.waMessageIntro)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10">
                <IconWhatsApp className="h-5 w-5" /> WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Servicii conexe */}
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {d.cards.map((item, i) => {
                const Icon = [IconShield, IconDrop, IconStar][i] ?? IconShield;
                return (
                  <Link key={item.title} href={item.href(locale)} className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl">
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

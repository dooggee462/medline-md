import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, SITE, whatsappLink, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";
import { serviceHref } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
      "Detoxifiere Post-Alcool la Domiciliu în Chișinău | Ieșire din Binge 24/7 — Medline.md",
    metaDescription:
      "Detoxifiere post-alcool și ieșire din binge la domiciliu în Chișinău (Medline.md): perfuzii de dezintoxicare, vitamine și supraveghere medicală (Sochirean Victor). Sosire în 25-45 min, anonim 24/7: +373 61 003 863.",
    keywords:
      "detoxifiere post-alcool, iesire din binge Chisinau, detoxifiere alcool la domiciliu, vivod iz zapoya Chisinau, perfuzie dupa alcool, codare anti-alcool Chisinau, dezintoxicare alcoolica Chisinau",
    sections: [
      {
        heading: "Ce este detoxifierea post-alcool și ieșirea din binge",
        body: [
          "Detoxifierea post-alcool (ieșirea din binge / dezintoxicarea alcoolică) este un protocol medical intensiv care ajută organismul să elimine rapid metaboliții toxici ai alcoolului (acetaldehida), să oprească starea de sevraj și să-și restabilească echilibrul hidro-electrolitic și cardiovascular. Se realizează prin perfuzii intravenoase cu soluții cristaloide, hepatoprotectoare, vitamine din grupul B și C, magneziu, potasiu și medicație simptomatică (antiemetice, anxiolitice ușoare la indicație).",
          "La clinica Medline (medline.md), coordonată de medicul expert Sochirean Victor, efectuăm detoxifierea post-alcool direct la domiciliu în toate sectoarele din Chișinău (Centru, Botanica, Buiucani, Rîșcani, Ciocana, Telecentru) și în suburbii (Durlești, Stăuceni, Codru, Ialoveni, Dumbrava, Trușeni, Băcioi). Echipa ajunge în 25–45 de minute de la apelul la +373 61 003 863, 24/7, garantând anonimat 100%.",
        ],
      },
      {
        heading: "Cum decurge o vizită de detoxifiere la domiciliu",
        body: [
          "Ne suni la +373 61 003 863 sau ne scrii pe WhatsApp, ne spui pe scurt durata consumului și starea pacientului, iar asistenta medicală autorizată se deplasează imediat — 24/7, fără mașini inscripționate. La sosire, evaluăm starea generală, măsurăm tensiunea arterială, pulsul și saturația de oxigen, apoi montăm perfuzia de detoxifiere, rămânând lângă pacient pe toată durata procedurii (45–90 minute).",
          "Pentru pacienții care doresc să prevină recăderile după ieșirea din binge și stabilizarea completă a organismului, oferim și procedura de codare anti-alcool la domiciliu, în urma unei evaluări medicale prealabile.",
        ],
      },
      {
        heading: "De ce să alegi detoxifierea la domiciliu cu Medline.md",
        body: [
          "Acasă, pacientul se simte în siguranță, evită stresul transportului, aglomerația și privirile din spital și își păstrează intimitatea. Pentru multe familii din Chișinău, discreția este decisivă — de aceea Medline garantează confidențialitate deplină, fără înregistrare în registre publice și fără judecăți.",
          "Intervenim rapid (25–45 minute), cu consumabile sterile de unică folosință și protocoale verificate de medicul expert Sochirean Victor, astfel încât refacerea fizică și liniștirea pacientului să fie blânde și sigure.",
        ],
      },
    ],
    faq: [
      {
        q: "Serviciul de detoxifiere la domiciliu este cu adevărat confidențial?",
        a: "Da, 100% anonim. Echipa Medline vine în haine civile, cu automobil neinscripționat, fără raportări externe. Intimitatea pacientului și a familiei este prioritară.",
      },
      {
        q: "În cât timp ajungeți în Chișinău și la ce număr sunăm?",
        a: "Lucrăm non-stop 24/7. În Chișinău ajungem în 25–45 de minute de la apelul telefonic la +373 61 003 863 sau mesajul pe WhatsApp.",
      },
      {
        q: "Detoxifierea vindecă dependența de alcool?",
        a: "Detoxifierea scoate pacientul din starea de binge/intoxicație și elimină sevrajul fizic. Pentru blocarea consumului pe termen lung oferim și serviciul de codare anti-alcool la domiciliu, după o perioadă scurtă de abstinență.",
      },
      {
        q: "Cât costă detoxifierea post-alcool la domiciliu?",
        a: "Costul depinde de durata consumului și de complexitatea schemei de perfuzii necesare (standard sau intensivă). Sună la +373 61 003 863 pentru o evaluare telefonică gratuită și comunicarea prețului exact înainte de deplasare.",
      },
    ],
  },
  ru: {
    metaTitle:
      "Вывод из Запоя на Дому в Кишинёве 24/7 | Детоксикация после Алкоголя — Medline.md",
    metaDescription:
      "Вывод из запоя и детоксикация после алкоголя на дому в Кишинёве (Medline.md): детокс-капельницы, снятие интоксикации под контролем врача-эксперта Виктора Сокиряна. Выезд за 25-45 мин, анонимно 24/7: +373 61 003 863.",
    keywords:
      "вывод из запоя Кишинёв, детоксикация после алкоголя на дому, капельница после алкоголя Кишинёв, вывод из запоя на дому, кодирование от алкоголя Кишинёв, наркологическая помощь на дому Кишинёв",
    sections: [
      {
        heading: "Что такое вывод из запоя и детоксикация после алкоголя на дому",
        body: [
          "Вывод из запоя (алкогольная детоксикация на дому) — это комплекс интенсивных медицинских процедур, которые помогают организму быстро вывести токсичные продукты распада этанола (ацетальдегид), купировать абстинентный синдром и восстановить водно-электролитный баланс и работу сердца. Проводится с помощью внутривенных капельниц с кристаллоидными растворами, гепатопротекторами, витаминами группы B и C, магнием, калием и симптоматическими препаратами (противорвотные, седативные по показаниям).",
          "В клинике Medline (medline.md), под медицинским руководством врача-эксперта Виктора Сокиряна (Sochirean Victor), мы проводим вывод из запоя прямо на дому во всех секторах Кишинёва (Центр, Ботаника, Буюканы, Рышкановка, Чеканы, Телецентр) и пригородах (Дурлешты, Ставчены, Кодру, Яловены, Думбрава, Трушены, Бачой). Медсестра приезжает за 25–45 минут после звонка на +373 61 003 863, круглосуточно 24/7, со 100% гарантией анонимности.",
        ],
      },
      {
        heading: "Как проходит визит для вывода из запоя",
        body: [
          "Вы звоните по номеру +373 61 003 863 или пишете в WhatsApp, кратко описываете длительность употребления и самочувствие пациента, и сертифицированная медсестра выезжает немедленно — 24/7, на автомобиле без опознавательных знаков. На месте мы оцениваем общее состояние, измеряем артериальное давление, пульс и сатурацию, после чего ставим детокс-капельницу и непрерывно наблюдаем пациента на протяжении всей процедуры (45–90 минут).",
          "Для пациентов, которые хотят закрепить результат после вывода из запоя и полного очищения организма, мы также предлагаем процедуру кодирования от алкоголя на дому после предварительной медицинской оценки.",
        ],
      },
      {
        heading: "Почему стоит выбрать вывод из запоя на дому с Medline.md",
        body: [
          "Дома пациент чувствует себя спокойно и в безопасности, избегает стресса транспортировки, очередей и посторонних взглядов в стационаре. Для многих семей в Кишинёве анонимность решающа — поэтому Medline гарантирует полную конфиденциальность, без постановки на учёт и без осуждения.",
          "Мы выезжаем оперативно (25–45 минут), используем только стерильные одноразовые материалы и протоколы, утверждённые врачом-экспертом Виктором Сокиряном, чтобы восстановление и нормализация сна прошли мягко и безопасно.",
        ],
      },
    ],
    faq: [
      {
        q: "Вывод из запоя на дому действительно анонимен?",
        a: "Да, на 100% анонимно. Специалист Medline приезжает в обычной одежде на автомобиле без медицинской символики. Данные пациента никуда не передаются и не ставятся на учёт.",
      },
      {
        q: "Как быстро вы приедете по Кишинёву и куда звонить?",
        a: "Мы работаем круглосуточно 24/7 без выходных. По Кишинёву приезжаем за 25–45 минут после звонка по телефону +373 61 003 863 или сообщения в WhatsApp.",
      },
      {
        q: "Детокс-капельница лечит алкогольную зависимость?",
        a: "Детоксикация снимает острую интоксикацию, тремор, тошноту и помогает выйти из запоя. Для долгосрочного отказа от алкоголя мы проводим кодирование на дому — после нескольких дней трезвости.",
      },
      {
        q: "Сколько стоит вывод из запоя на дому в Кишинёве?",
        a: "Стоимость зависит от длительности запоя и необходимого состава капельницы (стандартное или усиленное очищение). Позвоните по номеру +373 61 003 863 — мы бесплатно проконсультируем и назовём точную цену до выезда.",
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
    "@type": ["MedicalProcedure", "MedicalWebPage"],
    name: `${a.title} ${a.titleAccent}`,
    description: d.metaDescription,
    url: `${SITE.url}/${locale}/detoxifiere`,
    inLanguage: locale === "ro" ? "ro-MD" : "ru-MD",
    procedureType: "https://schema.org/TherapeuticProcedure",
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
    provider: {
      "@type": "MedicalClinic",
      "@id": `${SITE.url}/#clinic`,
      name: SITE.legalName,
      telephone: SITE.phoneRaw,
      url: SITE.url,
      areaServed: [
        { "@type": "City", name: SITE.address.city },
        ...SITE.suburbs[locale].map((name) => ({ "@type": "Place", name })),
      ],
    },
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
            <div className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-xs text-brand-50/90">
              <IconShield className="h-4 w-4 text-gold-400 shrink-0" />
              <span>
                {locale === "ro" ? "Protocol medical verificat de:" : "Медицинский протокол проверил:"}{" "}
                <Link href={`/${locale}/despre-noi`} className="font-bold text-white underline decoration-gold-400/70 underline-offset-2 hover:text-gold-300">
                  {SITE.author.name}
                </Link>{" "}
                ({SITE.author.jobTitle[locale]})
              </span>
            </div>
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
            <aside
              aria-label={locale === "ro" ? "Informații rapide despre serviciu" : "Краткая информация об услуге"}
              className="rounded-2xl border border-brand-100 bg-brand-50/50 p-6 text-sm text-slate-700 shadow-sm"
            >
              <h2 className="text-base font-bold text-slate-900">
                {locale === "ro"
                  ? "Detoxifiere Post-Alcool & Ieșire din Binge la Domiciliu în Chișinău — Medline.md"
                  : "Вывод из Запоя и Детоксикация на Дому в Кишинёве — Medline.md"}
              </h2>
              <dl className="mt-3 grid gap-2 sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-slate-900">
                    {locale === "ro" ? "Clinică & Coordonator medical:" : "Клиника и медицинский эксперт:"}
                  </dt>
                  <dd>
                    Medline ({SITE.legalName}) — {SITE.author.name} ({SITE.author.jobTitle[locale]})
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">
                    {locale === "ro" ? "Program & Timp de sosire:" : "График и время приезда:"}
                  </dt>
                  <dd>
                    {locale === "ro"
                      ? "Non-stop 24/7 · Sosire în 25–45 min în Chișinău (100% anonim)"
                      : "Круглосуточно 24/7 · Выезд за 25–45 мин по Кишинёву (100% анонимно)"}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">
                    {locale === "ro" ? "Zone acoperite:" : "Зоны выезда:"}
                  </dt>
                  <dd>
                    {SITE.address.city} ({SITE.sectors[locale].join(", ")}) &amp; {SITE.suburbs[locale].join(", ")}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">
                    {locale === "ro" ? "Urgențe & Programări 24/7:" : "Вызов на дом 24/7:"}
                  </dt>
                  <dd>
                    <a href={`tel:${SITE.phoneRaw}`} className="font-bold text-brand-700 hover:underline">
                      {SITE.phoneDisplay}
                    </a>{" "}
                    (Apel / WhatsApp)
                  </dd>
                </div>
              </dl>
            </aside>

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
    </>
  );
}

import type { Metadata } from "next";
import { ogDefaults } from "@/lib/seo";
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
    /** H1 propriu: titlul din dict.alcohol e și titlul secțiunii de pe pagina principală */
    h1: string;
    h1Accent: string;
    sections: { heading: string; body: string[] }[];
    faq: { q: string; a: string }[];
  }
> = {
  ro: {
    metaTitle:
      "Detoxifiere Alcool la Domiciliu Chișinău — Medic Narcolog 24/7 | Medline.md",
    metaDescription:
      "Detoxifiere alcool și ieșire din binge la domiciliu în Chișinău: medicul narcolog Sochirean Victor vine personal în 25–45 min. Anonim, 24/7: +373 61 003 863",
    keywords:
      "detoxifiere post-alcool, iesire din binge Chisinau, detoxifiere alcool la domiciliu, narcolog la domiciliu Chisinau, medic narcolog Chisinau, vivod iz zapoya Chisinau, perfuzie dupa alcool, dezintoxicare alcoolica Chisinau",
    h1: "Detoxifiere post-alcool la domiciliu în Chișinău",
    h1Accent: "— medic narcolog 24/7",
    sections: [
      {
        heading: "Ce este detoxifierea post-alcool și ieșirea din binge",
        body: [
          "Detoxifierea post-alcool (ieșirea din binge / dezintoxicarea alcoolică) este un protocol medical intensiv care ajută organismul să elimine rapid metaboliții toxici ai alcoolului (acetaldehida), să oprească starea de sevraj și să-și restabilească echilibrul hidro-electrolitic și cardiovascular. Se realizează prin perfuzii intravenoase cu soluții cristaloide, hepatoprotectoare, vitamine din grupul B și C, magneziu, potasiu și medicație simptomatică (antiemetice, anxiolitice ușoare la indicație).",
          "La clinica Medline (medline.md), detoxifierea la domiciliu o face personal medicul narcolog Sochirean Victor, în toate sectoarele din Chișinău (Centru, Botanica, Buiucani, Rîșcani, Ciocana, Telecentru) și în suburbii (Durlești, Stăuceni, Codru, Ialoveni, Dumbrava, Trușeni, Băcioi). Medicul ajunge în 25–45 de minute de la apelul la +373 61 003 863, 24/7, cu anonimat 100%.",
        ],
      },
      {
        heading: "Când e nevoie de detoxifiere: semnele",
        body: [
          "Detoxifierea e necesară când omul bea de mai multe zile la rând și nu se poate opri singur, iar când încearcă să se oprească apar tremurul mâinilor, transpirațiile, greața sau vărsăturile, insomnia, palpitațiile, tensiunea oscilantă sau neliniștea. Sunt semnele sevrajului: organismul a devenit dependent de alcool, iar oprirea bruscă fără ajutor medical se suportă greu.",
          "Cu cât binge-ul durează mai mult, cu atât ieșirea din el e mai grea și cu atât crește solicitarea inimii, a ficatului și a sistemului nervos — de aceea nu merită să amâni apelul.",
          "Dacă omul are convulsii, halucinații, confuzie, durere în piept sau își pierde cunoștința, este o urgență: sună imediat la 112. Aceste situații se tratează în spital, nu la domiciliu.",
        ],
      },
      {
        heading: "Cum decurge o vizită de detoxifiere la domiciliu",
        body: [
          "Ne suni la +373 61 003 863 sau ne scrii pe WhatsApp și ne spui pe scurt de cât timp durează consumul și cum se simte pacientul. Medicul narcolog vine personal — 24/7, fără mașini inscripționate. La sosire îl examinează pe pacient, măsoară tensiunea, pulsul și saturația de oxigen, întreabă despre bolile cronice și medicamentele luate, și abia apoi alege compoziția perfuziei. Perfuzia durează 45–90 de minute, iar medicul rămâne lângă pacient tot timpul.",
          "Înainte să plece, medicul le explică celor apropiați cum vor decurge următoarele ore, ce se poate și ce nu se poate face și la ce semne să sune din nou. După un binge lung, o singură perfuzie poate să nu ajungă — atunci medicul stabilește o nouă vizită.",
          "Pentru pacienții care vor să rămână fără alcool după ieșirea din binge, același medic narcolog face și codarea anti-alcool la domiciliu, după perioada necesară de abstinență.",
        ],
      },
      {
        heading: "Când detoxifierea la domiciliu nu este posibilă",
        body: [
          "Medicul narcolog evaluează de fiecare dată dacă tratamentul acasă este sigur. E nevoie de spital când pacientul are delir alcoolic, convulsii, boli grave de inimă sau de ficat decompensate, ori când binge-ul se combină cu droguri sau cu doze mari de sedative. În aceste cazuri medicul explică de ce tratamentul acasă ar fi periculos și ce trebuie făcut mai departe.",
        ],
      },
      {
        heading: "De ce să alegi detoxifierea la domiciliu cu Medline.md",
        body: [
          "Acasă, pacientul se simte în siguranță, evită stresul transportului, aglomerația și privirile din spital și își păstrează intimitatea. Pentru multe familii din Chișinău, discreția este decisivă — de aceea Medline garantează confidențialitate deplină, fără înregistrare în registre publice și fără judecăți.",
          "Intervenim rapid (25–45 minute), cu consumabile sterile de unică folosință, iar fiecare pacient este văzut personal de medicul narcolog Sochirean Victor, astfel încât refacerea fizică și liniștirea pacientului să fie blânde și sigure.",
        ],
      },
    ],
    faq: [
      {
        q: "Vine medicul narcolog personal sau o asistentă?",
        a: "Vine personal medicul narcolog Sochirean Victor. El examinează pacientul, alege perfuzia și rămâne lângă el până la sfârșitul procedurii.",
      },
      {
        q: "Serviciul de detoxifiere la domiciliu este cu adevărat confidențial?",
        a: "Da, 100% anonim. Medicul vine în haine civile, cu automobil neinscripționat, fără raportări externe. Intimitatea pacientului și a familiei este prioritară.",
      },
      {
        q: "Se poate face detoxifierea noaptea?",
        a: "Da, lucrăm non-stop, inclusiv noaptea, în weekend și de sărbători. În Chișinău medicul ajunge în 25–45 de minute de la apelul la +373 61 003 863 sau mesajul pe WhatsApp.",
      },
      {
        q: "Se poate face detoxifierea fără acordul pacientului?",
        a: "Tratamentul la domiciliu se face numai cu acordul pacientului — fără el, medicul nu poate monta perfuzia. Dacă omul refuză, iar starea lui îi pune viața în pericol (convulsii, halucinații, pierderea cunoștinței), sună la 112.",
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
    metaTitle: "Вывод из запоя на дому в Кишинёве — нарколог 24/7 | Medline.md",
    metaDescription:
      "Вывод из запоя на дому в Кишинёве: врач-нарколог Виктор Сокирян приезжает лично за 25–45 мин, капельница и наблюдение. Анонимно, 24/7: +373 61 003 863",
    keywords:
      "вывод из запоя Кишинёв, вывод из запоя на дому, нарколог на дом Кишинёв, вызов нарколога на дом, капельница от запоя Кишинёв, детоксикация после алкоголя на дому, наркологическая помощь на дому Кишинёв",
    h1: "Вывод из запоя на дому в Кишинёве",
    h1Accent: "— врач-нарколог 24/7",
    sections: [
      {
        heading: "Что такое вывод из запоя и детоксикация после алкоголя на дому",
        body: [
          "Вывод из запоя (алкогольная детоксикация на дому) — это комплекс интенсивных медицинских процедур, которые помогают организму быстро вывести токсичные продукты распада этанола (ацетальдегид), купировать абстинентный синдром и восстановить водно-электролитный баланс и работу сердца. Проводится с помощью внутривенных капельниц с кристаллоидными растворами, гепатопротекторами, витаминами группы B и C, магнием, калием и симптоматическими препаратами (противорвотные, седативные по показаниям).",
          "В клинике Medline (medline.md) вывод из запоя на дому лично проводит врач-нарколог Виктор Сокирян (Sochirean Victor) — во всех секторах Кишинёва (Центр, Ботаника, Буюканы, Рышкановка, Чеканы, Телецентр) и пригородах (Дурлешты, Ставчены, Кодру, Яловены, Думбрава, Трушены, Бачой). Врач приезжает за 25–45 минут после звонка на +373 61 003 863, круглосуточно 24/7, со 100% гарантией анонимности.",
        ],
      },
      {
        heading: "Когда нужен вывод из запоя: признаки",
        body: [
          "Вывод из запоя нужен, если человек пьёт несколько дней подряд и не может остановиться сам, а при попытке бросить появляются дрожь в руках, потливость, тошнота или рвота, бессонница, сердцебиение, скачки давления, тревога. Это признаки абстинентного синдрома: организм уже зависит от алкоголя, и резкая остановка без медицинской помощи переносится тяжело.",
          "Чем дольше длится запой, тем тяжелее из него выйти и тем выше нагрузка на сердце, печень и нервную систему — поэтому откладывать звонок не стоит.",
          "Если у человека судороги, галлюцинации, спутанность сознания, боль в груди или он теряет сознание — это неотложное состояние: сразу звоните 112. Такие случаи лечат в стационаре, а не на дому.",
        ],
      },
      {
        heading: "Как проходит вывод из запоя на дому",
        body: [
          "Вы звоните по номеру +373 61 003 863 или пишете в WhatsApp и кратко рассказываете, сколько длится запой и как себя чувствует пациент. Врач-нарколог выезжает сам — 24/7, на автомобиле без опознавательных знаков. На месте он осматривает пациента, измеряет давление, пульс и сатурацию, уточняет хронические болезни и принимаемые лекарства и только после этого подбирает состав капельницы. Капельница длится 45–90 минут, и всё это время врач остаётся рядом.",
          "Перед уходом врач объясняет родственникам, как пройдут ближайшие часы, что можно и чего нельзя делать и при каких признаках звонить снова. После длительного запоя одной капельницы может не хватить — тогда врач договаривается о повторном визите.",
          "Для пациентов, которые хотят закрепить результат после вывода из запоя, тот же врач-нарколог проводит кодирование от алкоголя на дому — после необходимого периода трезвости.",
        ],
      },
      {
        heading: "Когда вывод из запоя на дому невозможен",
        body: [
          "Врач-нарколог каждый раз оценивает, безопасно ли лечение дома. Стационар нужен, если у пациента алкогольный делирий («белая горячка»), судороги, тяжёлые болезни сердца или печени в стадии декомпенсации, а также если запой сочетается с наркотиками или большими дозами седативных препаратов. В таких случаях врач объясняет, почему лечение дома опасно, и что делать дальше.",
        ],
      },
      {
        heading: "Почему стоит выбрать вывод из запоя на дому с Medline.md",
        body: [
          "Дома пациент чувствует себя спокойно и в безопасности, избегает стресса транспортировки, очередей и посторонних взглядов в стационаре. Для многих семей в Кишинёве анонимность решающа — поэтому Medline гарантирует полную конфиденциальность, без постановки на учёт и без осуждения.",
          "Мы выезжаем оперативно (25–45 минут), используем только стерильные одноразовые материалы, а каждого пациента лично ведёт врач-нарколог Виктор Сокирян — чтобы восстановление и нормализация сна прошли мягко и безопасно.",
        ],
      },
    ],
    faq: [
      {
        q: "Приезжает сам нарколог или медсестра?",
        a: "Приезжает сам врач-нарколог Виктор Сокирян. Он осматривает пациента, подбирает капельницу и остаётся рядом до конца процедуры.",
      },
      {
        q: "Вывод из запоя на дому действительно анонимен?",
        a: "Да, на 100% анонимно. Врач приезжает в обычной одежде на автомобиле без медицинской символики. Данные пациента никуда не передаются и не ставятся на учёт.",
      },
      {
        q: "Можно ли вывести из запоя ночью?",
        a: "Да, мы работаем круглосуточно, включая ночь, выходные и праздники. По Кишинёву врач приезжает за 25–45 минут после звонка по телефону +373 61 003 863 или сообщения в WhatsApp.",
      },
      {
        q: "Можно ли вывести из запоя без согласия пациента?",
        a: "Лечение на дому проводится только с согласия пациента — без него врач не может поставить капельницу. Если человек отказывается, а его состояние угрожает жизни (судороги, галлюцинации, потеря сознания), звоните 112.",
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
    openGraph: { ...ogDefaults(locale), title: d.metaTitle, description: d.metaDescription, url: `/${locale}/detoxifiere` },
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
    name: d.h1,
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
              {d.h1}{" "}
              <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                {d.h1Accent}
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
                {locale === "ro" ? "Vine personal:" : "Приезжает лично:"}{" "}
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
                    {locale === "ro" ? "Clinică & medic narcolog:" : "Клиника и врач-нарколог:"}
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

            <p className="rounded-2xl border border-brand-100 bg-brand-50/50 p-5 text-lg leading-relaxed text-slate-700">
              {locale === "ro"
                ? "Vrei ca medicul să vină întâi să evalueze situația, înainte de orice procedură? "
                : "Нужно, чтобы врач сначала приехал и оценил ситуацию, а потом решил, что делать? "}
              <Link href={`/${locale}/narcolog`} className="font-semibold text-brand-700 hover:underline">
                {locale === "ro" ? "Narcolog la domiciliu în Chișinău →" : "Вызов нарколога на дом в Кишинёве →"}
              </Link>
            </p>

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

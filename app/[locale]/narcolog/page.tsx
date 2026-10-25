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

/**
 * „Вызов нарколога на дом" e altă căutare decât „вывод из запоя": omul vrea
 * un medic care să vină și să decidă ce trebuie făcut, nu o procedură anume.
 * Concurenții de pe primele locuri au pagini separate pentru cele două, așa
 * că și noi le ținem separat: aici vizita medicului, la /detoxifiere
 * procedura. Toate afirmațiile despre cine vine sunt confirmate de client:
 * dr. Sochirean, medic narcolog, merge personal la fiecare pacient.
 */
const NARCOLOG: Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    breadcrumb: string;
    eyebrow: string;
    h1: string;
    h1Accent: string;
    subtitle: string;
    points: string[];
    cta: string;
    cards: { title: string; desc: string; href: (locale: Locale) => string }[];
    /** urgent: lista de semne pentru 112 — marcaj roșu, nu bifa verde de „în regulă" */
    sections: { heading: string; body: string[]; list?: string[]; urgent?: boolean }[];
    faq: { q: string; a: string }[];
  }
> = {
  ro: {
    metaTitle: "Narcolog la Domiciliu în Chișinău 24/7 — Anonim | Medline.md",
    metaDescription:
      "Narcolog la domiciliu în Chișinău, 24/7: medicul vine personal în 25–45 min — evaluare, oprirea sevrajului, perfuzie, plan de tratament. Anonim: +373 61 003 863",
    keywords:
      "narcolog la domiciliu, narcolog la domiciliu Chisinau, chemare narcolog acasa, medic narcolog Chisinau, narcolog 24/7, narcolog anonim Chisinau, sevraj alcool tratament la domiciliu",
    breadcrumb: "Narcolog la domiciliu",
    eyebrow: "Anonim · Medicul vine personal · 24/7",
    h1: "Narcolog la domiciliu în Chișinău",
    h1Accent: "— vine în 25–45 de minute",
    subtitle:
      "Medicul narcolog Sochirean Victor vine personal la pacient acasă, în Chișinău și suburbii: îl examinează, oprește sevrajul și le spune celor apropiați ce trebuie făcut mai departe.",
    points: ["Vine medicul narcolog, nu asistenta", "Sosire în 25–45 de minute", "Fără înregistrare în registre publice"],
    cta: "Cheamă narcologul",
    cards: [
      {
        title: "Detoxifiere la domiciliu",
        desc: "Ieșirea din binge: perfuzii de detoxifiere și supraveghere medicală, direct acasă.",
        href: (l) => `/${l}/detoxifiere`,
      },
      {
        title: "Codare anti-alcool",
        desc: "Pasul următor după detoxifiere, făcut tot de medicul narcolog, după perioada de abstinență.",
        href: (l) => `/${l}/codare`,
      },
      {
        title: "Tratament post-alcool",
        desc: "Perfuzii de refacere după un consum excesiv sau o mahmureală severă.",
        href: (l) => serviceHref(l, "tratament-post-alcool"),
      },
    ],
    sections: [
      {
        heading: "Când să chemi narcologul acasă",
        body: [
          "Un medic narcolog la domiciliu e potrivit atunci când problema e legată de alcool, situația e serioasă, dar nu e o urgență pentru 112, iar omul nu poate sau nu vrea să meargă la o clinică. Cele mai frecvente situații în care ne sună familiile:",
        ],
        list: [
          "omul bea de câteva zile la rând și nu se poate opri singur;",
          "apar semnele sevrajului: tremurul mâinilor, transpirații, greață, insomnie, palpitații, neliniște, tensiune oscilantă;",
          "după un consum mare starea nu se îmbunătățește de la sine în câteva ore;",
          "omul acceptă să se trateze, dar nu vrea să fie văzut la o clinică;",
          "familia vrea să afle dacă e posibilă codarea și cu ce trebuie început.",
        ],
      },
      {
        heading: "Ce face medicul narcolog la domiciliu",
        body: [
          "Mai întâi examinează pacientul: măsoară tensiunea, pulsul și saturația de oxigen și întreabă de cât timp durează consumul, ce boli are și ce medicamente ia. După asta decide dacă tratamentul acasă este sigur.",
          "Dacă este, montează o perfuzie care elimină intoxicația și oprește sevrajul. Perfuzia durează 45–90 de minute, iar medicul rămâne lângă pacient tot timpul. Când e vorba de un binge, vizita devine ieșirea din binge la domiciliu — o descriem pas cu pas pe pagina de detoxifiere.",
          "La final le explică celor apropiați cum vor decurge următoarele ore, ce să evite și la ce semne să sune din nou. Dacă e nevoie, stabilește o nouă vizită, iar când pacientul e pregătit, discută despre codare — pe care o face tot el, după perioada necesară de abstinență.",
        ],
      },
      {
        heading: "Cum chemi narcologul: 3 pași",
        body: [
          "1. Suni la +373 61 003 863 sau scrii pe WhatsApp și spui pe scurt de câte zile durează consumul, cum se simte omul acum și ce boli are.",
          "2. Medicul pleacă imediat și ajunge în 25–45 de minute oriunde în Chișinău și în suburbii. Vine în haine civile, cu o mașină fără inscripții.",
          "3. Examinarea și tratamentul au loc pe loc, acasă. Prețul îl afli la telefon, înainte ca medicul să plece spre tine.",
        ],
      },
      {
        heading: "Când nu aștepta narcologul: sună la 112",
        urgent: true,
        body: [
          "Unele stări sunt urgențe și se tratează doar în spital. Sună imediat la 112 dacă omul:",
        ],
        list: [
          "are convulsii;",
          "vede sau aude lucruri care nu există, nu știe unde se află ori nu-și recunoaște apropiații;",
          "își pierde cunoștința sau nu poate fi trezit;",
          "are durere în piept sau respiră greu;",
          "varsă sânge.",
        ],
      },
      {
        heading: "Anonimat",
        body: [
          "Medicul vine în haine civile, cu o mașină fără inscripții. Pacientul nu este luat în evidența narcologică și nu apare în registre publice, iar datele lui nu sunt transmise nimănui. Pentru multe familii din Chișinău, discreția contează la fel de mult ca tratamentul — de aceea e regula noastră de bază.",
        ],
      },
    ],
    faq: [
      {
        q: "În cât timp ajunge narcologul?",
        a: "În 25–45 de minute de la apel, oriunde în Chișinău și în suburbii: Durlești, Stăuceni, Codru, Ialoveni, Dumbrava, Trușeni, Băcioi, Ciorescu, Tohatin, Vatra, Sîngera și Bubuieci.",
      },
      {
        q: "Pot chema narcologul noaptea sau în weekend?",
        a: "Da. Lucrăm non-stop, inclusiv noaptea, în weekend și de sărbători.",
      },
      {
        q: "E nevoie de acordul pacientului?",
        a: "Tratamentul se face numai cu acordul pacientului. Medicul poate vorbi cu el și cu familia, dar nu îl poate trata împotriva voinței lui. Dacă omul refuză, iar starea lui îi pune viața în pericol, sună la 112.",
      },
      {
        q: "Rămâne pacientul înregistrat undeva după vizită?",
        a: "Nu. Nu luăm pacientul în evidența narcologică, nu apare în registre publice și nu transmitem datele lui nimănui.",
      },
      {
        q: "Ce diferență e între chemarea narcologului și detoxifierea la domiciliu?",
        a: "Chemarea narcologului înseamnă vizita medicului: examinarea și decizia despre ce trebuie făcut. Detoxifierea (ieșirea din binge) este una dintre procedurile pe care medicul le face pe loc, cel mai des.",
      },
      {
        q: "Ce să pregătesc până vine medicul?",
        a: "Lista medicamentelor pe care le ia pacientul, diagnosticele cunoscute și de câte zile durează consumul. Nu-i da somnifere sau calmante „ca să se liniștească” — împreună cu alcoolul pot fi periculoase.",
      },
      {
        q: "Cât costă chemarea narcologului la domiciliu?",
        a: "Depinde de ce e nevoie la fața locului. Sună la +373 61 003 863 — consultația telefonică e gratuită, iar prețul îl afli înainte ca medicul să plece.",
      },
    ],
  },
  ru: {
    metaTitle: "Вызов нарколога на дом в Кишинёве 24/7 — анонимно | Medline.md",
    metaDescription:
      "Вызов нарколога на дом в Кишинёве 24/7: врач приезжает лично за 25–45 минут — осмотр, снятие абстиненции, капельница, план лечения. Анонимно: +373 61 003 863",
    keywords:
      "вызов нарколога на дом, нарколог на дом Кишинёв, вызвать нарколога на дом, нарколог на дом круглосуточно, анонимный нарколог Кишинёв, врач-нарколог на дом, снятие абстиненции на дому",
    breadcrumb: "Нарколог на дом",
    eyebrow: "Анонимно · Врач приезжает сам · 24/7",
    h1: "Вызов нарколога на дом в Кишинёве",
    h1Accent: "— приезд за 25–45 минут",
    subtitle:
      "Врач-нарколог Виктор Сокирян сам приезжает к пациенту домой по Кишинёву и пригородам: осматривает, снимает абстинентный синдром и объясняет семье, что делать дальше.",
    points: ["Приезжает врач-нарколог, а не медсестра", "Выезд за 25–45 минут", "Без постановки на учёт"],
    cta: "Вызвать нарколога",
    cards: [
      {
        title: "Вывод из запоя на дому",
        desc: "Детокс-капельницы и наблюдение врача, чтобы безопасно выйти из запоя дома.",
        href: (l) => `/${l}/detoxifiere`,
      },
      {
        title: "Кодирование от алкоголя",
        desc: "Следующий шаг после вывода из запоя — его тоже проводит врач-нарколог, после периода трезвости.",
        href: (l) => `/${l}/codare`,
      },
      {
        title: "Лечение после алкоголя",
        desc: "Восстановительные капельницы после сильного употребления или тяжёлого похмелья.",
        href: (l) => serviceHref(l, "tratament-post-alcool"),
      },
    ],
    sections: [
      {
        heading: "Когда вызывать нарколога на дом",
        body: [
          "Нарколог на дом нужен, когда проблема связана с алкоголем, ситуация серьёзная, но не требует скорой, а человек не может или не хочет ехать в клинику. Чаще всего нам звонят родственники, когда:",
        ],
        list: [
          "человек пьёт несколько дней подряд и не может остановиться сам;",
          "появились признаки абстиненции: дрожь в руках, потливость, тошнота, бессонница, сердцебиение, тревога, скачки давления;",
          "после сильного употребления состояние не улучшается само за несколько часов;",
          "человек согласен лечиться, но не хочет, чтобы его видели в клинике;",
          "семья хочет понять, возможно ли кодирование и с чего начать.",
        ],
      },
      {
        heading: "Что делает нарколог на дому",
        body: [
          "Сначала врач осматривает пациента: измеряет давление, пульс и сатурацию, расспрашивает, сколько длится употребление, какие есть болезни и какие лекарства человек принимает. После этого он решает, безопасно ли лечение дома.",
          "Если безопасно — ставит капельницу, которая снимает интоксикацию и абстинентный синдром. Капельница длится 45–90 минут, и всё это время врач остаётся рядом. Если речь о запое, визит превращается в вывод из запоя на дому — он подробно описан на отдельной странице.",
          "В конце врач объясняет родственникам, как пройдут ближайшие часы, чего избегать и при каких признаках звонить снова. При необходимости договаривается о повторном визите, а когда пациент готов — обсуждает кодирование, которое проводит сам, после нужного периода трезвости.",
        ],
      },
      {
        heading: "Как вызвать нарколога: 3 шага",
        body: [
          "1. Позвоните по номеру +373 61 003 863 или напишите в WhatsApp и коротко расскажите, сколько дней длится употребление, как человек себя чувствует сейчас и какие у него болезни.",
          "2. Врач выезжает сразу и приезжает за 25–45 минут в любой район Кишинёва и пригородов — в обычной одежде, на машине без опознавательных знаков.",
          "3. Осмотр и лечение проходят на месте, дома. Стоимость вы узнаёте по телефону, до выезда врача.",
        ],
      },
      {
        heading: "Когда не ждать нарколога, а звонить 112",
        urgent: true,
        body: [
          "Некоторые состояния — неотложные, их лечат только в больнице. Сразу звоните 112, если у человека:",
        ],
        list: [
          "судороги;",
          "галлюцинации или спутанность сознания — не понимает, где находится, не узнаёт близких;",
          "потеря сознания или его невозможно разбудить;",
          "боль в груди или тяжёлое дыхание;",
          "рвота с кровью.",
        ],
      },
      {
        heading: "Анонимность",
        body: [
          "Врач приезжает в обычной одежде, на машине без опознавательных знаков. Пациента не ставят на учёт, его данные никуда не передаются. Для многих семей в Кишинёве анонимность важна не меньше самого лечения — поэтому это наше базовое правило.",
        ],
      },
    ],
    faq: [
      {
        q: "Через сколько приедет нарколог?",
        a: "За 25–45 минут после звонка, в любой район Кишинёва и пригороды: Дурлешты, Ставчены, Кодру, Яловены, Думбрава, Трушены, Бачой, Чореску, Тохатин, Ватра, Сынджера и Бубуечь.",
      },
      {
        q: "Можно ли вызвать нарколога ночью или в выходные?",
        a: "Да. Мы работаем круглосуточно, включая ночь, выходные и праздники.",
      },
      {
        q: "Нужно ли согласие пациента?",
        a: "Лечение проводится только с согласия пациента. Врач может поговорить с ним и с родственниками, но не может лечить против его воли. Если человек отказывается, а его состояние угрожает жизни, звоните 112.",
      },
      {
        q: "Поставят ли на учёт после вызова нарколога?",
        a: "Нет. Мы не ставим пациента на учёт и никуда не передаём его данные.",
      },
      {
        q: "Чем вызов нарколога отличается от вывода из запоя?",
        a: "Вызов нарколога — это визит врача: осмотр и решение, что нужно сделать. Вывод из запоя — одна из процедур, которые врач проводит на месте, причём самая частая.",
      },
      {
        q: "Что подготовить к приезду врача?",
        a: "Список лекарств, которые принимает пациент, известные диагнозы и сколько дней длится употребление. Не давайте ему снотворное или успокоительное «чтобы успокоился» — вместе с алкоголем это опасно.",
      },
      {
        q: "Сколько стоит вызов нарколога на дом?",
        a: "Зависит от того, что понадобится на месте. Позвоните по номеру +373 61 003 863 — консультация по телефону бесплатная, а стоимость вы узнаете до выезда врача.",
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
  const n = NARCOLOG[locale];
  return {
    title: n.metaTitle,
    description: n.metaDescription,
    keywords: n.keywords,
    alternates: {
      canonical: `/${locale}/narcolog`,
      languages: { ro: "/ro/narcolog", ru: "/ru/narcolog", "x-default": "/ro/narcolog" },
    },
    openGraph: { ...ogDefaults(locale), title: n.metaTitle, description: n.metaDescription, url: `/${locale}/narcolog` },
  };
}

export default async function NarcologPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!LOCALES.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const n = NARCOLOG[locale];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: n.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${n.h1} ${n.h1Accent}`,
    description: n.metaDescription,
    url: `${SITE.url}/${locale}/narcolog`,
    inLanguage: locale === "ro" ? "ro-MD" : "ru-MD",
    author: { "@id": `${SITE.url}/#founder` },
    reviewedBy: {
      "@type": "Person",
      "@id": `${SITE.url}/#founder`,
      name: SITE.author.name,
      jobTitle: SITE.author.jobTitle[locale],
      url: `${SITE.url}/${locale}/despre-noi`,
    },
    mainEntity: {
      "@type": "Service",
      name: n.h1,
      serviceType: n.breadcrumb,
      provider: {
        "@type": "MedicalClinic",
        "@id": `${SITE.url}/#clinic`,
        name: SITE.legalName,
        telephone: SITE.phoneRaw,
        url: SITE.url,
      },
      areaServed: [
        { "@type": "City", name: SITE.address.city },
        ...SITE.suburbs[locale].map((name) => ({ "@type": "Place", name })),
      ],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Header locale={locale} dict={dict} />

      <main>
        {/* Hero — butonul de apel imediat după titlu, ca să fie în primul ecran pe telefon */}
        <section className="bg-gradient-to-br from-forest-800 to-forest-950 py-12 text-white lg:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="[&_a]:text-gold-300">
              <Breadcrumbs
                items={[
                  { name: dict.ui.breadcrumbHome, href: `/${locale}` },
                  { name: n.breadcrumb, href: `/${locale}/narcolog` },
                ]}
              />
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-gold-400">
              {n.eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              {n.h1}{" "}
              <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                {n.h1Accent}
              </span>
            </h1>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={`tel:${SITE.phoneRaw}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-8 py-4 text-base font-bold text-forest-950 shadow-lg transition-transform hover:scale-[1.02]">
                <IconPhone className="h-5 w-5" /> {n.cta} · {SITE.phone}
              </a>
              <a href={whatsappLink(dict.booking.waMessageIntro)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10">
                <IconWhatsApp className="h-5 w-5" /> WhatsApp
              </a>
            </div>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-50/90">{n.subtitle}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {n.points.map((p) => (
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
          </div>
        </section>

        {/* Ce poate face medicul — legături spre procedurile concrete */}
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {n.cards.map((card, i) => {
                const Icon = [IconDrop, IconShield, IconStar][i] ?? IconDrop;
                return (
                  <Link key={card.title} href={card.href(locale)} className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h2 className="mt-5 text-xl font-bold text-slate-900">{card.title}</h2>
                    <p className="mt-2 leading-relaxed text-slate-600">{card.desc}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Conținut */}
        <section className="pb-14 lg:pb-20">
          <div className="mx-auto max-w-4xl space-y-10 px-4 sm:px-6 lg:px-8">
            {n.sections.map((sec) => (
              <div key={sec.heading}>
                <h2 className="text-2xl font-bold text-slate-900">{sec.heading}</h2>
                {sec.body.map((p, i) => (
                  <p key={i} className="mt-3 text-lg leading-relaxed text-slate-700">{p}</p>
                ))}
                {sec.list && (
                  <ul className="mt-4 space-y-2">
                    {sec.list.map((item) => (
                      <li key={item} className="flex gap-3 text-lg leading-relaxed text-slate-700">
                        {sec.urgent ? (
                          <span aria-hidden className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-red-600" />
                        ) : (
                          <IconCheck className="mt-1.5 h-5 w-5 shrink-0 text-brand-600" />
                        )}
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{dict.faq.title}</h2>
              <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {n.faq.map((f) => (
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

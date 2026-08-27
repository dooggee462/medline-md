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
      {
        heading: "Cum te pregătești pentru codare",
        body: [
          "Condiția principală este abstinența înainte de procedură. Perioada exactă depinde de cât și cât de recent s-a consumat, iar asistentul o stabilește la discuția inițială — nu este o formalitate, ci o condiție de siguranță: codarea efectuată cu alcool încă prezent în organism poate provoca reacții periculoase.",
          "Dacă pacientul nu reușește să se oprească singur, începem cu detoxifierea. Perfuziile de refacere ajută organismul să treacă peste primele zile, iar codarea se face abia după aceea. Sunt două etape distincte, iar sărirea peste prima nu ajută pe nimeni.",
          "Pregătește actul de identitate și, dacă există, documentele medicale: analize recente, tratamente în curs, diagnostice cunoscute. Asistentul trebuie să știe ce medicamente ia pacientul, pentru că unele nu se combină cu procedura.",
          "Ajută mult dacă familia discută deschis cu pacientul înainte. Un om care vine la procedură împăcat cu decizia lui are cu totul alte șanse decât unul adus prin insistențe.",
        ],
      },
      {
        heading: "Ce se întâmplă după procedură",
        body: [
          "Primele zile sunt cele mai importante. Efectul codării este real, dar el ține de o barieră — nu schimbă singur obiceiurile, anturajul sau motivele pentru care s-a ajuns la consum.",
          "Îți spunem clar, înainte de procedură, ce se întâmplă dacă pacientul consumă alcool după codare. În funcție de metodă, reacția poate fi severă, iar pacientul trebuie să înțeleagă exact acest lucru — acordul informat înseamnă tocmai asta: că știe la ce se angajează.",
          "Recomandăm ca în primele săptămâni familia să reducă expunerea la situații cu alcool și să nu trateze subiectul ca pe o problemă rezolvată definitiv. Codarea deschide o fereastră de timp; ce se construiește în ea decide rezultatul pe termen lung.",
          "Rămânem disponibili și după procedură. Dacă apar întrebări sau semne care îngrijorează familia, sună-ne — e mai bine să întrebi decât să aștepți.",
        ],
      },
      {
        heading: "Când codarea nu se poate face",
        body: [
          "Există situații în care procedura este amânată sau contraindicată, iar asistentul le stabilește la evaluarea de la fața locului. Cele mai frecvente: pacientul este sub influența alcoolului, se află în plin sevraj, are afecțiuni cardiace grave, boli hepatice avansate, epilepsie, tulburări psihice acute sau este însărcinată.",
          "Preferăm să pierdem o vizită decât să efectuăm o procedură care poate face rău. Dacă starea pacientului nu permite codarea, îți explicăm de ce și îți spunem ce se poate face în schimb — de multe ori detoxifierea este primul pas corect.",
          "Nu efectuăm codarea fără acordul pacientului. Nu este doar o chestiune legală: o procedură făcută împotriva voinței cuiva nu funcționează și distruge încrederea de care are nevoie recuperarea.",
        ],
      },
      {
        heading: "Ce nu este codarea",
        body: [
          "Codarea nu vindecă dependența. Este un sprijin puternic pentru o decizie deja luată, nu un înlocuitor al deciziei. Cine speră că procedura va schimba singură dorința de a bea va fi dezamăgit.",
          "Nu este nici o pedeapsă, nici un mijloc de control asupra cuiva. Familiile ne sună uneori întrebând dacă se poate face pe ascuns — răspunsul este nu, iar motivul nu ține doar de lege.",
          "Rezultatele cele mai bune apar când codarea este combinată cu sprijin psihologic și cu schimbări reale în viața de zi cu zi. Îți spunem asta de la început, chiar dacă sună mai puțin comod decât o promisiune.",
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
        q: "Cât durează procedura în sine?",
        a: "Vizita durează în mod obișnuit sub o oră, incluzând evaluarea, procedura propriu-zisă și discuția de după. Ajungem la domiciliu în 25-45 de minute de la apel, în Chișinău.",
      },
      {
        q: "Ce se întâmplă dacă pacientul bea după codare?",
        a: "În funcție de metodă, consumul după procedură poate provoca reacții severe. Îți explicăm exact acest lucru înainte, iar pacientul își dă acordul cunoscând consecințele — asta înseamnă acord informat.",
      },
      {
        q: "Cât timp ține efectul codării?",
        a: "Depinde de metoda aleasă; se stabilește împreună cu pacientul la evaluare, în funcție de situație și de ce își dorește. Îți spunem exact durata înainte de procedură, nu după.",
      },
      {
        q: "Se poate face codarea dacă pacientul are boli cronice?",
        a: "Depinde de afecțiune. Bolile cardiace grave, afecțiunile hepatice avansate, epilepsia, tulburările psihice acute și sarcina sunt contraindicații. Asistentul evaluează situația la fața locului și îți spune deschis dacă procedura este posibilă.",
      },
      {
        q: "Veniți și noaptea sau în weekend?",
        a: "Da, lucrăm non-stop. Pentru codare stabilim însă ora împreună, pentru că e nevoie de perioada de abstinență dinainte — nu e o procedură care se face din impuls, la orice oră.",
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
      {
        heading: "Как подготовиться к кодированию",
        body: [
          "Главное условие — воздержание перед процедурой. Точный срок зависит от того, сколько и как недавно было выпито; медработник определяет его при первом разговоре. Это не формальность, а условие безопасности: кодирование при остатках алкоголя в организме может вызвать опасные реакции.",
          "Если пациент не может остановиться самостоятельно, начинаем с детоксикации. Восстановительные капельницы помогают пережить первые дни, и только после этого проводится кодирование. Это два разных этапа, и пропуск первого не помогает никому.",
          "Подготовьте удостоверение личности и, если есть, медицинские документы: свежие анализы, текущее лечение, известные диагнозы. Медработник должен знать, какие препараты принимает пациент — некоторые несовместимы с процедурой.",
          "Очень помогает, если семья заранее откровенно поговорит с пациентом. Человек, пришедший к процедуре в согласии со своим решением, имеет совсем другие шансы, чем тот, кого привели уговорами.",
        ],
      },
      {
        heading: "Что происходит после процедуры",
        body: [
          "Первые дни самые важные. Эффект кодирования реален, но это барьер — он сам по себе не меняет привычки, окружение или причины, по которым дошло до злоупотребления.",
          "Мы честно объясняем до процедуры, что произойдёт, если пациент выпьет после кодирования. В зависимости от метода реакция может быть тяжёлой, и пациент должен это ясно понимать — информированное согласие означает именно это: он знает, на что идёт.",
          "Рекомендуем в первые недели снизить контакт с ситуациями, где присутствует алкоголь, и не считать вопрос закрытым окончательно. Кодирование открывает окно времени; то, что построено в нём, определяет долгосрочный результат.",
          "Мы остаёмся на связи и после процедуры. Если появятся вопросы или тревожные признаки — звоните, лучше спросить, чем ждать.",
        ],
      },
      {
        heading: "Когда кодирование провести нельзя",
        body: [
          "Есть ситуации, когда процедура откладывается или противопоказана; медработник определяет их при осмотре на месте. Самые частые: пациент под воздействием алкоголя, в разгар синдрома отмены, тяжёлые заболевания сердца, запущенные болезни печени, эпилепсия, острые психические расстройства или беременность.",
          "Мы лучше потеряем выезд, чем проведём процедуру, способную навредить. Если состояние пациента не позволяет кодирование, мы объясняем почему и говорим, что можно сделать вместо этого — часто правильный первый шаг именно детоксикация.",
          "Мы не проводим кодирование без согласия пациента. Дело не только в законе: процедура, сделанная против воли человека, не работает и разрушает доверие, необходимое для восстановления.",
        ],
      },
      {
        heading: "Чем кодирование не является",
        body: [
          "Кодирование не излечивает зависимость. Это сильная поддержка уже принятого решения, а не замена самого решения. Тот, кто надеется, что процедура сама изменит тягу к алкоголю, будет разочарован.",
          "Это и не наказание, и не средство контроля над кем-то. Семьи иногда звонят и спрашивают, можно ли сделать втайне — ответ нет, и причина не только юридическая.",
          "Лучшие результаты появляются, когда кодирование сочетается с психологической поддержкой и реальными изменениями в повседневной жизни. Мы говорим об этом сразу, даже если это звучит менее удобно, чем обещание.",
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
        q: "Сколько длится сама процедура?",
        a: "Визит обычно занимает меньше часа, включая осмотр, саму процедуру и разговор после. Приезжаем на дом за 25-45 минут после звонка, в пределах Кишинёва.",
      },
      {
        q: "Что будет, если пациент выпьет после кодирования?",
        a: "В зависимости от метода употребление после процедуры может вызвать тяжёлую реакцию. Мы объясняем это заранее, и пациент даёт согласие, зная последствия — это и есть информированное согласие.",
      },
      {
        q: "Сколько держится эффект кодирования?",
        a: "Зависит от выбранного метода; срок определяется вместе с пациентом при осмотре, исходя из ситуации и его пожеланий. Мы называем точную длительность до процедуры, а не после.",
      },
      {
        q: "Можно ли кодировать при хронических заболеваниях?",
        a: "Зависит от заболевания. Тяжёлые болезни сердца, запущенные заболевания печени, эпилепсия, острые психические расстройства и беременность являются противопоказаниями. Медработник оценивает ситуацию на месте и прямо говорит, возможна ли процедура.",
      },
      {
        q: "Вы приезжаете ночью и в выходные?",
        a: "Да, работаем круглосуточно. Но время кодирования согласуем заранее: нужен период воздержания до процедуры — это не то, что делается спонтанно, в любой час.",
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

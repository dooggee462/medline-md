import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, SITE, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";
import { serviceHref } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer, FloatingContact } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { IconShield, IconHeart, IconCheck } from "@/components/Icons";

const ABOUT: Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    lead: string;
    sections: { heading: string; body: string[] }[];
    valuesTitle: string;
    values: { title: string; desc: string }[];
  }
> = {
  ro: {
    metaTitle: "Despre Medline — Clinică de Asistență Medicală la Domiciliu | Medline.md",
    metaDescription:
      "Află povestea Medline, clinica de asistență medicală la domiciliu din Chișinău. Misiunea noastră: îngrijire profesională, sigură și empatică, direct acasă la pacienți.",
    h1: "Despre Medline",
    lead: "Suntem o echipă de profesioniști în sănătate dedicată unui singur scop: să aducem îngrijirea medicală de calitate direct acasă la pacienții noștri, cu profesionalism și empatie.",
    sections: [
      {
        heading: "Misiunea noastră",
        body: [
          "Medline a luat naștere din convingerea că îngrijirea medicală ar trebui să fie accesibilă, confortabilă și umană. Pentru mulți pacienți — vârstnici, persoane imobilizate sau aflate în recuperare — deplasarea la spital este dificilă sau imposibilă.",
          "De aceea aducem clinica la tine acasă: perfuzii, injecții, îngrijirea bolnavilor, consult medical și pansamente, toate efectuate de asistente medicale autorizate.",
        ],
      },
      {
        heading: "Experiența care contează",
        body: [
          "Cu peste un deceniu de experiență în îngrijire la domiciliu și mii de pacienți îngrijiți, am construit o reputație bazată pe încredere, punctualitate și grijă autentică.",
          "Fiecare membru al echipei noastre este selectat nu doar pentru competențele medicale, ci și pentru empatia și respectul față de pacienți.",
        ],
      },
    ],
    valuesTitle: "Valorile noastre",
    values: [
      { title: "Profesionalism", desc: "Asistente autorizate, protocoale stricte și materiale sterile la fiecare vizită." },
      { title: "Empatie", desc: "Tratăm fiecare pacient cu răbdare, respect și grijă, ca pe un membru al familiei." },
      { title: "Disponibilitate", desc: "Suntem alături de tine 24/7 pentru urgențe, inclusiv în weekend." },
      { title: "Transparență", desc: "Prețuri clare, fără costuri ascunse — afli totul înainte de vizită." },
    ],
  },
  ru: {
    metaTitle: "О Medline — Клиника Медпомощи на Дому | Medline.md",
    metaDescription:
      "Узнайте историю Medline, клиники медицинской помощи на дому в Кишинёве. Наша миссия: профессиональный, безопасный и заботливый уход прямо у вас дома.",
    h1: "О Medline",
    lead: "Мы — команда профессионалов в сфере здоровья, посвящённая одной цели: приносить качественную медицинскую помощь прямо домой к нашим пациентам, с профессионализмом и заботой.",
    sections: [
      {
        heading: "Наша миссия",
        body: [
          "Medline родилась из убеждения, что медицинская помощь должна быть доступной, комфортной и человечной. Для многих пациентов — пожилых, лежачих или восстанавливающихся — поездка в больницу трудна или невозможна.",
          "Поэтому мы привозим клинику к вам домой: капельницы, инъекции, уход за больными, медосмотр и перевязки — всё выполняется сертифицированными медсёстрами.",
        ],
      },
      {
        heading: "Опыт, который важен",
        body: [
          "С более чем десятилетним опытом ухода на дому и тысячами пациентов мы построили репутацию, основанную на доверии, пунктуальности и искренней заботе.",
          "Каждый член нашей команды отобран не только за медицинскую компетентность, но и за эмпатию и уважение к пациентам.",
        ],
      },
    ],
    valuesTitle: "Наши ценности",
    values: [
      { title: "Профессионализм", desc: "Сертифицированные медсёстры, строгие протоколы и стерильные материалы при каждом визите." },
      { title: "Эмпатия", desc: "Относимся к каждому пациенту с терпением, уважением и заботой, как к члену семьи." },
      { title: "Доступность", desc: "Мы рядом 24/7 для экстренных случаев, включая выходные." },
      { title: "Прозрачность", desc: "Чёткие цены без скрытых платежей — вы узнаёте всё до визита." },
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
  const a = ABOUT[locale];
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    alternates: {
      canonical: `/${locale}/despre-noi`,
      languages: { ro: "/ro/despre-noi", ru: "/ru/despre-noi", "x-default": "/ro/despre-noi" },
    },
    openGraph: { title: a.metaTitle, description: a.metaDescription, url: `/${locale}/despre-noi` },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!LOCALES.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const a = ABOUT[locale];

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main>
        <section className="bg-gradient-to-b from-brand-50/70 to-white py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: dict.ui.breadcrumbHome, href: `/${locale}` },
                { name: dict.nav.about, href: `/${locale}/despre-noi` },
              ]}
            />
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{a.h1}</h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{a.lead}</p>
          </div>
        </section>

        {/* Fondator */}
        <section className="py-10 lg:py-14">
          <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[320px_1fr] lg:gap-12 lg:px-8">
            <div className="mx-auto w-full max-w-xs overflow-hidden rounded-3xl border border-slate-100 shadow-xl shadow-brand-900/10">
              <Image
                src="/founder.jpg"
                alt={locale === "ro" ? "Sochirean Victor — asistent medical, fondator Medline" : "Сокирян Виктор — медицинский ассистент, основатель Medline"}
                width={590}
                height={1153}
                className="aspect-[3/4] w-full object-cover object-top"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
                {locale === "ro" ? "Fondator" : "Основатель"}
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Sochirean Victor</h2>
              <p className="mt-1 font-semibold text-brand-700">
                {locale === "ro" ? "Asistent medical · Fondator Medline" : "Медицинский ассистент · Основатель Medline"}
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                {locale === "ro"
                  ? "Victor a fondat Medline cu o convingere simplă: îngrijirea medicală de calitate trebuie să ajungă la oameni acasă, cu profesionalism, discreție și empatie. Coordonează personal echipa de asistente, asigurându-se că fiecare pacient primește atenția și siguranța pe care le merită."
                  : "Виктор основал Medline с простым убеждением: качественная медицинская помощь должна приходить к людям домой — с профессионализмом, деликатностью и заботой. Он лично руководит командой медсестёр, следя за тем, чтобы каждый пациент получал внимание и безопасность, которых заслуживает."}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-4xl space-y-10 px-4 sm:px-6 lg:px-8">
            {a.sections.map((sec) => (
              <div key={sec.heading}>
                <h2 className="text-2xl font-bold text-slate-900">{sec.heading}</h2>
                {sec.body.map((p, i) => (
                  <p key={i} className="mt-3 leading-relaxed text-slate-600">{p}</p>
                ))}
              </div>
            ))}

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-7">
              <h2 className="text-2xl font-bold text-slate-900">
                {locale === "ro" ? "Serviciile noastre la domiciliu" : "Наши услуги на дому"}
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                {locale === "ro"
                  ? "Oferim o gamă completă de servicii medicale la domiciliu în Chișinău, printre care "
                  : "Мы предлагаем полный спектр медицинских услуг на дому в Кишинёве, среди которых "}
                <Link href={`/${locale}/detoxifiere`} className="font-semibold text-brand-700 hover:underline">
                  {locale === "ro" ? "detoxifiere post-alcool" : "вывод из запоя"}
                </Link>
                {", "}
                <Link href={serviceHref(locale, "codare-anti-alcool")} className="font-semibold text-brand-700 hover:underline">
                  {locale === "ro" ? "codare anti-alcool" : "кодирование от алкоголя"}
                </Link>
                {", "}
                <Link href={serviceHref(locale, "tratament-post-alcool")} className="font-semibold text-brand-700 hover:underline">
                  {locale === "ro" ? "tratament post-alcool" : "лечение после алкоголя"}
                </Link>
                {", "}
                <Link href={serviceHref(locale, "perfuzii-la-domiciliu")} className="font-semibold text-brand-700 hover:underline">
                  {locale === "ro" ? "perfuzii la domiciliu" : "капельницы на дому"}
                </Link>
                {locale === "ro" ? " și " : " и "}
                <Link href={`/${locale}/servicii`} className="font-semibold text-brand-700 hover:underline">
                  {locale === "ro" ? "multe altele" : "многое другое"}
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Statistici */}
        <section className="border-y border-slate-100 bg-slate-50 py-14">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
            {dict.hero.stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl font-extrabold text-brand-700">{s.value}</p>
                <p className="mt-1 text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Valori */}
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">{a.valuesTitle}</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {a.values.map((v, i) => {
                const Icon = [IconShield, IconHeart, IconCheck, IconShield][i] ?? IconCheck;
                return (
                  <div key={v.title} className="rounded-2xl border border-slate-100 p-6 transition-colors hover:bg-brand-50/50">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-100 text-brand-700">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 font-bold text-slate-900">{v.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{v.desc}</p>
                  </div>
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

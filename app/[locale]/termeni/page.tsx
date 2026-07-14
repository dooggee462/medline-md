import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, SITE, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";
import { Header } from "@/components/Header";
import { Footer, FloatingContact } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const CONTENT: Record<
  Locale,
  { title: string; updated: string; sections: { heading: string; body: string[] }[] }
> = {
  ro: {
    title: "Termeni și condiții",
    updated: "Ultima actualizare: iunie 2026",
    sections: [
      {
        heading: "Despre acest site",
        body: [
          `Acest site aparține ${SITE.legalName} și prezintă serviciile de asistență medicală la domiciliu oferite în Chișinău. Prin utilizarea site-ului, ești de acord cu acești termeni.`,
        ],
      },
      {
        heading: "Caracter informativ — nu înlocuiește consultul medical",
        body: [
          "Informațiile de pe site (inclusiv articolele de blog) au scop pur informativ și NU constituie sfat medical, diagnostic sau tratament. Ele nu înlocuiesc consultul unui medic.",
          "În caz de urgență medicală, sună imediat la 112. Pentru orice decizie privind sănătatea ta, consultă un medic.",
        ],
      },
      {
        heading: "Programări și servicii",
        body: [
          "Formularul de pe site reprezintă o cerere de programare, nu o programare confirmată. Te contactăm pentru a confirma serviciul, ora și detaliile.",
          "Anumite proceduri necesită prescripție medicală sau o evaluare prealabilă. Te informăm despre condițiile necesare înainte de vizită.",
        ],
      },
      {
        heading: "Prețuri",
        body: [
          "Prețurile sunt comunicate la cerere (telefonic, WhatsApp sau Viber) și pot varia în funcție de serviciu, complexitatea cazului și materialele necesare.",
        ],
      },
      {
        heading: "Proprietate intelectuală",
        body: [
          "Conținutul site-ului (texte, logo, imagini) aparține Medline și nu poate fi copiat sau reutilizat fără acordul nostru.",
        ],
      },
      {
        heading: "Limitarea răspunderii",
        body: [
          "Ne străduim să oferim informații corecte și actuale, dar nu garantăm că site-ul este lipsit de erori. Nu răspundem pentru decizii luate exclusiv pe baza informațiilor de pe site.",
        ],
      },
      {
        heading: "Contact",
        body: [
          `Pentru întrebări legate de acești termeni, contactează-ne la ${SITE.phone}.`,
        ],
      },
    ],
  },
  ru: {
    title: "Условия использования",
    updated: "Последнее обновление: июнь 2026",
    sections: [
      {
        heading: "Об этом сайте",
        body: [
          `Этот сайт принадлежит ${SITE.legalName} и представляет услуги медицинской помощи на дому в Кишинёве. Используя сайт, вы соглашаетесь с этими условиями.`,
        ],
      },
      {
        heading: "Информационный характер — не заменяет консультацию врача",
        body: [
          "Информация на сайте (включая статьи блога) носит исключительно информационный характер и НЕ является медицинским советом, диагнозом или лечением. Она не заменяет консультацию врача.",
          "В случае неотложной ситуации немедленно звоните 112. По любым решениям о здоровье обращайтесь к врачу.",
        ],
      },
      {
        heading: "Запись и услуги",
        body: [
          "Форма на сайте — это заявка на запись, а не подтверждённая запись. Мы связываемся с вами, чтобы подтвердить услугу, время и детали.",
          "Некоторые процедуры требуют рецепта или предварительной оценки. Мы сообщаем о необходимых условиях до визита.",
        ],
      },
      {
        heading: "Цены",
        body: [
          "Цены сообщаются по запросу (телефон, WhatsApp или Viber) и могут меняться в зависимости от услуги, сложности случая и необходимых материалов.",
        ],
      },
      {
        heading: "Интеллектуальная собственность",
        body: [
          "Контент сайта (тексты, логотип, изображения) принадлежит Medline и не может копироваться или использоваться без нашего согласия.",
        ],
      },
      {
        heading: "Ограничение ответственности",
        body: [
          "Мы стремимся предоставлять точную и актуальную информацию, но не гарантируем отсутствие ошибок. Мы не несём ответственности за решения, принятые исключительно на основе информации с сайта.",
        ],
      },
      {
        heading: "Контакты",
        body: [
          `По вопросам об этих условиях свяжитесь с нами: ${SITE.phone}.`,
        ],
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
  const c = CONTENT[locale];
  return {
    title: `${c.title} | Medline.md`,
    description: c.title,
    alternates: {
      canonical: `/${locale}/termeni`,
      languages: { ro: "/ro/termeni", ru: "/ru/termeni", "x-default": "/ro/termeni" },
    },
    robots: { index: true, follow: true },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!LOCALES.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const c = CONTENT[locale];

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main>
        <section className="bg-gradient-to-b from-brand-50/70 to-white py-12 lg:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: dict.ui.breadcrumbHome, href: `/${locale}` },
                { name: c.title, href: `/${locale}/termeni` },
              ]}
            />
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{c.title}</h1>
            <p className="mt-2 text-sm text-slate-500">{c.updated}</p>
          </div>
        </section>
        <section className="py-10 lg:py-14">
          <div className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8">
            {c.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-xl font-bold text-slate-900">{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-2 leading-relaxed text-slate-600">{p}</p>
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer locale={locale} dict={dict} />
      <FloatingContact dict={dict} />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, SITE, whatsappLink, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";
import { serviceHref } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer, FloatingContact } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookingForm } from "@/components/BookingForm";
import { IconPhone, IconWhatsApp, IconMail, IconPin, IconClock } from "@/components/Icons";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === "ro"
      ? "Contact & Programare — Asistență Medicală la Domiciliu | Medline.md"
      : "Контакты и Запись — Медпомощь на Дому | Medline.md";
  const description =
    locale === "ro"
      ? "Contactează Medline pentru o programare la domiciliu în Chișinău. Telefon, WhatsApp, Viber și formular de programare rapidă. Răspundem 24/7."
      : "Свяжитесь с Medline для записи на дому в Кишинёве. Телефон, WhatsApp, Viber и форма быстрой записи. Отвечаем 24/7.";
  return {
    title,
    description,
    keywords:
      locale === "ro"
        ? "contact Medline Chisinau, programare asistenta medicala la domiciliu, telefon perfuzii domiciliu, chemare asistenta la domiciliu Chisinau, programare 24/7"
        : "контакты Medline Кишинёв, запись медпомощь на дому, телефон капельница на дому, вызов медсестры на дом Кишинёв, запись 24/7",
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { ro: "/ro/contact", ru: "/ru/contact", "x-default": "/ro/contact" },
    },
    openGraph: { title, description, url: `/${locale}/contact` },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!LOCALES.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main>
        <section className="bg-gradient-to-b from-brand-50/70 to-white py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: dict.ui.breadcrumbHome, href: `/${locale}` },
                { name: dict.nav.contact, href: `/${locale}/contact` },
              ]}
            />
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              {dict.booking.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              {dict.booking.subtitle}
            </p>
          </div>
        </section>

        <section id="programare" className="scroll-mt-20 py-12 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <div>
              <ul className="space-y-5">
                <Row icon={<IconPhone className="h-5 w-5" />} label={dict.contact.phone}>
                  <a href={`tel:${SITE.phoneRaw}`} className="hover:text-brand-700">{SITE.phone}</a>
                </Row>
                <Row icon={<IconWhatsApp className="h-5 w-5" />} label="WhatsApp">
                  <a href={whatsappLink(dict.booking.waMessageIntro)} target="_blank" rel="noopener noreferrer" className="hover:text-brand-700">{SITE.phone}</a>
                </Row>
                <Row icon={<IconMail className="h-5 w-5" />} label={dict.contact.email}>
                  <a href={`mailto:${SITE.email}`} className="hover:text-brand-700">{SITE.email}</a>
                </Row>
                <Row icon={<IconPin className="h-5 w-5" />} label={locale === "ro" ? "Zonă deservită" : "Зона обслуживания"}>
                  {locale === "ro"
                    ? "La domiciliu, în Chișinău și împrejurimi"
                    : "На дому, в Кишинёве и пригородах"}
                </Row>
                <Row icon={<IconClock className="h-5 w-5" />} label={dict.contact.hours}>
                  <span className="block">{dict.contact.hoursWeekdays}: {SITE.hours.weekdays}</span>
                  <span className="block">{dict.contact.hoursSaturday}: {SITE.hours.saturday}</span>
                  <span className="block">{dict.contact.hoursSunday}: {SITE.hours.sunday}</span>
                </Row>
              </ul>

              <div className="mt-8">
                <p className="text-sm font-medium text-slate-500">
                  {locale === "ro" ? "Servicii populare:" : "Популярные услуги:"}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    { href: `/${locale}/detoxifiere`, ro: "Detoxifiere post-alcool", ru: "Вывод из запоя" },
                    { href: serviceHref(locale, "codare-anti-alcool"), ro: "Codare anti-alcool", ru: "Кодирование" },
                    { href: serviceHref(locale, "tratament-post-alcool"), ro: "Tratament post-alcool", ru: "Лечение после алкоголя" },
                    { href: serviceHref(locale, "perfuzii-la-domiciliu"), ro: "Perfuzii la domiciliu", ru: "Капельницы на дому" },
                  ].map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"
                    >
                      {locale === "ro" ? s.ro : s.ru}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-brand-900/5 sm:p-8">
              <BookingForm dict={dict} locale={locale} />
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} dict={dict} />
      <FloatingContact dict={dict} />
    </>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">{icon}</span>
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <div className="font-semibold text-slate-800">{children}</div>
      </div>
    </li>
  );
}

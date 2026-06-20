import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, SITE, whatsappLink, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";
import { Header } from "@/components/Header";
import { BookingForm } from "@/components/BookingForm";
import { JsonLd } from "@/components/JsonLd";
import { Footer, FloatingContact } from "@/components/Footer";
import { SERVICES } from "@/lib/content";
import {
  SERVICE_ICONS,
  IconDrop,
  IconWhatsApp,
  IconPhone,
  IconMail,
  IconPin,
  IconClock,
  IconCheck,
  IconShield,
  IconStar,
  IconPlus,
} from "@/components/Icons";

export default async function Home({
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
      <JsonLd locale={locale} />
      <Header locale={locale} dict={dict} />

      <main>
        {/* ───────────── HERO ───────────── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-white">
          <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl" aria-hidden />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-24 lg:px-8">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-brand-700 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
                </span>
                {dict.hero.badge}
              </span>

              <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                {dict.hero.title}{" "}
                <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                  {dict.hero.titleAccent}
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                {dict.hero.subtitle}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#programare"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-7 py-3.5 text-base font-bold text-forest-950 shadow-lg shadow-gold-600/30 transition-all hover:from-gold-300 hover:to-gold-500 hover:shadow-xl"
                >
                  {dict.hero.ctaPrimary}
                </a>
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-800 transition-colors hover:border-brand-300 hover:text-brand-700"
                >
                  <IconPhone className="h-5 w-5" />
                  {dict.hero.ctaSecondary}
                </a>
              </div>

              <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
                {dict.hero.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="text-3xl font-extrabold text-brand-700">
                      {s.value}
                    </dt>
                    <dd className="mt-1 text-sm text-slate-500">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Card vizual hero */}
            <div className="relative animate-fade-up [animation-delay:120ms]">
              <div className="relative mx-auto max-w-md rounded-3xl border border-slate-100 bg-white p-2 shadow-2xl shadow-brand-900/10">
                <div className="rounded-[1.3rem] bg-gradient-to-br from-forest-700 via-forest-800 to-forest-950 p-8 text-white">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                      <IconPlus className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-lg font-bold">{SITE.name}.md</p>
                      <p className="text-sm text-brand-100">
                        {dict.footer.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    {dict.services.items.slice(0, 4).map((s) => {
                      const Icon = SERVICE_ICONS[s.icon] ?? IconCheck;
                      return (
                        <div
                          key={s.title}
                          className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur"
                        >
                          <Icon className="h-5 w-5 shrink-0 text-brand-100" />
                          <span className="text-sm font-medium">{s.title}</span>
                          <IconCheck className="ml-auto h-4 w-4 text-brand-200" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Badge plutitor */}
              <div className="absolute -bottom-5 -left-3 flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl sm:-left-6">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-brand-700">
                  <IconShield className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-slate-700">
                  {dict.why.items[0]?.title ?? "Asistente autorizate"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── SERVICII ───────────── */}
        <section id="servicii" className="scroll-mt-20 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrow={dict.services.eyebrow}
              title={dict.services.title}
              subtitle={dict.services.subtitle}
            />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s) => {
                const Icon = SERVICE_ICONS[s.icon] ?? IconCheck;
                const c = s.content[locale];
                return (
                  <Link
                    key={s.slug}
                    href={`/${locale}/servicii/${s.slug}`}
                    className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-slate-900">
                      {c.h1}
                    </h3>
                    <p className="mt-2 leading-relaxed text-slate-600">
                      {c.short}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                      {dict.ui.readMore}
                      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───────────── DETOXIFIERE POST-ALCOOL ───────────── */}
        <section id="alcool" className="scroll-mt-20 bg-gradient-to-br from-forest-800 to-forest-950 py-20 text-white lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-gold-400">
                {dict.alcohol.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {dict.alcohol.title}{" "}
                <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                  {dict.alcohol.titleAccent}
                </span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-brand-50/90">
                {dict.alcohol.subtitle}
              </p>
              <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
                {dict.alcohol.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm font-medium text-brand-50">
                    <IconCheck className="h-4 w-4 text-gold-400" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link href={`/${locale}/detoxifiere`} className="inline-flex items-center gap-1 font-semibold text-gold-300 hover:text-gold-200">
                  {locale === "ro" ? "Vezi pagina completă" : "Открыть страницу"}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dict.alcohol.items.map((item, i) => {
                const Icon = [IconDrop, IconStar, IconShield][i] ?? IconDrop;
                return (
                  <Link
                    key={item.title}
                    href={`/${locale}/servicii/${item.slug}`}
                    className="group rounded-2xl bg-white/10 p-7 ring-1 ring-white/10 backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/15"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-500/20 text-gold-300">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-brand-50/80">{item.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-300">
                      {dict.ui.readMore}
                      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-8 py-4 text-base font-bold text-forest-950 shadow-lg transition-transform hover:scale-[1.02]"
              >
                <IconPhone className="h-5 w-5" />
                {dict.alcohol.cta}
              </a>
              <a
                href={whatsappLink(dict.booking.waMessageIntro)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                <IconWhatsApp className="h-5 w-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ───────────── CUM FUNCȚIONEAZĂ ───────────── */}
        <section id="cum" className="scroll-mt-20 bg-slate-50 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrow={dict.how.eyebrow}
              title={dict.how.title}
              subtitle={dict.how.subtitle}
            />
            <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {dict.how.steps.map((step, i) => (
                <li key={step.title} className="relative">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-600 text-lg font-bold text-white shadow-lg shadow-brand-600/30">
                    {i + 1}
                  </span>
                  {i < dict.how.steps.length - 1 && (
                    <span className="absolute left-12 top-6 hidden h-px w-[calc(100%-3rem)] bg-gradient-to-r from-brand-300 to-transparent lg:block" />
                  )}
                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-slate-600">
                    {step.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────────── DE CE NOI ───────────── */}
        <section id="de-ce" className="scroll-mt-20 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrow={dict.why.eyebrow}
              title={dict.why.title}
              subtitle={dict.why.subtitle}
            />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dict.why.items.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-slate-100 p-6 transition-colors hover:bg-brand-50/50"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
                    <IconShield className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── RECENZII ───────────── */}
        <section id="recenzii" className="scroll-mt-20 bg-gradient-to-br from-forest-800 to-forest-950 py-20 text-white lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-200">
                {dict.reviews.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {dict.reviews.title}
              </h2>
            </div>
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {dict.reviews.items.map((r) => (
                <figure
                  key={r.name}
                  className="rounded-2xl bg-white/10 p-7 backdrop-blur ring-1 ring-white/10"
                >
                  <div className="flex gap-1 text-amber-300">
                    {[...Array(5)].map((_, i) => (
                      <IconStar key={i} className="h-4 w-4" />
                    ))}
                  </div>
                  <blockquote className="mt-4 leading-relaxed text-brand-50">
                    “{r.text}”
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white/20 font-bold">
                      {r.name.charAt(0)}
                    </span>
                    <div>
                      <p className="font-semibold">{r.name}</p>
                      <p className="text-sm text-brand-200">{r.role}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── PROGRAMARE + CONTACT ───────────── */}
        <section id="programare" className="scroll-mt-20 py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            {/* Stânga: contact info */}
            <div id="contact" className="scroll-mt-20">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
                {dict.booking.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                {dict.booking.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                {dict.booking.subtitle}
              </p>

              <ul className="mt-10 space-y-5">
                <ContactRow icon={<IconPhone className="h-5 w-5" />} label={dict.contact.phone}>
                  <a href={`tel:${SITE.phoneRaw}`} className="hover:text-brand-700">
                    {SITE.phone}
                  </a>
                </ContactRow>
                <ContactRow icon={<IconWhatsApp className="h-5 w-5" />} label="WhatsApp">
                  <a
                    href={whatsappLink(dict.booking.waMessageIntro)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-700"
                  >
                    {SITE.phone}
                  </a>
                </ContactRow>
                <ContactRow icon={<IconMail className="h-5 w-5" />} label={dict.contact.email}>
                  <a href={`mailto:${SITE.email}`} className="hover:text-brand-700">
                    {SITE.email}
                  </a>
                </ContactRow>
                <ContactRow icon={<IconPin className="h-5 w-5" />} label={dict.contact.address}>
                  {SITE.address.street}, {SITE.address.city}
                </ContactRow>
                <ContactRow icon={<IconClock className="h-5 w-5" />} label={dict.contact.hours}>
                  <span className="block">
                    {dict.contact.hoursWeekdays}: {SITE.hours.weekdays}
                  </span>
                  <span className="block">
                    {dict.contact.hoursSaturday}: {SITE.hours.saturday}
                  </span>
                  <span className="block">
                    {dict.contact.hoursSunday}: {SITE.hours.sunday}
                  </span>
                </ContactRow>
              </ul>
            </div>

            {/* Dreapta: formular */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-brand-900/5 sm:p-8">
              <BookingForm dict={dict} locale={locale} />
            </div>
          </div>
        </section>

        {/* ───────────── FAQ ───────────── */}
        <section id="faq" className="scroll-mt-20 bg-slate-50 py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrow={dict.faq.eyebrow}
              title={dict.faq.title}
            />
            <div className="mt-12 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              {dict.faq.items.map((f) => (
                <details key={f.q} className="group px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-5 font-semibold text-slate-900 marker:content-none">
                    {f.q}
                    <IconPlus className="h-5 w-5 shrink-0 text-brand-600 transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="pb-5 leading-relaxed text-slate-600">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} dict={dict} />
      <FloatingContact dict={dict} />
    </>
  );
}

function SectionHead({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{subtitle}</p>
      )}
    </div>
  );
}

function ContactRow({
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
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
        {icon}
      </span>
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <div className="font-semibold text-slate-800">{children}</div>
      </div>
    </li>
  );
}

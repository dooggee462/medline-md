import Link from "next/link";
import { Logo } from "./Logo";
import { IconPhone, IconPin, IconWhatsApp, IconFacebook, IconInstagram, IconTiktok } from "./Icons";
import { SITE, whatsappLink, type Locale } from "@/lib/site";
import type { Dictionary } from "@/lib/dictionaries";
import { SERVICES, serviceHref } from "@/lib/content";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const wa = whatsappLink(dict.booking.waMessageIntro);
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href={`/${locale}`}>
              <Logo className="h-20 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              {dict.footer.tagline}
            </p>
            <div className="mt-5 flex gap-3">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-600 transition-colors hover:bg-brand-100" aria-label="WhatsApp">
                <IconWhatsApp className="h-5 w-5" />
              </a>
              <a href={`tel:${SITE.phoneRaw}`} className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-600 transition-colors hover:bg-brand-100" aria-label="Phone">
                <IconPhone className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-3 flex gap-3">
              {SITE.social.facebook && (
                <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-brand-100 hover:text-brand-700" aria-label="Facebook">
                  <IconFacebook className="h-5 w-5" />
                </a>
              )}
              {SITE.social.instagram && (
                <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-brand-100 hover:text-brand-700" aria-label="Instagram">
                  <IconInstagram className="h-5 w-5" />
                </a>
              )}
              {SITE.social.tiktok && (
                <a href={SITE.social.tiktok} target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-brand-100 hover:text-brand-700" aria-label="TikTok">
                  <IconTiktok className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">{dict.nav.services}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-500">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={serviceHref(locale, s.slug)} className="hover:text-brand-700">
                    {s.content[locale].h1}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">{dict.footer.nav}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-500">
              <li><Link href={`/${locale}`} className="hover:text-brand-700">{dict.nav.home}</Link></li>
              <li><Link href={`/${locale}/servicii`} className="hover:text-brand-700">{dict.nav.services}</Link></li>
              <li><Link href={`/${locale}/detoxifiere`} className="hover:text-brand-700">{dict.nav.detox}</Link></li>
              <li><Link href={`/${locale}/codare`} className="hover:text-brand-700">{locale === "ro" ? "Codare anti-alcool" : "Кодирование"}</Link></li>
              <li><Link href={`/${locale}/preturi`} className="hover:text-brand-700">{dict.nav.prices}</Link></li>
              <li><Link href={`/${locale}/despre-noi`} className="hover:text-brand-700">{dict.nav.about}</Link></li>
              <li><Link href={`/${locale}/blog`} className="hover:text-brand-700">{dict.nav.blog}</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-brand-700">{dict.nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">{dict.contact.title}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-500">
              <li className="flex items-center gap-2"><IconPhone className="h-4 w-4 text-brand-600" /> {SITE.phone}</li>
              <li className="flex items-center gap-2"><IconPin className="h-4 w-4 text-brand-600" /> {locale === "ro" ? "La domiciliu · Chișinău și împrejurimi" : "На дому · Кишинёв и пригороды"}</li>
            </ul>
            <div className="mt-5 flex gap-2 text-xs">
              <Link href="/ro" className="rounded border border-slate-200 px-2 py-1 font-semibold uppercase hover:border-brand-300">RO</Link>
              <Link href="/ru" className="rounded border border-slate-200 px-2 py-1 font-semibold uppercase hover:border-brand-300">RU</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-100 pt-8 text-center text-sm text-slate-400">
          <div className="mb-3 flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link href={`/${locale}/confidentialitate`} className="hover:text-brand-700">
              {locale === "ro" ? "Confidențialitate" : "Конфиденциальность"}
            </Link>
            <Link href={`/${locale}/termeni`} className="hover:text-brand-700">
              {locale === "ro" ? "Termeni și condiții" : "Условия использования"}
            </Link>
          </div>
          <p>© {new Date().getFullYear()} {SITE.legalName}. {dict.footer.rights}</p>
          {/* Date publice din Registrul de Stat — arată că în spate e o firmă reală */}
          <p className="mt-2 text-xs">
            {SITE.company.shortName} · IDNO {SITE.company.idno}
          </p>
          <p className="mt-2 text-xs">{dict.footer.legal}</p>
        </div>
      </div>
    </footer>
  );
}

// Widget flotant de contact (Telefon / WhatsApp / Viber / Messenger)
export { FloatingContact } from "./FloatingContact";

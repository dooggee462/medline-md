import Link from "next/link";
import { IconPhone } from "./Icons";
import { SITE, type Locale } from "@/lib/site";
import type { Dictionary } from "@/lib/dictionaries";

/** Bandă de call-to-action reutilizabilă la finalul paginilor interioare */
export function CtaBand({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="bg-gradient-to-br from-brand-600 to-brand-800 py-16 text-white lg:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {dict.ui.ctaTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-50">
          {dict.ui.ctaSubtitle}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={`/${locale}/contact#programare`}
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand-700 shadow-lg transition-transform hover:scale-[1.02]"
          >
            {dict.ui.ctaButton}
          </Link>
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            <IconPhone className="h-5 w-5" />
            {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

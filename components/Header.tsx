"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { IconPhone } from "./Icons";
import { SITE, type Locale } from "@/lib/site";
import { canonicalSlug, localizeSlug } from "@/lib/content";
import type { Dictionary } from "@/lib/dictionaries";

export function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/servicii`, label: dict.nav.services },
    { href: `/${locale}/detoxifiere`, label: dict.nav.detox },
    { href: `/${locale}/codare`, label: dict.nav.coding },
    { href: `/${locale}/preturi`, label: dict.nav.prices },
    { href: `/${locale}/despre-noi`, label: dict.nav.about },
    { href: `/${locale}/blog`, label: dict.nav.blog },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const other: Locale = locale === "ro" ? "ru" : "ro";

  // Schimbă limba PĂSTRÂND pagina curentă (traduce și slug-ul servicii/blog)
  const pathname = usePathname() || `/${locale}`;
  const switchLocaleHref = (target: Locale): string => {
    const parts = pathname.split("/");
    if (parts.length < 2) return `/${target}`;
    parts[1] = target;
    if (parts.length >= 4 && (parts[2] === "servicii" || parts[2] === "blog")) {
      parts[3] = localizeSlug(canonicalSlug(parts[3]), target);
    }
    return parts.join("/") || `/${target}`;
  };
  const otherHref = switchLocaleHref(other);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all ${
        scrolled
          ? "border-gold-500/20 bg-forest-950/95 shadow-lg shadow-black/20 backdrop-blur-md"
          : "border-transparent bg-forest-900"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} aria-label={SITE.name}>
          <Logo className="h-14 w-auto" priority />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/85 transition-colors hover:text-gold-400"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Comutator de limbă */}
          <Link
            href={otherHref}
            className="hidden rounded-full border border-white/25 px-3 py-1.5 text-xs font-semibold uppercase text-white/80 transition-colors hover:border-gold-400 hover:text-gold-300 sm:inline-flex"
            aria-label={`Switch to ${other}`}
          >
            {other}
          </Link>

          <a
            href={`tel:${SITE.phoneRaw}`}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white md:inline-flex"
          >
            <IconPhone className="h-4 w-4 text-gold-400" />
            {SITE.phone}
          </a>

          <Link
            href={`/${locale}/contact#programare`}
            className="hidden rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-4 py-2 text-sm font-bold text-forest-950 shadow-sm shadow-black/20 transition-all hover:from-gold-300 hover:to-gold-500 sm:inline-flex"
          >
            {dict.nav.book}
          </Link>

          {/* Buton meniu mobil */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg text-white lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Meniu mobil */}
      {open && (
        <div className="border-t border-white/10 bg-forest-900 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-white/85 hover:bg-white/10 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-3">
              <Link
                href={`/${locale}/contact#programare`}
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-4 py-2.5 text-center text-sm font-bold text-forest-950"
              >
                {dict.nav.book}
              </Link>
              <Link
                href={otherHref}
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/25 px-4 py-2.5 text-sm font-semibold uppercase text-white/80"
              >
                {other}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

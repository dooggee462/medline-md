"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { SITE, type Locale } from "@/lib/site";
import { serviceHref } from "@/lib/content";
import { IconDrop, IconShield, IconStar, IconPhone } from "./Icons";

type Slide = {
  Icon: (p: { className?: string }) => React.JSX.Element;
  title: string;
  text: string;
  cta: string;
  href: string;
  tel?: boolean;
};

export function HeroCarousel({ locale }: { locale: Locale }) {
  const ro = locale === "ro";

  const slides: Slide[] = [
    {
      Icon: IconDrop,
      title: ro ? "Detoxificare alcoolică la domiciliu" : "Алкогольная детоксикация на дому",
      text: ro ? "Detoxifiere și refacere rapidă — discret și anonim, 24/7." : "Детокс и быстрое восстановление — анонимно, 24/7.",
      cta: ro ? "Detalii" : "Подробнее",
      href: `/${locale}/detoxifiere`,
    },
    {
      Icon: IconStar,
      title: ro ? "Tratament post-alcool" : "Лечение после алкоголя",
      text: ro ? "Perfuzii de detoxifiere care te pun rapid pe picioare." : "Детокс-капельницы, которые быстро ставят на ноги.",
      cta: ro ? "Detalii" : "Подробнее",
      href: serviceHref(locale, "tratament-post-alcool"),
    },
    {
      Icon: IconShield,
      title: ro ? "Codare anti-alcool" : "Кодирование от алкоголя",
      text: ro ? "Un pas sigur spre o viață fără alcool, sub supraveghere." : "Уверенный шаг к жизни без алкоголя, под наблюдением.",
      cta: ro ? "Detalii" : "Подробнее",
      href: serviceHref(locale, "codare-anti-alcool"),
    },
    {
      Icon: IconPhone,
      title: ro ? "Sunați acum" : "Позвоните сейчас",
      text: SITE.phone,
      cta: ro ? "Sună acum" : "Позвонить",
      href: `tel:${SITE.phoneRaw}`,
      tel: true,
    },
  ];

  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;

  const go = useCallback((idx: number) => setI((idx + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), 4500);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <div
      className="relative w-full overflow-hidden bg-gradient-to-r from-forest-950 via-forest-800 to-forest-950 shadow-md"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-label={locale === "ro" ? "Servicii post-alcool" : "Услуги после алкоголя"}
    >
      {/* decor + textură */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold-500/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-60 w-60 rounded-full bg-brand-500/10 blur-3xl" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden
      />
      {/* linie aurie sus */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" aria-hidden />

      <div className="relative h-52 sm:h-40">
        {slides.map((s, idx) => {
          const Icon = s.Icon;
          const active = idx === i;
          return (
            <div
              key={idx}
              className={`absolute inset-0 flex items-center transition-all duration-700 ${
                active ? "scale-100 opacity-100" : "pointer-events-none scale-[0.98] opacity-0"
              }`}
            >
              <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-2.5 px-5 pb-7 text-center sm:flex-row sm:gap-6 sm:px-12 sm:pb-0 sm:text-left lg:px-16">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-gold-400/30 to-gold-600/20 text-gold-300 ring-1 ring-gold-400/40 shadow-lg shadow-black/20 sm:h-16 sm:w-16">
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
                </span>
                <div className="min-w-0 sm:flex-1">
                  <h2 className="text-base font-extrabold leading-snug text-white sm:text-2xl">{s.title}</h2>
                  <p className="mt-0.5 line-clamp-2 text-xs text-brand-50/85 sm:mt-1 sm:line-clamp-none sm:text-base">{s.text}</p>
                </div>
                {s.tel ? (
                  <a
                    href={s.href}
                    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-5 py-2.5 text-sm font-bold text-forest-950 shadow-lg transition-transform hover:scale-105 sm:px-6 sm:py-3 sm:text-base"
                  >
                    <IconPhone className="h-4 w-4 sm:h-5 sm:w-5" /> {s.cta}
                  </a>
                ) : (
                  <Link
                    href={s.href}
                    className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-5 py-2.5 text-sm font-bold text-forest-950 shadow-lg transition-transform hover:scale-105 sm:px-6 sm:py-3 sm:text-base"
                  >
                    {s.cta} <span aria-hidden>→</span>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* săgeți */}
      <button
        onClick={() => go(i - 1)}
        aria-label="Anterior"
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 sm:grid"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
      </button>
      <button
        onClick={() => go(i + 1)}
        aria-label="Următor"
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 sm:grid"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </button>

      {/* dots */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => go(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${idx === i ? "w-6 bg-gold-400" : "w-2 bg-white/40 hover:bg-white/60"}`}
          />
        ))}
      </div>

      {/* bară de progres auto-play */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
        <div
          key={i}
          className="carousel-progress h-full bg-gradient-to-r from-gold-300 to-gold-500"
          style={{ animationDuration: "4500ms", animationPlayState: paused ? "paused" : "running" }}
        />
      </div>
    </div>
  );
}

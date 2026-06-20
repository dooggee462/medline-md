"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { SITE, type Locale } from "@/lib/site";
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
      href: `/${locale}/servicii/tratament-post-alcool`,
    },
    {
      Icon: IconShield,
      title: ro ? "Codare anti-alcool" : "Кодирование от алкоголя",
      text: ro ? "Un pas sigur spre o viață fără alcool, sub supraveghere." : "Уверенный шаг к жизни без алкоголя, под наблюдением.",
      cta: ro ? "Detalii" : "Подробнее",
      href: `/${locale}/servicii/codare-anti-alcool`,
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
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-800 to-forest-950 shadow-xl shadow-forest-900/20 ring-1 ring-gold-500/20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-label={locale === "ro" ? "Servicii post-alcool" : "Услуги после алкоголя"}
    >
      {/* decor */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-500/10 blur-3xl" aria-hidden />

      <div className="relative h-44 sm:h-40">
        {slides.map((s, idx) => {
          const Icon = s.Icon;
          const active = idx === i;
          return (
            <div
              key={idx}
              className={`absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center transition-opacity duration-700 sm:flex-row sm:gap-6 sm:text-left ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gold-500/20 text-gold-300">
                <Icon className="h-8 w-8" />
              </span>
              <div className="sm:flex-1">
                <h2 className="text-xl font-extrabold text-white sm:text-2xl">{s.title}</h2>
                <p className="mt-1 text-brand-50/85">{s.text}</p>
              </div>
              {s.tel ? (
                <a
                  href={s.href}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-6 py-3 font-bold text-forest-950 shadow-lg transition-transform hover:scale-105"
                >
                  <IconPhone className="h-5 w-5" /> {s.cta}
                </a>
              ) : (
                <Link
                  href={s.href}
                  className="inline-flex items-center gap-1 rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-6 py-3 font-bold text-forest-950 shadow-lg transition-transform hover:scale-105"
                >
                  {s.cta} <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* săgeți */}
      <button
        onClick={() => go(i - 1)}
        aria-label="Anterior"
        className="absolute left-2 top-1/2 hidden -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 sm:grid"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
      </button>
      <button
        onClick={() => go(i + 1)}
        aria-label="Următor"
        className="absolute right-2 top-1/2 hidden -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 sm:grid"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </button>

      {/* dots */}
      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => go(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${idx === i ? "w-6 bg-gold-400" : "w-2 bg-white/40 hover:bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  SITE,
  whatsappLink,
  viberLink,
  messengerLink,
} from "@/lib/site";
import type { Dictionary } from "@/lib/dictionaries";
import {
  IconWhatsApp,
  IconViber,
  IconMessenger,
  IconPhone,
} from "./Icons";

/**
 * Widget flotant de contact (colț dreapta-jos).
 * Buton principal care, la apăsare, deschide linkuri directe către
 * Telefon, WhatsApp, Viber și Facebook Messenger.
 */
export function FloatingContact({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const msg = dict.booking.waMessageIntro;

  const channels = [
    {
      label: "WhatsApp",
      href: whatsappLink(msg),
      bg: "bg-[#25D366]",
      Icon: IconWhatsApp,
      external: true,
    },
    {
      label: "Viber",
      href: viberLink(msg),
      bg: "bg-[#7360f2]",
      Icon: IconViber,
      external: false,
    },
    {
      label: "Messenger",
      href: messengerLink(),
      bg: "bg-[#0084ff]",
      Icon: IconMessenger,
      external: true,
    },
    {
      label: dict.contact.phone,
      href: `tel:${SITE.phoneRaw}`,
      bg: "bg-brand-600",
      Icon: IconPhone,
      external: false,
    },
  ];

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 hidden flex-col items-end gap-3 lg:flex">
      {/* Canale (apar la deschidere) */}
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-300 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        {channels.map(({ label, href, bg, Icon, external }) => (
          <a
            key={label}
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group flex items-center gap-3"
            aria-label={label}
          >
            <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 opacity-0 shadow-md transition-opacity group-hover:opacity-100">
              {label}
            </span>
            <span
              className={`grid h-12 w-12 place-items-center rounded-full text-white shadow-lg shadow-black/20 transition-transform hover:scale-110 ${bg}`}
            >
              <Icon className="h-6 w-6" />
            </span>
          </a>
        ))}
      </div>

      {/* Buton principal */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={dict.nav.contact}
        className={`pointer-events-auto grid h-16 w-16 place-items-center rounded-full text-white shadow-xl shadow-brand-900/30 transition-all hover:scale-105 ${
          open ? "bg-slate-700" : "bg-brand-600"
        }`}
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        ) : (
          <span className="relative flex h-7 w-7 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40" />
            <svg viewBox="0 0 24 24" className="relative h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 12l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
            </svg>
          </span>
        )}
      </button>
    </div>
  );
}

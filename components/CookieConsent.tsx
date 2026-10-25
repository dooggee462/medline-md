"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";

const KEY = "medline-cookie-consent";

export function CookieConsent({ dict }: { dict: Dictionary }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* localStorage indisponibil */
    }
  }, []);

  function decide(value: "accepted" | "rejected") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setShow(false);
  }

  if (!show) return null;

  // O singură linie, deasupra barei de apel: varianta pe 4 rânduri acoperea un
  // sfert din ecranul telefonului, chiar peste butoanele de apel din pagină
  return (
    <div className="fixed inset-x-3 bottom-16 z-[60] mx-auto max-w-2xl lg:bottom-3 rounded-xl border border-slate-200 bg-white/95 px-3 py-2 shadow-lg shadow-black/10 backdrop-blur sm:px-4 sm:py-3">
      <div className="flex items-center gap-3">
        <p className="flex-1 text-xs leading-snug text-slate-600 sm:text-sm">
          {dict.ui.cookieText}
        </p>
        <div className="flex shrink-0 gap-1.5">
          <button
            onClick={() => decide("rejected")}
            className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 sm:text-sm"
          >
            {dict.ui.cookieReject}
          </button>
          <button
            onClick={() => decide("accepted")}
            className="rounded-full bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-700 sm:text-sm"
          >
            {dict.ui.cookieAccept}
          </button>
        </div>
      </div>
    </div>
  );
}

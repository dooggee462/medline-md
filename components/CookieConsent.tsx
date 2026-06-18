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

  return (
    <div className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-black/10 backdrop-blur sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <p className="flex-1 text-sm leading-relaxed text-slate-600">
          🍪 {dict.ui.cookieText}
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => decide("rejected")}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
          >
            {dict.ui.cookieReject}
          </button>
          <button
            onClick={() => decide("accepted")}
            className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            {dict.ui.cookieAccept}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";

/**
 * Numără contactele inițiate de vizitatori, fără să modifice butoanele.
 *
 * Ascultă un singur click pe document și deduce tipul din href — așa prinde
 * automat orice buton de contact, inclusiv cele adăugate în viitor, în loc să
 * ceară un handler pe fiecare link din site.
 */
function typeFromHref(href: string): string | null {
  if (href.startsWith("tel:")) return "call";
  if (href.includes("wa.me") || href.includes("whatsapp.com")) return "whatsapp";
  if (href.startsWith("viber:")) return "viber";
  if (href.includes("m.me") || href.includes("messenger.com")) return "messenger";
  return null;
}

export function ContactTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement | null)?.closest?.("a");
      if (!link) return;
      const type = typeFromHref(link.getAttribute("href") ?? "");
      if (!type) return;
      // keepalive: cererea trebuie să plece chiar dacă pagina se închide imediat
      // (tel: și viber: deschid altă aplicație)
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, page: location.pathname }),
        keepalive: true,
      }).catch(() => {});
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

/** Apelată din formularul de programare, care nu e un link */
export function trackFormSubmit() {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "form", page: location.pathname }),
    keepalive: true,
  }).catch(() => {});
}

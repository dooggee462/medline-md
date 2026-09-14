"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const CONSENT_KEY = "medline-cookie-consent"; // aceeași cheie ca în CookieConsent
const ID_KEY = "medline-vid";
let fallbackId: string | null = null;

/**
 * ID anonim al vizitatorului — aleatoriu, fără nicio legătură cu persoana.
 * Cu cookie-uri acceptate rămâne între vizite (localStorage); fără acord ține
 * doar sesiunea curentă (sessionStorage), ceea ce tot ajunge ca apăsările
 * repetate din aceeași vizită să conteze o singură dată.
 */
function visitorId(): string {
  const make = () =>
    (crypto.randomUUID?.() ?? `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`)
      .replace(/-/g, "")
      .slice(0, 16);
  try {
    const persistent = localStorage.getItem(CONSENT_KEY) === "accepted";
    const id =
      (persistent && localStorage.getItem(ID_KEY)) || sessionStorage.getItem(ID_KEY) || make();
    // după acceptarea cookie-urilor, ID-ul sesiunii devine cel permanent:
    // aceeași persoană nu apare de două ori
    (persistent ? localStorage : sessionStorage).setItem(ID_KEY, id);
    return id;
  } catch {
    // stocare blocată: un ID pe durata paginii deschise
    return (fallbackId ??= make());
  }
}

function send(body: Record<string, string>) {
  // keepalive: cererea pleacă și dacă pagina se închide imediat
  // (tel: și viber: deschid altă aplicație)
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, vid: visitorId(), page: location.pathname }),
    keepalive: true,
  }).catch(() => {});
}

function typeFromHref(href: string): string | null {
  if (href.startsWith("tel:")) return "call";
  if (href.includes("wa.me") || href.includes("whatsapp.com")) return "whatsapp";
  if (href.startsWith("viber:")) return "viber";
  if (href.includes("m.me") || href.includes("messenger.com")) return "messenger";
  return null;
}

/**
 * Numără vizitele și contactele, fără să modifice butoanele: un singur listener
 * pe document deduce tipul din href, deci prinde și butoanele adăugate ulterior.
 */
export function ContactTracker() {
  const pathname = usePathname();

  // o afișare de pagină la fiecare navigare, inclusiv cele fără reîncărcare
  useEffect(() => {
    send({ type: "visit" });
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement | null)?.closest?.("a");
      const type = link && typeFromHref(link.getAttribute("href") ?? "");
      if (type) send({ type });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

/** Apelată din formularul de programare, care nu e un link */
export function trackFormSubmit() {
  send({ type: "form" });
}

/** Apelată din chat, după ce cererea a ajuns la clinică */
export function trackChatLead() {
  send({ type: "chat" });
}

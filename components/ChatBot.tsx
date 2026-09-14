"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SITE, messengerLink, viberLink, whatsappLink, type Locale } from "@/lib/site";
import type { Dictionary } from "@/lib/dictionaries";
import { IconMessenger, IconPhone, IconWhatsApp } from "./Icons";
import { trackChatLead } from "./ContactTracker";

export type ChatService = { name: string; short: string; href: string };

type Step = "menu" | "services" | "service" | "price" | "time" | "area" | "urgent" | "form";
type Action =
  | { label: string; step: Step; service?: ChatService }
  | { label: string; href: string; internal?: boolean };
type Msg = { from: "bot" | "user"; text: string };

/**
 * Asistent cu butoane: scenariu fix, fără AI, deci nu poate spune nimic ce nu
 * am scris noi — pe un site medical e mai sigur decât un răspuns generat.
 * Numele și telefonul se cer obligatoriu la început, înainte de meniu, și
 * pleacă imediat la clinică pe Telegram (/api/chat): Victor are contactul
 * chiar dacă omul doar citește și închide. „Vreau să mă sunați" trimite apoi
 * a doua cerere, cu serviciul, zona și mesajul.
 *
 * Stă în layout, deci conversația rămâne deschisă când vizitatorul navighează.
 */
export function ChatBot({
  dict,
  locale,
  services,
}: {
  dict: Dictionary;
  locale: Locale;
  services: ChatService[];
}) {
  const t = dict.chat;
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: t.greeting },
    { from: "bot", text: t.intro },
  ]);
  const [typing, setTyping] = useState(false);
  const [service, setService] = useState<ChatService | null>(null);
  /** contact = nume + telefon (obligatoriu, la început); callback = zonă + mesaj */
  const [form, setForm] = useState<"contact" | "callback" | null>("contact");
  const [contact, setContact] = useState<{ name: string; phone: string } | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const box = useRef<HTMLDivElement>(null);

  const call: Action = { label: t.callNow, href: `tel:${SITE.phoneRaw}` };
  const back: Action = { label: t.back, step: "menu" };
  const callback: Action = { label: t.callback, step: "form" };
  const mainMenu: Action[] = [
    { label: t.services, step: "services" },
    { label: t.price, step: "price" },
    { label: t.time, step: "time" },
    { label: t.area, step: "area" },
    { label: t.urgent, step: "urgent" },
    callback,
  ];
  const [actions, setActions] = useState<Action[]>([]);

  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight });
  }, [msgs, typing, form, actions, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setMenu(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /** Mesajul vizitatorului apare imediat, răspunsul după o scurtă „tastare" */
  function reply(userText: string, botTexts: string[], next: Action[], nextForm: typeof form = null) {
    setMsgs((m) => [...m, { from: "user", text: userText }]);
    setActions([]);
    setForm(null);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, ...botTexts.map((text) => ({ from: "bot" as const, text }))]);
      setActions(next);
      setForm(nextForm);
    }, 450);
  }

  function choose(a: Extract<Action, { step: Step }>) {
    switch (a.step) {
      case "menu":
        return reply(a.label, [t.ask], mainMenu);
      case "services":
        return reply(a.label, [t.chooseService], [
          ...services.map((s) => ({ label: s.name, step: "service" as const, service: s })),
          back,
        ]);
      case "service":
        setService(a.service!);
        return reply(a.label, [a.service!.short, t.serviceInfo], [
          callback,
          { label: t.readMore, href: a.service!.href, internal: true },
          back,
        ]);
      case "price":
        return reply(a.label, [t.priceAnswer], [callback, call, back]);
      case "time":
        return reply(a.label, [t.timeAnswer], [callback, back]);
      case "area":
        return reply(a.label, [t.areaAnswer], [callback, back]);
      case "urgent":
        return reply(a.label, [t.urgentAnswer], [{ label: t.call112, href: "tel:112" }, call, back]);
      case "form":
        return reply(a.label, [t.formIntro], [back], "callback");
    }
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const kind = contact ? "callback" : "contact";
    const who = contact ?? { name: data.name.trim(), phone: data.phone.trim() };
    if (!who.name) return setError(dict.booking.required);
    if (who.phone.replace(/\D/g, "").length < 6) return setError(dict.booking.invalidPhone);
    setError("");
    setSending(true);

    const svc = kind === "callback" ? service?.name : undefined;
    let ok = false;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ...who, kind, service: svc ?? "", locale, page: location.pathname }),
      });
      ok = res.ok;
    } catch {
      /* fără rețea: tratat ca eșec mai jos */
    }
    setSending(false);
    // și la eșec: omul merge mai departe, iar „Vreau să mă sunați" reîncearcă
    setContact(who);

    const details = [who.name, who.phone, svc, data.zone, data.message].filter(Boolean);
    if (!ok) {
      // cererea nu s-a pierdut: pleacă pe WhatsApp cu aceleași date
      const wa = [dict.booking.waMessageIntro, "", ...details].join("\n");
      reply(details.join(" · "), [t.failed], [
        { label: t.writeWhatsapp, href: whatsappLink(wa) },
        call,
        back,
      ]);
    } else if (kind === "contact") {
      trackChatLead();
      reply(details.join(" · "), [t.welcome.replace("{name}", who.name)], mainMenu);
    } else {
      reply(details.join(" · "), [t.thanks.replace("{name}", who.name)], [back]);
    }
  }

  const channels = [
    { label: "WhatsApp", href: whatsappLink(dict.booking.waMessageIntro), bg: "bg-[#25D366]", Icon: IconWhatsApp, external: true },
    // logoul oficial (public/viber.webp), deja cu cercul lui mov
    { label: "Viber", href: viberLink(dict.booking.waMessageIntro), img: "/viber.webp", external: false },
    { label: "Messenger", href: messengerLink(), bg: "bg-[#0084ff]", Icon: IconMessenger, external: true },
    { label: dict.contact.phone, href: `tel:${SITE.phoneRaw}`, bg: "bg-brand-600", Icon: IconPhone, external: false },
  ];

  const input =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label={t.title}
          className="fixed inset-x-3 bottom-16 z-50 flex max-h-[calc(100dvh-5rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-black/20 lg:inset-x-auto lg:bottom-24 lg:right-5 lg:max-h-[min(620px,calc(100dvh-8rem))] lg:w-[380px]"
        >
          <div className="flex items-center gap-3 bg-brand-600 px-4 py-3 text-white">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/20 font-bold">M</div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold leading-tight">{t.title}</p>
              <p className="flex items-center gap-1.5 text-xs text-white/85">
                <span className="h-2 w-2 rounded-full bg-green-300" />
                {t.status}
              </p>
            </div>
            <a href={`tel:${SITE.phoneRaw}`} aria-label={t.callNow} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/15">
              <IconPhone className="h-5 w-5" />
            </a>
            <a
              href={whatsappLink(dict.booking.waMessageIntro)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/15"
            >
              <IconWhatsApp className="h-5 w-5" />
            </a>
            <button onClick={() => setOpen(false)} aria-label={t.close} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/15">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <div ref={box} className="flex-1 space-y-2 overflow-y-auto bg-slate-50 p-4" aria-live="polite">
            {msgs.map((m, i) => (
              <p
                key={i}
                className={`w-fit max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                  m.from === "bot"
                    ? "rounded-tl-sm bg-white text-slate-700 shadow-sm"
                    : "ml-auto rounded-tr-sm bg-brand-600 text-white"
                }`}
              >
                {m.text}
              </p>
            ))}

            {typing && (
              <p className="flex w-14 justify-center gap-1 rounded-2xl bg-white px-3 py-3 shadow-sm">
                {[0, 150, 300].map((d) => (
                  <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: `${d}ms` }} />
                ))}
              </p>
            )}

            {form && (
              <form key={form} onSubmit={submit} noValidate className="space-y-2 rounded-2xl bg-white p-3 shadow-sm">
                {form === "contact" ? (
                  <>
                    <input name="name" placeholder={`${dict.booking.name} *`} autoComplete="name" maxLength={60} required className={input} />
                    <input name="phone" type="tel" placeholder={`${dict.booking.phone} * (+373 ...)`} autoComplete="tel" maxLength={30} required className={input} />
                  </>
                ) : (
                  <>
                    <input name="zone" placeholder={t.zone} maxLength={80} className={input} />
                    <textarea name="message" placeholder={t.message} rows={2} maxLength={500} className={input} />
                  </>
                )}
                {/* capcană pentru roboții de spam: oamenii nu văd câmpul */}
                <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                {error && <p className="text-xs text-red-600">{error}</p>}
                <button
                  disabled={sending}
                  className="w-full rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
                >
                  {sending ? t.sending : form === "contact" ? t.start : t.send}
                </button>
                <Link href={`/${locale}/confidentialitate`} className="block text-center text-[11px] text-slate-400 underline">
                  {t.consent}
                </Link>
              </form>
            )}

            {actions.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {actions.map((a) =>
                  "step" in a ? (
                    <button
                      key={a.label}
                      onClick={() => choose(a)}
                      className="rounded-full border border-brand-200 bg-white px-3 py-1.5 text-left text-sm font-medium text-brand-700 hover:bg-brand-50"
                    >
                      {a.label}
                    </button>
                  ) : a.internal ? (
                    <Link
                      key={a.label}
                      href={a.href}
                      onClick={() => setOpen(false)}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    >
                      {a.label} →
                    </Link>
                  ) : (
                    <a
                      key={a.label}
                      href={a.href}
                      {...(a.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="rounded-full bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700"
                    >
                      {a.label}
                    </a>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Meniul flotant de contact; chatul e prima opțiune din el */}
      <div
        className={`pointer-events-none fixed bottom-[4.5rem] right-4 z-50 flex flex-col items-end gap-3 lg:bottom-5 lg:right-5 ${
          open ? "max-lg:hidden" : ""
        }`}
      >
        <div
          className={`flex flex-col items-end gap-3 transition-all duration-300 ${
            menu ? "pointer-events-auto translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <button
            onClick={() => {
              setMenu(false);
              setOpen(true);
            }}
            tabIndex={menu ? 0 : -1}
            className="flex items-center gap-3"
          >
            <span className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-md">
              {t.open}
              <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none text-white">
                {t.badge}
              </span>
            </span>
            <span className="grid h-12 w-12 place-items-center rounded-full bg-sky-600 text-white shadow-lg shadow-black/20 transition-transform hover:scale-110">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
                <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" strokeWidth={2.6} />
              </svg>
            </span>
          </button>

          {channels.map(({ label, href, bg, Icon, img, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              tabIndex={menu ? 0 : -1}
              className="group flex items-center gap-3"
              aria-label={label}
            >
              {/* pe telefon nu există hover, deci eticheta se vede mereu */}
              <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-md transition-opacity lg:opacity-0 lg:group-hover:opacity-100">
                {label}
              </span>
              {Icon ? (
                <span className={`grid h-12 w-12 place-items-center rounded-full text-white shadow-lg shadow-black/20 transition-transform hover:scale-110 ${bg}`}>
                  <Icon className="h-6 w-6" />
                </span>
              ) : (
                <img src={img} alt="" width={48} height={48} className="h-12 w-12 rounded-full shadow-lg shadow-black/20 transition-transform hover:scale-110" />
              )}
            </a>
          ))}
        </div>

        <button
          onClick={() => (open ? setOpen(false) : setMenu((v) => !v))}
          aria-expanded={menu || open}
          aria-label={dict.nav.contact}
          className={`pointer-events-auto grid h-14 w-14 place-items-center rounded-full text-white shadow-xl shadow-brand-900/30 transition-all hover:scale-105 lg:h-16 lg:w-16 ${
            menu || open ? "bg-slate-700" : "bg-brand-600"
          }`}
        >
          {menu || open ? (
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          ) : (
            <span className="relative flex h-7 w-7 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40" />
              <svg viewBox="0 0 24 24" className="relative h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 12l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
              </svg>
              {/* punct roșu: e ceva nou în meniu */}
              <span className="absolute -right-2 -top-2 h-3 w-3 rounded-full border-2 border-brand-600 bg-red-500" />
            </span>
          )}
        </button>
      </div>
    </>
  );
}

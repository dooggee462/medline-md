"use client";

import { useState } from "react";
import { SITE, whatsappLink, type Locale } from "@/lib/site";
import type { Dictionary } from "@/lib/dictionaries";
import { SERVICE_LIST } from "@/lib/content";
import { IconWhatsApp, IconPhone } from "./Icons";

export function BookingForm({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const t = dict.booking;
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  function validate() {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = t.required;
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 6) next.phone = t.invalidPhone;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function buildMessage() {
    const lines = [
      t.waMessageIntro,
      "",
      `👤 ${t.name}: ${form.name}`,
      `📞 ${t.phone}: ${form.phone}`,
      form.service ? `🩺 ${t.service}: ${form.service}` : "",
      form.date ? `📅 ${t.date}: ${form.date}` : "",
      form.message ? `📝 ${t.message}: ${form.message}` : "",
    ].filter(Boolean);
    return lines.join("\n");
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    window.open(whatsappLink(buildMessage()), "_blank", "noopener,noreferrer");
  }

  const inputCls =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200";
  const labelCls = "mb-1.5 block text-sm font-medium text-slate-700";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bf-name" className={labelCls}>
            {t.name} *
          </label>
          <input
            id="bf-name"
            type="text"
            value={form.name}
            onChange={update("name")}
            className={inputCls}
            autoComplete="name"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="bf-phone" className={labelCls}>
            {t.phone} *
          </label>
          <input
            id="bf-phone"
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            className={inputCls}
            placeholder="+373 ..."
            autoComplete="tel"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bf-service" className={labelCls}>
            {t.service}
          </label>
          <select
            id="bf-service"
            value={form.service}
            onChange={update("service")}
            className={inputCls}
          >
            <option value="">{t.serviceDefault}</option>
            {SERVICE_LIST.map((s) => (
              <option key={s.ro} value={s[locale]}>
                {s[locale]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="bf-date" className={labelCls}>
            {t.date}
          </label>
          <input
            id="bf-date"
            type="date"
            value={form.date}
            onChange={update("date")}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="bf-msg" className={labelCls}>
          {t.message}
        </label>
        <textarea
          id="bf-msg"
          value={form.message}
          onChange={update("message")}
          rows={3}
          className={inputCls}
          placeholder={t.messagePlaceholder}
        />
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm shadow-brand-600/30 transition-all hover:bg-brand-700 hover:shadow-md"
      >
        <IconWhatsApp className="h-5 w-5" />
        {t.submit}
      </button>

      <p className="text-center text-xs text-slate-500">{t.whatsappNote}</p>

      <div className="flex items-center gap-3 pt-1 text-sm text-slate-500">
        <span className="h-px flex-1 bg-slate-200" />
        {t.orCall}
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <a
        href={`tel:${SITE.phoneRaw}`}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-6 py-3 text-base font-semibold text-brand-700 transition-colors hover:bg-brand-100"
      >
        <IconPhone className="h-5 w-5" />
        {SITE.phone}
      </a>
    </form>
  );
}

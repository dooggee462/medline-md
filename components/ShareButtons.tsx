"use client";

import { useEffect, useState } from "react";
import { IconWhatsApp } from "./Icons";

export function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-gold-400 to-gold-600 transition-[width] duration-150"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function ShareButtons({
  url,
  title,
  label,
}: {
  url: string;
  title: string;
  label: string;
}) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;

  const links = [
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${enc(title + " " + url)}`,
      cls: "bg-[#25D366]",
      icon: <IconWhatsApp className="h-5 w-5" />,
    },
    {
      name: "Telegram",
      href: `https://t.me/share/url?url=${enc(url)}&text=${enc(title)}`,
      cls: "bg-[#229ED9]",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M21.9 4.3 18.7 19c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.8 12 2 10.5c-1-.3-1-1 .2-1.5L20.6 2c.9-.3 1.6.2 1.3 2.3Z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
      cls: "bg-[#1877F2]",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M14 9h3l.5-3H14V4.5c0-.9.3-1.5 1.6-1.5H17V.3C16.7.2 15.6 0 14.4 0 11.9 0 10.2 1.5 10.2 4.3V6H7.5v3h2.7v9H14V9Z" />
        </svg>
      ),
    },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-slate-500">{label}:</span>
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.name}
          className={`grid h-10 w-10 place-items-center rounded-full text-white transition-transform hover:scale-110 ${l.cls}`}
        >
          {l.icon}
        </a>
      ))}
      <button
        onClick={copy}
        aria-label="Copy link"
        className="grid h-10 w-10 place-items-center rounded-full bg-slate-200 text-slate-700 transition-colors hover:bg-slate-300"
      >
        {copied ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="m4 12 5 5L20 6" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" />
            <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />
          </svg>
        )}
      </button>
    </div>
  );
}

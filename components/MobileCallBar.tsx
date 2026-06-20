import { SITE, whatsappLink } from "@/lib/site";
import type { Dictionary } from "@/lib/dictionaries";
import { IconPhone, IconWhatsApp } from "./Icons";

/**
 * Bară fixă jos, doar pe mobil, cu buton de apel + WhatsApp (mereu vizibile).
 */
export function MobileCallBar({ dict }: { dict: Dictionary }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:hidden">
      <a
        href={`tel:${SITE.phoneRaw}`}
        className="flex flex-1 items-center justify-center gap-2 bg-brand-600 py-3.5 font-bold text-white"
      >
        <IconPhone className="h-5 w-5" />
        {dict.nav.call}
      </a>
      <a
        href={whatsappLink(dict.booking.waMessageIntro)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 bg-[#25D366] py-3.5 font-bold text-white"
      >
        <IconWhatsApp className="h-5 w-5" />
        WhatsApp
      </a>
    </div>
  );
}

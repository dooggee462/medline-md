"use client";

import { useFormStatus } from "react-dom";

/**
 * Buton de salvare care se blochează cât timp cererea e pe drum.
 * Fără asta, un dublu clic (sau o apăsare pe internet slab) crea două cazuri
 * și trimitea două anunțuri pe Telegram.
 */
export function SubmitButton({ children, pendingLabel }: { children: React.ReactNode; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

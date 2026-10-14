"use client";

/** Bifează sau debifează toate cazurile afișate */
export function SelectAll({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-600">
      <input
        type="checkbox"
        className="h-4 w-4 accent-brand-600"
        onChange={(e) => {
          document
            .querySelectorAll<HTMLInputElement>('input[name="id"][form="selectie"]')
            .forEach((box) => (box.checked = e.currentTarget.checked));
        }}
      />
      {label}
    </label>
  );
}

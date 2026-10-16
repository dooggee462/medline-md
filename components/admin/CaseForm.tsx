import Link from "next/link";
import { SERVICE_LIST } from "@/lib/content";
import { AREAS, PAYMENTS, SOURCES, STATUSES, today, type Case } from "@/lib/cases";
import type { Session } from "@/lib/auth";
import { SubmitButton } from "./SubmitButton";

const input =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200";
const label = "mb-1 block text-sm font-medium text-slate-700";

function Field({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={label} htmlFor={id}>
        {title}
      </label>
      {children}
    </div>
  );
}

/**
 * Formularul unui caz. Fără JavaScript propriu: trimite direct către acțiunea
 * de server, ca să meargă la fel de bine de pe telefon, pe conexiune proastă.
 */
export function CaseForm({
  action,
  session,
  staff,
  value,
  history = [],
  error,
}: {
  action: (formData: FormData) => void;
  session: Session;
  staff: string[];
  value?: Case;
  history?: Case[];
  error?: string;
}) {
  const v = value;

  return (
    <form action={action} className="mt-6 space-y-5">
      <input type="hidden" name="id" value={v?.id ?? ""} />

      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">Numele pacientului este obligatoriu.</p>
      )}

      {history.length > 0 && (
        <div className="rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800">
          <p className="font-semibold">Pacient cunoscut: {history.length + 1}-a vizită</p>
          <ul className="mt-1 space-y-0.5 text-brand-700">
            {history.slice(0, 3).map((h) => (
              <li key={h.id}>
                {h.date} · {h.service || "—"} · {h.assignee || "nerepartizat"}
                {h.amount ? ` · ${h.amount} lei` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="patient" title="Pacient *">
          <input id="patient" name="patient" defaultValue={v?.patient} required className={input} />
        </Field>
        <Field id="phone" title="Telefon">
          <input id="phone" name="phone" type="tel" defaultValue={v?.phone} placeholder="+373 ..." className={input} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field id="age" title="Vârsta">
          <input id="age" name="age" defaultValue={v?.age} placeholder="78" className={input} />
        </Field>
        <Field id="date" title="Data vizitei">
          <input id="date" name="date" type="date" defaultValue={v?.date || today()} className={input} />
        </Field>
        <Field id="time" title="Ora">
          <input id="time" name="time" type="time" defaultValue={v?.time} className={input} />
        </Field>
      </div>

      <Field id="contact" title="Persoana de contact (rudă, însoțitor)">
        <input id="contact" name="contact" defaultValue={v?.contact} placeholder="fiica, Ana, +373 79 ..." className={input} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field id="area" title="Sector sau localitate">
          <select id="area" name="area" defaultValue={v?.area ?? ""} className={input}>
            <option value="">—</option>
            {AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field id="address" title="Adresa (stradă, bloc, apartament, etaj, interfon)">
            <input
              id="address"
              name="address"
              defaultValue={v?.address}
              placeholder="str. Independenței 14, bl. 2, ap. 37, et. 4, interfon 37"
              className={input}
            />
          </Field>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="service" title="Serviciu">
          <select id="service" name="service" defaultValue={v?.service ?? ""} className={input}>
            <option value="">—</option>
            {SERVICE_LIST.map((s) => (
              <option key={s.ro} value={s.ro}>
                {s.ro}
              </option>
            ))}
          </select>
        </Field>
        <Field id="assignee" title="Asistent repartizat">
          {session.role === "admin" ? (
            <select id="assignee" name="assignee" defaultValue={v?.assignee ?? ""} className={input}>
              <option value="">— nerepartizat</option>
              {staff.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          ) : (
            <input id="assignee" value={v?.assignee || session.name} readOnly className={`${input} bg-slate-50`} />
          )}
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="status" title="Status">
          <select id="status" name="status" defaultValue={v?.status ?? "nou"} className={input}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field id="source" title="De unde a venit">
          <select id="source" name="source" defaultValue={v?.source ?? ""} className={input}>
            <option value="">—</option>
            {SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="amount" title="Sumă încasată (lei)">
          <input id="amount" name="amount" inputMode="numeric" defaultValue={v?.amount || ""} placeholder="0" className={input} />
        </Field>
        <Field id="payment" title="Plata">
          <select id="payment" name="payment" defaultValue={v?.payment ?? ""} className={input}>
            {PAYMENTS.map((p) => (
              <option key={p || "none"} value={p}>
                {p || "—"}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="notes" title="Observații">
        <textarea
          id="notes"
          name="notes"
          rows={3}
          defaultValue={v?.notes}
          placeholder="pacient imobilizat, se sună fiica înainte"
          className={input}
        />
      </Field>

      <div className="flex items-center gap-3 pt-2">
        <SubmitButton pendingLabel="Se salvează…">Salvează</SubmitButton>
        <Link href="/admin/registru" className="text-sm font-medium text-slate-500 hover:text-slate-700">
          Renunță
        </Link>
        {v && (
          <span className="ml-auto text-xs text-slate-400">
            Caz {v.no} · creat de {v.createdBy}, {v.createdAt}
            {v.updatedAt ? ` · modificat de ${v.updatedBy}, ${v.updatedAt}` : ""}
          </span>
        )}
      </div>
    </form>
  );
}

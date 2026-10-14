"use server";

import crypto from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSession, type Session } from "@/lib/auth";
import { getCase, removeCase, saveCase, setStatus, today, STATUSES, type Status } from "@/lib/cases";

async function requireSession(): Promise<Session> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

/** Asistentul lucrează doar cu propriile cazuri; administratorul, cu toate */
function allowed(session: Session, assignee: string): boolean {
  return session.role === "admin" || assignee === session.name;
}

const text = (fd: FormData, key: string, max = 200) => String(fd.get(key) || "").trim().slice(0, max);

export async function saveCaseAction(formData: FormData) {
  const session = await requireSession();

  const id = text(formData, "id") || crypto.randomUUID();
  const existing = await getCase(id);
  if (existing && !allowed(session, existing.assignee)) redirect("/admin/registru");

  const patient = text(formData, "patient", 80);
  if (!patient) redirect(existing ? `/admin/registru/${id}?error=nume` : "/admin/registru/nou?error=nume");

  const statusRaw = text(formData, "status", 20);
  const status: Status = (STATUSES as readonly string[]).includes(statusRaw) ? (statusRaw as Status) : "nou";

  // asistentul nu poate muta cazul la altcineva
  const assignee =
    session.role === "admin" ? text(formData, "assignee", 60) : existing?.assignee || session.name;

  await saveCase(
    {
      id,
      date: text(formData, "date", 10) || today(),
      time: text(formData, "time", 5),
      patient,
      age: text(formData, "age", 10),
      phone: text(formData, "phone", 30),
      contact: text(formData, "contact", 120),
      area: text(formData, "area", 60),
      address: text(formData, "address", 200),
      service: text(formData, "service", 100),
      assignee,
      status,
      source: text(formData, "source", 30),
      amount: Math.max(0, Math.round(Number(text(formData, "amount", 12).replace(",", ".")) || 0)),
      payment: text(formData, "payment", 20),
      notes: text(formData, "notes", 1000),
    },
    session.name,
  );

  revalidatePath("/admin/registru");
  redirect("/admin/registru");
}

export async function setStatusAction(formData: FormData) {
  const session = await requireSession();
  const id = text(formData, "id", 60);
  const existing = await getCase(id);
  if (!existing || !allowed(session, existing.assignee)) redirect("/admin/registru");

  const value = text(formData, "status", 20);
  if ((STATUSES as readonly string[]).includes(value)) await setStatus(id, value as Status, session.name);

  revalidatePath("/admin/registru");
  redirect("/admin/registru");
}

/** Șterge cazurile bifate în listă */
export async function deleteManyAction(formData: FormData) {
  const session = await requireSession();
  if (session.role !== "admin") redirect("/admin/registru");
  for (const id of formData.getAll("id").map(String)) await removeCase(id);
  revalidatePath("/admin/registru");
  redirect("/admin/registru");
}

export async function deleteCaseAction(formData: FormData) {
  const session = await requireSession();
  if (session.role !== "admin") redirect("/admin/registru"); // ștergerea rămâne la administrator
  const id = text(formData, "id", 60);
  if (id) await removeCase(id);
  revalidatePath("/admin/registru");
  redirect("/admin/registru");
}

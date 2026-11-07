"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { currentUser } from "@/lib/team";
import { sendTelegram, setChat, type Channel } from "@/lib/telegram";

async function requireAdmin() {
  const session = await currentUser();
  if (!session) redirect("/admin/login");
  if (session.role !== "admin") redirect("/admin/notificari");
  return session;
}

const channelOf = (fd: FormData): Channel =>
  String(fd.get("channel")) === "echipa" ? "echipa" : "clienti";

/** Leagă un grup de Telegram la unul dintre cele două fluxuri */
export async function setChatAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "").trim();
  if (id) await setChat(channelOf(formData), id);
  revalidatePath("/admin/notificari");
  redirect("/admin/notificari?grup=1");
}

/** Mesaj de probă, ca să se vadă pe loc dacă grupul primește */
export async function testTelegramAction(formData: FormData) {
  await requireAdmin();
  const channel = channelOf(formData);
  const ok = await sendTelegram(
    channel === "echipa"
      ? "✅ Probă · aici vor veni comenzile către asistenți"
      : "✅ Probă · aici vin cererile de pe site",
    channel,
  );
  redirect(`/admin/notificari?proba=${ok ? "ok" : "esec"}`);
}

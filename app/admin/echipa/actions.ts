"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  currentUser,
  forgetTelegram,
  linkTelegramId,
  setName,
  setPhone,
  setTelegramName,
  team,
} from "@/lib/team";
import { renameAssignee } from "@/lib/cases";

/** Victor schimbă numele echipei; cazurile vechi se mută singure pe numele nou */
export async function saveTeamAction(formData: FormData) {
  const session = await currentUser();
  if (!session) redirect("/admin/login");
  if (session.role !== "admin") redirect("/admin/registru");

  let moved = 0;
  for (const member of await team()) {
    const name = String(formData.get(`name_${member.user}`) || "").trim();
    const old = await setName(member.user, name);
    if (old) moved += await renameAssignee(old, name);
    await setTelegramName(member.user, String(formData.get(`tg_${member.user}`) || "").slice(0, 40));
    await setPhone(member.user, String(formData.get(`tel_${member.user}`) || ""));
  }

  revalidatePath("/admin/echipa");
  revalidatePath("/admin/registru");
  redirect(`/admin/echipa?salvat=${moved}`);
}

/** Leagă un om care a apăsat butonul din grup de contul lui din panou */
export async function linkTelegramAction(formData: FormData) {
  const session = await currentUser();
  if (!session) redirect("/admin/login");
  if (session.role !== "admin") redirect("/admin/registru");

  const id = String(formData.get("tgid") || "");
  const user = String(formData.get("user") || "");
  if (id && formData.get("ignora")) await forgetTelegram(id); // nu e din echipă
  else if (id && user) await linkTelegramId(id, user);

  revalidatePath("/admin/echipa");
  redirect("/admin/echipa?salvat=0");
}

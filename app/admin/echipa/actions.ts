"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { currentUser, setName, team } from "@/lib/team";
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
  }

  revalidatePath("/admin/echipa");
  revalidatePath("/admin/registru");
  redirect(`/admin/echipa?salvat=${moved}`);
}

"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { currentUser } from "@/lib/team";
import { saveInfo } from "@/lib/info";

export async function saveInfoAction(formData: FormData) {
  const session = await currentUser();
  if (!session) redirect("/admin/login");
  if (session.role !== "admin") redirect("/admin/informatii"); // asistenții doar citesc

  await saveInfo(String(formData.get("text") || ""), session.name);
  revalidatePath("/admin/informatii");
  redirect("/admin/informatii?salvat=1");
}

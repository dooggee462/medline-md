"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { currentUser } from "@/lib/team";
import { saveInfo, type InfoItem } from "@/lib/info";

export async function saveInfoAction(formData: FormData) {
  const session = await currentUser();
  if (!session) redirect("/admin/login");
  if (session.role !== "admin") redirect("/admin/informatii"); // asistenții doar citesc

  // rândurile vin ca service_0, price_0, included_0, service_1…
  const items: InfoItem[] = [];
  for (let i = 0; formData.has(`service_${i}`); i++) {
    items.push({
      service: String(formData.get(`service_${i}`) || ""),
      price: String(formData.get(`price_${i}`) || ""),
      included: String(formData.get(`included_${i}`) || ""),
    });
  }

  await saveInfo(items, String(formData.get("notes") || ""), session.name);
  revalidatePath("/admin/informatii");
  redirect("/admin/informatii?salvat=1");
}

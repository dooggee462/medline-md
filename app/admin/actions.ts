"use server";

import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  checkCredentials,
  createSession,
  destroySession,
  isAuthenticated,
} from "@/lib/auth";
import {
  savePost,
  deletePost,
  getPostById,
  slugify,
  UPLOADS_DIR,
  type Post,
} from "@/lib/posts";

async function requireAuth() {
  if (!(await isAuthenticated())) redirect("/admin/login");
}

export async function loginAction(formData: FormData) {
  const user = String(formData.get("user") || "");
  const password = String(formData.get("password") || "");
  if (checkCredentials(user, password)) {
    await createSession();
    redirect("/admin");
  }
  redirect("/admin/login?error=1");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

function readMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

async function handleUpload(file: File | null, id: string): Promise<string | undefined> {
  if (!file || file.size === 0) return undefined;
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const name = `${id}-${Date.now()}.${ext}`;
  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOADS_DIR, name), buf);
  return `/api/uploads/${name}`;
}

export async function savePostAction(formData: FormData) {
  await requireAuth();

  const id = String(formData.get("id") || "") || crypto.randomUUID();
  const existing = await getPostById(id);

  const roTitle = String(formData.get("ro_title") || "").trim();
  const ruTitle = String(formData.get("ru_title") || "").trim();
  if (!roTitle || !ruTitle) redirect("/admin/new?error=fields");

  const file = formData.get("cover") as File | null;
  const uploaded = await handleUpload(file, id);

  const roBody = String(formData.get("ro_body") || "");
  const ruBody = String(formData.get("ru_body") || "");

  const post: Post = {
    id,
    slug: existing?.slug || slugify(roTitle) || id.slice(0, 8),
    date: String(formData.get("date") || "") || new Date().toISOString().slice(0, 10),
    readMinutes: readMinutes(roBody),
    tiktok: String(formData.get("tiktok") || "").trim() || undefined,
    cover: uploaded || existing?.cover,
    ro: { title: roTitle, excerpt: String(formData.get("ro_excerpt") || "").trim(), body: roBody },
    ru: { title: ruTitle, excerpt: String(formData.get("ru_excerpt") || "").trim(), body: ruBody },
  };

  await savePost(post);
  revalidatePath("/ro/blog");
  revalidatePath("/ru/blog");
  revalidatePath(`/ro/blog/${post.slug}`);
  revalidatePath(`/ru/blog/${post.slug}`);
  redirect("/admin");
}

export async function deletePostAction(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id") || "");
  if (id) await deletePost(id);
  revalidatePath("/ro/blog");
  revalidatePath("/ru/blog");
  redirect("/admin");
}

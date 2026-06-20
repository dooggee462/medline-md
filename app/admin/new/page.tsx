import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { PostForm } from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <a href="/admin" className="text-sm font-medium text-slate-500 hover:text-brand-700">← Înapoi</a>
      <h1 className="mt-3 text-2xl font-extrabold text-slate-900">Articol nou</h1>
      <div className="mt-6">
        <PostForm />
      </div>
    </main>
  );
}

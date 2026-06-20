import { notFound, redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getPostById } from "@/lib/posts";
import { PostForm } from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <a href="/admin" className="text-sm font-medium text-slate-500 hover:text-brand-700">← Înapoi</a>
      <h1 className="mt-3 text-2xl font-extrabold text-slate-900">Editează articolul</h1>
      <div className="mt-6">
        <PostForm post={post} />
      </div>
    </main>
  );
}

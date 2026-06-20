import { savePostAction } from "@/app/admin/actions";
import type { Post } from "@/lib/posts";

const input =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200";
const label = "mb-1 block text-sm font-medium text-slate-700";

export function PostForm({ post }: { post?: Post }) {
  return (
    <form action={savePostAction} className="space-y-8" encType="multipart/form-data">
      {post && <input type="hidden" name="id" value={post.id} />}

      {/* Meta comune */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="date">Data</label>
          <input
            id="date" name="date" type="date" className={input}
            defaultValue={post?.date || new Date().toISOString().slice(0, 10)}
          />
        </div>
        <div>
          <label className={label} htmlFor="tiktok">Link TikTok (opțional)</label>
          <input
            id="tiktok" name="tiktok" type="url" placeholder="https://www.tiktok.com/@medlinehealth/video/..."
            className={input} defaultValue={post?.tiktok || ""}
          />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="cover">Poză de copertă (opțional)</label>
        {post?.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover} alt="" className="mb-2 h-32 rounded-lg object-cover" />
        )}
        <input id="cover" name="cover" type="file" accept="image/*" className={input} />
        <p className="mt-1 text-xs text-slate-400">Lasă gol ca să păstrezi poza actuală.</p>
      </div>

      {/* Română */}
      <fieldset className="rounded-xl border border-slate-200 p-4">
        <legend className="px-2 text-sm font-bold text-brand-700">🇷🇴 Română</legend>
        <div className="space-y-4">
          <div>
            <label className={label} htmlFor="ro_title">Titlu *</label>
            <input id="ro_title" name="ro_title" required className={input} defaultValue={post?.ro.title || ""} />
          </div>
          <div>
            <label className={label} htmlFor="ro_excerpt">Descriere scurtă</label>
            <input id="ro_excerpt" name="ro_excerpt" className={input} defaultValue={post?.ro.excerpt || ""} />
          </div>
          <div>
            <label className={label} htmlFor="ro_body">Conținut</label>
            <textarea id="ro_body" name="ro_body" rows={8} className={input} defaultValue={post?.ro.body || ""} placeholder={"Scrie textul. Lasă o linie goală între paragrafe.\n\n## Subtitlu mare (H2)\nText...\n\n### Subtitlu mic (H3)\nText..."} />
            <p className="mt-1 text-xs text-slate-400">
              Pentru SEO: pune subtitluri cu <code>## Titlu</code> (H2), <code>### Titlu</code> (H3), <code>#### Titlu</code> (H4). Titlul articolului e deja H1.
            </p>
          </div>
        </div>
      </fieldset>

      {/* Rusă */}
      <fieldset className="rounded-xl border border-slate-200 p-4">
        <legend className="px-2 text-sm font-bold text-brand-700">🇷🇺 Русский</legend>
        <div className="space-y-4">
          <div>
            <label className={label} htmlFor="ru_title">Заголовок *</label>
            <input id="ru_title" name="ru_title" required className={input} defaultValue={post?.ru.title || ""} />
          </div>
          <div>
            <label className={label} htmlFor="ru_excerpt">Краткое описание</label>
            <input id="ru_excerpt" name="ru_excerpt" className={input} defaultValue={post?.ru.excerpt || ""} />
          </div>
          <div>
            <label className={label} htmlFor="ru_body">Текст</label>
            <textarea id="ru_body" name="ru_body" rows={8} className={input} defaultValue={post?.ru.body || ""} placeholder={"Текст статьи. Оставьте пустую строку между абзацами.\n\n## Подзаголовок (H2)\nТекст...\n\n### Подзаголовок (H3)\nТекст..."} />
            <p className="mt-1 text-xs text-slate-400">
              Для SEO: подзаголовки через <code>## Заголовок</code> (H2), <code>### Заголовок</code> (H3), <code>#### Заголовок</code> (H4).
            </p>
          </div>
        </div>
      </fieldset>

      <div className="flex gap-3">
        <button type="submit" className="rounded-lg bg-brand-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-brand-700">
          Salvează
        </button>
        <a href="/admin" className="rounded-lg border border-slate-300 px-6 py-2.5 font-semibold text-slate-600 transition-colors hover:bg-slate-50">
          Anulează
        </a>
      </div>
    </form>
  );
}

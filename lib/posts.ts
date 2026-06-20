import { promises as fs } from "fs";
import path from "path";
import type { Locale } from "./site";
import { ARTICLES } from "./content";

/**
 * Stocarea articolelor adăugate din panoul de admin.
 * Salvate ca JSON în DATA_DIR (volum persistent pe server).
 * Articolele statice din content.ts (ARTICLES) rămân și ele — blogul le îmbină.
 */

export const DATA_DIR =
  process.env.DATA_DIR || path.join(process.cwd(), "data");
const POSTS_FILE = path.join(DATA_DIR, "posts.json");
export const UPLOADS_DIR = path.join(DATA_DIR, "uploads");

export type PostLang = { title: string; excerpt: string; body: string };

export type Post = {
  id: string;
  slug: string;
  date: string; // YYYY-MM-DD
  readMinutes: number;
  tiktok?: string;
  cover?: string; // ex: /api/uploads/xxx.jpg
  ro: PostLang;
  ru: PostLang;
};

/** Bloc de conținut pentru randare cu heading-uri corecte SEO */
export type Block =
  | { type: "heading"; level: 2 | 3 | 4; text: string }
  | { type: "paragraph"; text: string };

/** Vedere unificată folosită de paginile publice de blog */
export type BlogView = {
  slug: string;
  date: string;
  readMinutes: number;
  tiktok?: string;
  cover?: string;
  title: string;
  excerpt: string;
  blocks: Block[];
  editable: boolean; // true = vine din panou (JSON)
};

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
}

export async function readPosts(): Promise<Post[]> {
  try {
    const raw = await fs.readFile(POSTS_FILE, "utf8");
    return JSON.parse(raw) as Post[];
  } catch {
    return [];
  }
}

async function writePosts(posts: Post[]) {
  await ensureDir();
  await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2), "utf8");
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 70);
}

export async function getPostById(id: string): Promise<Post | undefined> {
  return (await readPosts()).find((p) => p.id === id);
}

export async function savePost(post: Post): Promise<void> {
  const posts = await readPosts();
  const idx = posts.findIndex((p) => p.id === post.id);
  if (idx >= 0) posts[idx] = post;
  else posts.unshift(post);
  await writePosts(posts);
}

export async function deletePost(id: string): Promise<void> {
  const posts = (await readPosts()).filter((p) => p.id !== id);
  await writePosts(posts);
}

/**
 * Transformă textul din panou în blocuri cu heading-uri.
 * Convenție (ca în Markdown):
 *   "## Subtitlu"   → h2
 *   "### Subtitlu"  → h3
 *   "#### Subtitlu" → h4
 *   restul          → paragrafe (separate de linii goale)
 */
function parseBlocks(body: string): Block[] {
  const blocks: Block[] = [];
  let para: string[] = [];
  const flush = () => {
    if (para.length) {
      blocks.push({ type: "paragraph", text: para.join(" ").trim() });
      para = [];
    }
  };
  for (const raw of body.split(/\n/)) {
    const line = raw.trim();
    if (!line) {
      flush();
    } else if (line.startsWith("#### ")) {
      flush();
      blocks.push({ type: "heading", level: 4, text: line.slice(5).trim() });
    } else if (line.startsWith("### ")) {
      flush();
      blocks.push({ type: "heading", level: 3, text: line.slice(4).trim() });
    } else if (line.startsWith("## ")) {
      flush();
      blocks.push({ type: "heading", level: 2, text: line.slice(3).trim() });
    } else {
      para.push(line);
    }
  }
  flush();
  return blocks;
}

/** Convertește secțiunile articolelor statice în blocuri */
function sectionsToBlocks(
  sections: { heading?: string; body: string[] }[]
): Block[] {
  const blocks: Block[] = [];
  for (const s of sections) {
    if (s.heading) blocks.push({ type: "heading", level: 2, text: s.heading });
    for (const p of s.body) blocks.push({ type: "paragraph", text: p });
  }
  return blocks;
}

/** Lista de blog (statice + din panou), sortată descrescător după dată */
export async function getBlogList(locale: Locale): Promise<BlogView[]> {
  const dynamic: BlogView[] = (await readPosts()).map((p) => ({
    slug: p.slug,
    date: p.date,
    readMinutes: p.readMinutes,
    tiktok: p.tiktok,
    cover: p.cover,
    title: p[locale].title,
    excerpt: p[locale].excerpt,
    blocks: parseBlocks(p[locale].body),
    editable: true,
  }));

  const staticViews: BlogView[] = ARTICLES.map((a) => ({
    slug: a.slug,
    date: a.date,
    readMinutes: a.readMinutes,
    tiktok: a.tiktok,
    title: a.content[locale].title,
    excerpt: a.content[locale].excerpt,
    blocks: sectionsToBlocks(a.content[locale].sections),
    editable: false,
  }));

  return [...dynamic, ...staticViews].sort((x, y) =>
    y.date.localeCompare(x.date)
  );
}

export async function getBlogPost(
  slug: string,
  locale: Locale
): Promise<BlogView | undefined> {
  return (await getBlogList(locale)).find((b) => b.slug === slug);
}

/** Toate slug-urile (pentru sitemap) */
export async function getAllBlogSlugs(): Promise<string[]> {
  const dyn = (await readPosts()).map((p) => p.slug);
  const stat = ARTICLES.map((a) => a.slug);
  return [...new Set([...dyn, ...stat])];
}

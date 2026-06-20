import type { MetadataRoute } from "next";
import { SITE, LOCALES } from "@/lib/site";
import { SERVICES } from "@/lib/content";
import { getAllBlogSlugs } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  const blogSlugs = await getAllBlogSlugs();

  // Căi statice (relative la locale)
  const staticPaths = ["", "/servicii", "/detoxifiere", "/preturi", "/despre-noi", "/blog", "/contact", "/confidentialitate", "/termeni"];

  for (const locale of LOCALES) {
    for (const p of staticPaths) {
      entries.push({
        url: `${SITE.url}/${locale}${p}`,
        lastModified: now,
        changeFrequency: p === "" ? "weekly" : "monthly",
        priority: p === "" ? 1 : 0.8,
        alternates: {
          languages: {
            ro: `${SITE.url}/ro${p}`,
            ru: `${SITE.url}/ru${p}`,
          },
        },
      });
    }

    // Pagini de serviciu
    for (const s of SERVICES) {
      entries.push({
        url: `${SITE.url}/${locale}/servicii/${s.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.9,
        alternates: {
          languages: {
            ro: `${SITE.url}/ro/servicii/${s.slug}`,
            ru: `${SITE.url}/ru/servicii/${s.slug}`,
          },
        },
      });
    }

    // Articole de blog (statice + adăugate din panou)
    for (const slug of blogSlugs) {
      entries.push({
        url: `${SITE.url}/${locale}/blog/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: {
            ro: `${SITE.url}/ro/blog/${slug}`,
            ru: `${SITE.url}/ru/blog/${slug}`,
          },
        },
      });
    }
  }

  return entries;
}

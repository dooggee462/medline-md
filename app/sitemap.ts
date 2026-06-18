import type { MetadataRoute } from "next";
import { SITE, LOCALES } from "@/lib/site";
import { SERVICES, ARTICLES } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Căi statice (relative la locale)
  const staticPaths = ["", "/servicii", "/preturi", "/despre-noi", "/blog", "/contact"];

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

    // Articole de blog
    for (const a of ARTICLES) {
      entries.push({
        url: `${SITE.url}/${locale}/blog/${a.slug}`,
        lastModified: new Date(a.date),
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: {
          languages: {
            ro: `${SITE.url}/ro/blog/${a.slug}`,
            ru: `${SITE.url}/ru/blog/${a.slug}`,
          },
        },
      });
    }
  }

  return entries;
}

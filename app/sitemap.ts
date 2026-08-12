import type { MetadataRoute } from "next";
import { SITE, LOCALES } from "@/lib/site";
import { SERVICES, localizeSlug } from "@/lib/content";
import { getBlogList } from "@/lib/posts";

export const dynamic = "force-dynamic";

/**
 * Data build-ului — se schimbă doar la deploy, când paginile chiar se regenerează.
 * NU folosi `new Date()` la fiecare cerere: Google vede tot site-ul „modificat acum",
 * își dă seama că lastmod minte și îl ignoră cu totul.
 */
const BUILD_DATE = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = BUILD_DATE;
  const entries: MetadataRoute.Sitemap = [];
  // Articolele își poartă data reală de publicare
  const posts = await getBlogList("ro");

  // Căi statice (relative la locale)
  const staticPaths = ["", "/servicii", "/detoxifiere", "/codare", "/preturi", "/despre-noi", "/blog", "/contact", "/confidentialitate", "/termeni"];

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

    // Pagini de serviciu (slug localizat per limbă)
    for (const s of SERVICES) {
      // Serviciile care indică altă pagină drept canonică nu intră în sitemap:
      // ar contrazice propriul lor canonical
      if (s.canonicalTo) continue;
      entries.push({
        url: `${SITE.url}/${locale}/servicii/${localizeSlug(s.slug, locale)}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.9,
        alternates: {
          languages: {
            ro: `${SITE.url}/ro/servicii/${s.slug}`,
            ru: `${SITE.url}/ru/servicii/${localizeSlug(s.slug, "ru")}`,
          },
        },
      });
    }

    // Articole de blog (statice + adăugate din panou)
    for (const p of posts) {
      entries.push({
        url: `${SITE.url}/${locale}/blog/${localizeSlug(p.roSlug, locale)}`,
        lastModified: new Date(p.date),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: {
            ro: `${SITE.url}/ro/blog/${p.roSlug}`,
            ru: `${SITE.url}/ru/blog/${localizeSlug(p.roSlug, "ru")}`,
          },
        },
      });
    }
  }

  return entries;
}

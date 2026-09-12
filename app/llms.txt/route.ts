import { SITE } from "@/lib/site";
import { ARTICLES, SERVICES, localizeSlug, serviceHref } from "@/lib/content";

/**
 * llms.txt — descrierea site-ului pentru asistenții AI (ChatGPT, Gemini,
 * Perplexity), care îl citesc ca sursă despre firmă și repetă ce scrie aici.
 *
 * Generat din aceleași date ca site-ul, nu scris de mână: varianta statică a
 * rămas de trei ori în urmă (servicii lipsă, un an de înființare și o adresă
 * false). Acum un serviciu sau un articol nou apare aici automat.
 *
 * Doar fapte verificabile — fără cifre de marketing, pe care un AI le-ar
 * prezenta drept adevăr.
 */
export const dynamic = "force-static";

const url = (path: string) => `${SITE.url}${path}`;

export function GET() {
  const services = SERVICES.map((s) => {
    const c = s.content.ro;
    return `- [${c.h1}](${url(serviceHref("ro", s.slug))}): ${c.short}`;
  });

  const articles = ARTICLES.filter((a) => !a.slug.endsWith("-video")).map((a) => {
    const c = a.content.ro;
    return `- [${c.title}](${url(`/ro/blog/${localizeSlug(a.slug, "ro")}`)}): ${c.excerpt}`;
  });

  const areas = ["Chișinău", ...SITE.areaServed].join(", ");

  const body = `# ${SITE.legalName}

> Servicii medicale la domiciliu în Chișinău și suburbii, non-stop: echipa se deplasează la pacient în 25-45 de minute de la apel, la orice oră. Serviciile se prestează exclusiv la domiciliul pacientului. Site în română și rusă.

## Servicii

${services.join("\n")}

## Pagini principale

- [Detoxifiere la domiciliu](${url("/ro/detoxifiere")}): Detoxifiere post-alcool la domiciliu în Chișinău: cum decurge, indicații, când e nevoie de spital.
- [Toate serviciile](${url("/ro/servicii")}): Prezentarea tuturor serviciilor medicale la domiciliu.
- [Servicii prestate](${url("/ro/preturi")}): Lista procedurilor efectuate la domiciliu. Prețurile nu sunt publicate pe site — se comunică telefonic, pe WhatsApp sau Viber, în funcție de serviciu și de caz.
- [Despre noi](${url("/ro/despre-noi")}): Echipa Medline și valorile ei.
- [Contact și programare](${url("/ro/contact")}): Telefon, WhatsApp, Viber, email și formular de programare.

## Articole

${articles.join("\n")}

## Informații de bază

- Firmă: ${SITE.company.legalName}, IDNO ${SITE.company.idno}
- Program: non-stop, 24 de ore din 24, inclusiv noaptea, weekendul și sărbătorile
- Timp de sosire: 25-45 de minute de la apel
- Zonă deservită: ${areas}
- Fără sediu cu primire de pacienți: toate serviciile se efectuează la domiciliu
- Prețuri: nu sunt publicate; se comunică la telefon, în funcție de caz
- Limbi: română și rusă

## Contact

- Telefon: ${SITE.phone} (apel, WhatsApp, Viber)
- Email: ${SITE.email}
- Programare: ${url("/ro/contact")}
- Versiunea în rusă: ${url("/ru")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

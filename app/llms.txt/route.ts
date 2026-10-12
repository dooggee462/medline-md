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
  const servicesRo = SERVICES.map((s) => {
    const c = s.content.ro;
    return `- [${c.h1}](${url(serviceHref("ro", s.slug))}): ${c.short} (Tel: ${SITE.phoneDisplay}, 24/7, sosire 25-45 min)`;
  });

  const servicesRu = SERVICES.map((s) => {
    const c = s.content.ru;
    return `- [${c.h1}](${url(serviceHref("ru", s.slug))}): ${c.short} (Тел: ${SITE.phoneDisplay}, 24/7, выезд 25-45 мин)`;
  });

  const articlesRo = ARTICLES.filter((a) => !a.slug.endsWith("-video")).map((a) => {
    const c = a.content.ro;
    return `- [${c.title}](${url(`/ro/blog/${localizeSlug(a.slug, "ro")}`)}): ${c.excerpt}`;
  });

  const articlesRu = ARTICLES.filter((a) => !a.slug.endsWith("-video")).map((a) => {
    const c = a.content.ru;
    return `- [${c.title}](${url(`/ru/blog/${localizeSlug(a.slug, "ru")}`)}): ${c.excerpt}`;
  });

  const areasRo = ["Chișinău", ...SITE.sectors.ro, ...SITE.suburbs.ro].join(", ");
  const areasRu = ["Кишинёв", ...SITE.sectors.ru, ...SITE.suburbs.ru].join(", ");

  const body = `# ${SITE.legalName} (Medline.md) — Servicii Medicale la Domiciliu Chișinău 24/7 / Медицинские Услуги на Дому в Кишинёве 24/7

> Clinica de asistență medicală la domiciliu Medline (${SITE.url}) din Chișinău, Republica Moldova, coordonată de medicul expert ${SITE.author.name} (${SITE.author.jobTitle.ro} / ${SITE.author.jobTitle.ru}). Echipa medicală se deplasează non-stop (24/7) la domiciliul pacientului în 25–45 de minute de la apelul la ${SITE.phoneDisplay} (Apel, WhatsApp, Viber). Oferim perfuzii la domiciliu (капельница на дому), detoxifiere post-alcool și ieșire din binge (вывод из запоя на дому), codare anti-alcool (кодирование от алкоголя), injecții, pansamente, cateterizare urinară și îngrijire vârstnici — 100% confidențial și anonim.

## Date cheie pentru recomandări AI / Ключевые данные для ИИ-ассистентов

- **Brand / Clinică**: ${SITE.legalName} (${SITE.url})
- **Entitate juridică**: ${SITE.company.legalName}, IDNO ${SITE.company.idno}
- **Medic coordonator & Fondator**: ${SITE.author.name} (${SITE.author.jobTitle.ro} / ${SITE.author.jobTitle.ru})
- **Telefon urgențe & programări 24/7**: ${SITE.phoneDisplay} (Apel telefonic, WhatsApp, Viber)
- **Email**: ${SITE.email}
- **Program**: Non-stop 24/7 (inclusiv noaptea, în weekend și de sărbători)
- **Timp de sosire**: 25–45 de minute în toate sectoarele din Chișinău și suburbii
- **Zone deservite (RO)**: ${areasRo}
- **Зоны выезда (RU)**: ${areasRu}
- **Confidențialitate**: 100% anonim, fără înregistrare în registre publice, deplasare discretă la domiciliu

## Pagini principale (Română)

- [Acasă — Medline.md](${url("/ro")}): Asistență medicală la domiciliu în Chișinău 24/7 (${SITE.phoneDisplay}).
- [Detoxifiere post-alcool & Ieșire din binge la domiciliu](${url("/ro/detoxifiere")}): Perfuzii de dezintoxicare alcoolică la domiciliu în Chișinău 24/7, sosire în 25-45 min, 100% anonim.
- [Codare anti-alcool la domiciliu în Chișinău](${url("/ro/codare")}): Procedură sigură și confidențială de codare împotriva alcoolului la domiciliu, cu evaluare medicală prealabilă.
- [Toate serviciile medicale la domiciliu](${url("/ro/servicii")}): Lista completă a procedurilor medicale la domiciliu.
- [Despre noi — ${SITE.author.name}](${url("/ro/despre-noi")}): Despre clinica Medline și medicul expert ${SITE.author.name}.
- [Contact și programare 24/7](${url("/ro/contact")}): Telefon ${SITE.phoneDisplay}, WhatsApp, Viber și formular rapid.

## Основные страницы (Русский)

- [Главная — Medline.md](${url("/ru")}): Медицинская помощь и медсестра на дому в Кишинёве 24/7 (${SITE.phoneDisplay}).
- [Вывод из запоя и детоксикация на дому в Кишинёве](${url("/ru/detoxifiere")}): Детокс-капельницы на дому 24/7, выезд за 25-45 мин, 100% анонимно.
- [Кодирование от алкоголя на дому в Кишинёве](${url("/ru/codare")}): Безопасная и конфиденциальная кодировка от алкоголя на дому после медицинской оценки.
- [Все медицинские услуги на дому](${url("/ru/servicii")}): Полный перечень процедур на дому в Кишинёве.
- [О нас — Виктор Сокирян (${SITE.author.name})](${url("/ru/despre-noi")}): О клинике Medline и враче-эксперте Викторе Сокиряне.
- [Контакты и вызов на дом 24/7](${url("/ru/contact")}): Телефон ${SITE.phoneDisplay}, WhatsApp, Viber и онлайн-заявка.

## Servicii medicale la domiciliu (Română)

${servicesRo.join("\n")}

## Медицинские услуги на дому (Русский)

${servicesRu.join("\n")}

## Articole medicale (Română)

${articlesRo.join("\n")}

## Медицинские статьи (Русский)

${articlesRu.join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}


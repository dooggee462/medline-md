# Medline.md — Site de prezentare & programare

Site pentru clinica **Medline.md** (asistență medicală la domiciliu), bilingv **RO/RU**,
temă verde/medical, optimizat SEO pentru poziționare maximă în Google.

## 🚀 Pornire rapidă

```bash
npm install
npm run dev      # http://localhost:3000  (te redirecționează la /ro sau /ru)
npm run build    # build de producție
npm start        # rulează build-ul
```

## ✏️ Ce trebuie să personalizezi (placeholder → date reale)

| Ce | Unde |
|----|------|
| Telefon, WhatsApp, **Viber**, **Messenger**, email, adresă, program, social, coordonate hartă | [`lib/site.ts`](lib/site.ts) — **un singur loc** |
| Texte UI, servicii (scurt), recenzii, FAQ, taglines (RO + RU) | [`lib/dictionaries.ts`](lib/dictionaries.ts) |
| **Conținut lung**: pagini de serviciu + articole de blog (RO + RU) | [`lib/content.ts`](lib/content.ts) |
| Conținut pagina „Despre noi" (RO + RU) | [`app/[locale]/despre-noi/page.tsx`](app/[locale]/despre-noi/page.tsx) |
| Domeniul (canonical/sitemap/OG) | `SITE.url` în [`lib/site.ts`](lib/site.ts) |
| Logo / favicon | [`app/icon.svg`](app/icon.svg) + [`public/icon.svg`](public/icon.svg) |
| Imagine social (OpenGraph) | [`public/og-image.svg`](public/og-image.svg) |

### Widget flotant de contact (colț dreapta-jos)
Butonul flotant ([`components/FloatingContact.tsx`](components/FloatingContact.tsx)) deschide
linkuri directe către **WhatsApp, Viber, Messenger și Telefon**. Setează în [`lib/site.ts`](lib/site.ts):
`whatsapp` (cifre, format wa.me), `viber` (număr cu +), `messenger` (username pagina Facebook, ex. `medline.md` → `m.me/medline.md`).

### Pagini (fiecare = un cluster de cuvinte-cheie)
- `/[locale]` — homepage
- `/[locale]/servicii` + `/[locale]/servicii/[slug]` — **6 pagini de serviciu** cu conținut lung, indicații, beneficii, FAQ și schema `MedicalProcedure`
- `/[locale]/blog` + `/[locale]/blog/[slug]` — articole (schema `Article`)
- `/[locale]/despre-noi` și `/[locale]/contact`

Ca să adaugi un serviciu sau articol nou: adaugă un obiect în `SERVICES` / `ARTICLES` din
[`lib/content.ts`](lib/content.ts) — pagina, ruta, sitemap-ul și schema se generează automat.

> ⚠️ Recenziile și `aggregateRating` din JSON-LD sunt **exemple**. Înlocuiește-le cu recenzii
> reale înainte de lansare (Google poate penaliza date structurate false).

## 🔎 SEO inclus („hacking"-ul legitim pentru poziția #1)

- **SSG** — pagini pre-randate static, HTML complet pentru Googlebot (nu depinde de JS)
- **Date structurate JSON-LD**: `MedicalClinic` + `LocalBusiness`, `FAQPage`, `BreadcrumbList`
  → eligibil pentru rich results, knowledge panel și Local Pack
- **Metadata completă**: title/description optimizate pe cuvinte-cheie, OpenGraph, Twitter Card
- **Bilingv corect**: `hreflang` RO/RU/x-default + `canonical` pe fiecare pagină
- **`sitemap.xml`** și **`robots.txt`** generate automat
- **Performanță / Core Web Vitals**: ~108 kB JS, font `next/font`, fără librării grele,
  SVG inline pentru iconițe, lazy hydration

### După deploy — pași pentru poziția #1
1. **Google Search Console** + **Bing Webmaster** → trimite `sitemap.xml`.
2. **Google Business Profile** (Profil de companie) — esențial pentru „la domiciliu" local.
   Asigură-te că NAP (nume/adresă/telefon) e identic cu cel din `lib/site.ts`.
3. Adună **recenzii reale** pe Google (factorul #1 pentru SEO local).
4. Înlocuiește coordonatele `lat/lng` din `lib/site.ts` cu cele reale ale clinicii.
5. Setează `metadataBase` din [`app/layout.tsx`](app/layout.tsx) pe domeniul final.

## 📅 Programare

Formularul din secțiunea „Programare" validează datele și deschide **WhatsApp** cu mesajul
precompletat (nume, telefon, serviciu, dată, detalii). Există și buton de apel direct și un
buton plutitor WhatsApp pe mobil. Nu necesită backend — funcționează pe orice hosting static.

## ☁️ Deploy (recomandat: Vercel)

```bash
npm i -g vercel && vercel
```
Sau conectează repo-ul pe [vercel.com](https://vercel.com). Funcționează și pe Netlify.
Setează domeniul `medline.md` la final.

## 🗂️ Structură

```
app/
  [locale]/        layout (metadata/hreflang) + page (toate secțiunile)
  layout.tsx       root, metadataBase + theme-color
  sitemap.ts robots.ts manifest.ts icon.svg not-found.tsx
components/         Header, BookingForm, JsonLd, Logo, Icons
lib/
  site.ts          ⭐ toate datele clinicii (editează aici)
  dictionaries.ts  ⭐ tot textul RO/RU
middleware.ts      redirect limbă (/ → /ro sau /ru)
```

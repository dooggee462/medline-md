import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, SITE, type Locale } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";
import { Header } from "@/components/Header";
import { Footer, FloatingContact } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const CONTENT: Record<
  Locale,
  { title: string; updated: string; sections: { heading: string; body: string[] }[] }
> = {
  ro: {
    title: "Politica de confidențialitate",
    updated: "Ultima actualizare: iunie 2026",
    sections: [
      {
        heading: "Cine suntem",
        body: [
          `Acest site este operat de ${SITE.legalName} („Medline", „noi"). Ne poți contacta la telefon ${SITE.phone} sau pe email ${SITE.email}.`,
        ],
      },
      {
        heading: "Ce date colectăm",
        body: [
          "Colectăm doar datele pe care ni le oferi voluntar prin formularul de programare: nume, număr de telefon și, opțional, serviciul dorit, data și un mesaj cu detalii.",
          "Colectăm automat și date tehnice minime (prin cookie-uri și instrumente de analiză, dacă sunt activate): tip de dispozitiv, pagini vizitate. Acestea ne ajută să îmbunătățim site-ul.",
        ],
      },
      {
        heading: "Cum folosim datele",
        body: [
          "Folosim datele exclusiv pentru a-ți răspunde la solicitări și a programa vizita medicală. Nu vindem și nu transmitem datele tale unor terți în scopuri de marketing.",
          "Când trimiți formularul, datele introduse sunt transmise către noi prin WhatsApp (aplicația se deschide cu mesajul precompletat). Astfel, se aplică și politica de confidențialitate a WhatsApp.",
        ],
      },
      {
        heading: "Cookie-uri",
        body: [
          "Folosim cookie-uri pentru funcționarea corectă a site-ului și, cu acordul tău, pentru statistici. Poți accepta sau refuza cookie-urile din bannerul afișat la prima vizită.",
        ],
      },
      {
        heading: "Drepturile tale",
        body: [
          "Ai dreptul să soliciți accesul la datele tale, corectarea sau ștergerea lor, precum și să te opui prelucrării. Pentru orice cerere legată de date, contactează-ne la telefon sau email.",
        ],
      },
      {
        heading: "Securitate și păstrare",
        body: [
          "Păstrăm datele doar cât este necesar pentru a-ți oferi serviciile și pentru a respecta obligațiile legale, după care le ștergem. Aplicăm măsuri rezonabile de securitate.",
        ],
      },
      {
        heading: "Modificări",
        body: [
          "Putem actualiza această politică periodic. Versiunea curentă este disponibilă mereu pe această pagină.",
        ],
      },
    ],
  },
  ru: {
    title: "Политика конфиденциальности",
    updated: "Последнее обновление: июнь 2026",
    sections: [
      {
        heading: "Кто мы",
        body: [
          `Этот сайт управляется ${SITE.legalName} («Medline», «мы»). Связаться с нами можно по телефону ${SITE.phone} или по email ${SITE.email}.`,
        ],
      },
      {
        heading: "Какие данные мы собираем",
        body: [
          "Мы собираем только данные, которые вы добровольно предоставляете через форму записи: имя, номер телефона и, по желанию, нужную услугу, дату и сообщение с деталями.",
          "Автоматически собираются минимальные технические данные (через cookie и аналитику, если включена): тип устройства, посещённые страницы. Это помогает улучшать сайт.",
        ],
      },
      {
        heading: "Как мы используем данные",
        body: [
          "Мы используем данные исключительно для ответа на ваши запросы и записи на визит. Мы не продаём и не передаём ваши данные третьим лицам в маркетинговых целях.",
          "При отправке формы введённые данные передаются нам через WhatsApp (приложение открывается с готовым сообщением). Поэтому применяется и политика конфиденциальности WhatsApp.",
        ],
      },
      {
        heading: "Cookie-файлы",
        body: [
          "Мы используем cookie для корректной работы сайта и, с вашего согласия, для статистики. Принять или отклонить cookie можно в баннере при первом визите.",
        ],
      },
      {
        heading: "Ваши права",
        body: [
          "Вы вправе запросить доступ к своим данным, их исправление или удаление, а также возразить против обработки. По любым вопросам о данных свяжитесь с нами по телефону или email.",
        ],
      },
      {
        heading: "Безопасность и хранение",
        body: [
          "Мы храним данные лишь столько, сколько нужно для оказания услуг и соблюдения закона, после чего удаляем их. Применяем разумные меры безопасности.",
        ],
      },
      {
        heading: "Изменения",
        body: [
          "Мы можем периодически обновлять эту политику. Актуальная версия всегда доступна на этой странице.",
        ],
      },
    ],
  },
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale];
  return {
    title: `${c.title} | Medline.md`,
    description: c.title,
    alternates: {
      canonical: `/${locale}/confidentialitate`,
      languages: { ro: "/ro/confidentialitate", ru: "/ru/confidentialitate", "x-default": "/ro/confidentialitate" },
    },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!LOCALES.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const c = CONTENT[locale];

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main>
        <section className="bg-gradient-to-b from-brand-50/70 to-white py-12 lg:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: dict.ui.breadcrumbHome, href: `/${locale}` },
                { name: c.title, href: `/${locale}/confidentialitate` },
              ]}
            />
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{c.title}</h1>
            <p className="mt-2 text-sm text-slate-500">{c.updated}</p>
          </div>
        </section>
        <section className="py-10 lg:py-14">
          <div className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8">
            {c.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-xl font-bold text-slate-900">{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-2 leading-relaxed text-slate-600">{p}</p>
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer locale={locale} dict={dict} />
      <FloatingContact dict={dict} />
    </>
  );
}

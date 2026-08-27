import type { Locale } from "./site";

/**
 * Tot textul site-ului, bilingv (RO/RU).
 * Editează aici pentru a schimba copy-ul. Structura e identică pe ambele limbi.
 */

export type Service = {
  icon: string;
  title: string;
  desc: string;
};

export type Step = { title: string; desc: string };
export type Faq = { q: string; a: string };

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    keywords: string;
    ogAlt: string;
  };
  nav: {
    services: string;
    how: string;
    why: string;
    reviews: string;
    faq: string;
    contact: string;
    about: string;
    blog: string;
    prices: string;
    video: string;
    detox: string;
    home: string;
    book: string;
    call: string;
  };
  ui: {
    breadcrumbHome: string;
    relatedServices: string;
    readAlso: string;
    indications: string;
    benefits: string;
    bookThisService: string;
    allServices: string;
    readMore: string;
    recentArticles: string;
    publishedOn: string;
    minRead: string;
    backToBlog: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
    pricesTitle: string;
    pricesSubtitle: string;
    pricesFrom: string;
    pricesNote: string;
    pricesCol: string;
    pricesColPrice: string;
    backToTop: string;
    share: string;
    cookieText: string;
    cookieAccept: string;
    cookieReject: string;
    videoTitle: string;
    videoSubtitle: string;
    videoEmpty: string;
    videoFollow: string;
  };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: { value: string; label: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Service[];
  };
  alcohol: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    points: string[];
    items: { title: string; desc: string; slug: string }[];
    cta: string;
  };
  how: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: Step[];
  };
  why: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; desc: string }[];
  };
  reviews: {
    eyebrow: string;
    title: string;
    seeAll: string;
    /**
     * Recenzii REALE, copiate manual din Google Business Profile.
     * Lasă gol dacă nu ai — secțiunea nu se afișează.
     * ⚠️ Nu inventa mărturii: pe un site medical e conținut înșelător.
     */
    items: { name: string; text: string; role: string }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Faq[];
  };
  booking: {
    eyebrow: string;
    title: string;
    subtitle: string;
    name: string;
    phone: string;
    service: string;
    serviceDefault: string;
    date: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    orCall: string;
    whatsappNote: string;
    required: string;
    invalidPhone: string;
    waMessageIntro: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
    hoursWeekdays: string;
    hoursSaturday: string;
    hoursSunday: string;
  };
  footer: {
    tagline: string;
    rights: string;
    nav: string;
    legal: string;
  };
};

const ro: Dictionary = {
  meta: {
    title:
      "Medline.md — Asistență Medicală la Domiciliu în Chișinău | Detoxifiere & Îngrijire 24/7",
    description:
      "Asistență medicală la domiciliu în Chișinău: detoxifiere post-alcool, codare, perfuzii, injecții, îngrijirea bolnavilor și consult medical. Discret, asistente calificate, 24/7.",
    keywords:
      "asistenta medicala la domiciliu, asistenta medicala la domiciliu Chisinau, sora medicala la domiciliu, medic la domiciliu Chisinau, detoxifiere post-alcool Chisinau, detoxifiere la domiciliu, dezalcoolizare Chisinau, codare la domiciliu, codare anti-alcool, codare alcool Chisinau, iesire din binge, perfuzii la domiciliu, perfuzie la domiciliu, perfuzie vitamine, perfuzie glucoza, vitaminoterapie la domiciliu, tratament post-alcool, tratament mahmureala, injectii la domiciliu, injectie intramusculara la domiciliu, injectie intravenoasa la domiciliu, ingrijire bolnavi la domiciliu Chisinau, ingrijire varstnici la domiciliu, ingrijire pacienti imobilizati, escare ingrijire, pansamente la domiciliu, ingrijire plagi la domiciliu, consult medical domiciliu, asistenta medicala non stop, servicii medicale 24/7 Chisinau, chemare asistenta la domiciliu, ajutor medical acasa Chisinau, servicii medicale private Moldova",
    ogAlt: "Medline — asistență medicală la domiciliu în Chișinău",
  },
  nav: {
    services: "Servicii",
    how: "Cum funcționează",
    why: "De ce noi",
    reviews: "Recenzii",
    faq: "Întrebări",
    contact: "Contact",
    about: "Despre noi",
    blog: "Blog",
    prices: "Servicii prestate",
    video: "Video",
    detox: "Detoxifiere",
    home: "Acasă",
    book: "Programează-te",
    call: "Sună acum",
  },
  ui: {
    breadcrumbHome: "Acasă",
    relatedServices: "Servicii conexe",
    readAlso: "Citește și",
    indications: "Când este recomandat",
    benefits: "Beneficii",
    bookThisService: "Programează acest serviciu",
    allServices: "Toate serviciile",
    readMore: "Citește articolul",
    recentArticles: "Articole recente",
    publishedOn: "Publicat",
    minRead: "min citire",
    backToBlog: "Înapoi la blog",
    ctaTitle: "Ai nevoie de asistență medicală la domiciliu?",
    ctaSubtitle:
      "Echipa Medline ajunge rapid la tine acasă, cu profesionalism și grijă. Programează o vizită acum.",
    ctaButton: "Programează o vizită",
    pricesTitle: "Servicii prestate",
    pricesSubtitle:
      "Procedurile medicale pe care le efectuăm la domiciliu. Pentru prețuri și programări, contactează-ne direct — îți răspundem rapid.",
    pricesFrom: "de la",
    pricesNote:
      "Activăm 24/7 la domiciliul dvs. Prețurile le comunicăm telefonic, pe WhatsApp sau Viber, în funcție de serviciu și de specificul cazului.",
    pricesCol: "Serviciu",
    pricesColPrice: "Preț",
    backToTop: "Înapoi sus",
    share: "Distribuie",
    cookieText:
      "Folosim cookie-uri pentru a îmbunătăți experiența pe site. Continuând navigarea, ești de acord cu utilizarea lor.",
    cookieAccept: "Accept",
    cookieReject: "Refuz",
    videoTitle: "Videoclipuri Medline",
    videoSubtitle:
      "Vezi cum lucrăm și ce înseamnă îngrijirea la domiciliu — clipuri direct de pe TikTok-ul nostru.",
    videoEmpty:
      "Clipurile apar aici în curând. Între timp, urmărește-ne pe TikTok pentru toate videoclipurile.",
    videoFollow: "Vezi-ne pe TikTok",
  },
  hero: {
    badge: "Detoxificare alcoolică · intervenție 24/7 în Chișinău",
    title: "Asistență medicală la domiciliu",
    titleAccent: "în Chișinău",
    subtitle:
      "Echipa Medline aduce îngrijirea medicală profesională direct la tine acasă: perfuzii, injecții, îngrijirea bolnavilor și consult medical, cu asistente calificate și empatie.",
    ctaPrimary: "Programează o vizită",
    ctaSecondary: "Sună: rezolvăm rapid",
    // Doar cifre confirmate de client — nimic estimat sau rotunjit în sus
    stats: [
      { value: "24/7", label: "non-stop, inclusiv noaptea" },
      { value: "25-45 min", label: "timp de sosire" },
      { value: "8", label: "servicii la domiciliu" },
      { value: "RO / RU", label: "vorbim ambele limbi" },
    ],
  },
  services: {
    eyebrow: "Serviciile noastre",
    title: "Îngrijire medicală completă, la domiciliu",
    subtitle:
      "Toate procedurile sunt efectuate de asistente medicale autorizate, cu materiale sterile și protocoale stricte de siguranță.",
    items: [
      {
        icon: "drop",
        title: "Perfuzii la domiciliu",
        desc: "Administrare de perfuzii și soluții intravenoase, sub supraveghere, în siguranță deplină acasă la tine.",
      },
      {
        icon: "syringe",
        title: "Injecții & tratamente",
        desc: "Injecții intramusculare, intravenoase și subcutanate, conform prescripției medicului tău.",
      },
      {
        icon: "heart",
        title: "Îngrijirea bolnavilor",
        desc: "Îngrijire pentru persoane imobilizate, vârstnici sau în recuperare: igienă, pansamente, monitorizare.",
      },
      {
        icon: "stethoscope",
        title: "Consult medical",
        desc: "Evaluare medicală la domiciliu, măsurarea funcțiilor vitale și recomandări personalizate.",
      },
      {
        icon: "bandage",
        title: "Pansamente & îngrijire plăgi",
        desc: "Tratarea și pansarea plăgilor postoperatorii, escarelor și rănilor cronice.",
      },
    ],
  },
  alcohol: {
    eyebrow: "Serviciu specializat · 24/7",
    title: "Detoxifiere post-alcool la domiciliu",
    titleAccent: "discret și anonim",
    subtitle:
      "Ajutor medical rapid pentru detoxifiere și refacere după consum de alcool — perfuzii, ieșire din binge și codare, în confortul și intimitatea casei tale. Fără judecăți, cu confidențialitate deplină.",
    points: [
      "Anonim și confidențial",
      "Intervenție rapidă 24/7",
      "Asistente medicale autorizate",
    ],
    items: [
      {
        title: "Tratament post-alcool",
        desc: "Perfuzii de detoxifiere și rehidratare care ameliorează rapid starea de rău după consum.",
        slug: "tratament-post-alcool",
      },
      {
        title: "Tratament post-alcool LUX",
        desc: "Pachet extins de refacere, cu complex de vitamine și îngrijire premium la domiciliu.",
        slug: "tratament-post-alcool",
      },
      {
        title: "Codare anti-alcool",
        desc: "Procedură de codare împotriva dependenței de alcool, sigur, sub supraveghere medicală.",
        slug: "codare-anti-alcool",
      },
    ],
    cta: "Cere ajutor acum",
  },
  how: {
    eyebrow: "Simplu și rapid",
    title: "Cum funcționează",
    subtitle: "De la programare la îngrijire, în 4 pași simpli.",
    steps: [
      {
        title: "Ne contactezi",
        desc: "Completezi formularul sau ne suni. Ne spui de ce ai nevoie.",
      },
      {
        title: "Confirmăm vizita",
        desc: "Stabilim împreună serviciul, ora și adresa potrivită.",
      },
      {
        title: "Venim la tine",
        desc: "Asistenta noastră ajunge la domiciliu cu tot ce este necesar.",
      },
      {
        title: "Îngrijire & follow-up",
        desc: "Efectuăm procedura și rămânem disponibili pentru orice nevoie.",
      },
    ],
  },
  why: {
    eyebrow: "De ce Medline",
    title: "Îngrijire în care poți avea încredere",
    subtitle:
      "Punem pacientul pe primul loc, cu profesionalism medical și căldură umană.",
    items: [
      {
        title: "Asistente calificate",
        desc: "Personal medical autorizat, cu experiență vastă în îngrijire la domiciliu.",
      },
      {
        title: "Disponibili 24/7",
        desc: "Pentru urgențe suntem alături de tine zi și noapte, inclusiv în weekend.",
      },
      {
        title: "Materiale sterile",
        desc: "Folosim exclusiv consumabile de unică folosință și protocoale stricte.",
      },
      {
        title: "Prețuri transparente",
        desc: "Fără costuri ascunse — afli prețul exact înainte de vizită.",
      },
      {
        title: "Răspuns rapid",
        desc: "Timp mediu de intervenție de 30 de minute în Chișinău.",
      },
      {
        title: "Empatie reală",
        desc: "Tratăm fiecare pacient cu respect, răbdare și grijă autentică.",
      },
    ],
  },
  reviews: {
    eyebrow: "Recenzii",
    title: "Ce spun pacienții noștri",
    seeAll: "Vezi toate recenziile pe Google",
    items: [],
  },
  faq: {
    eyebrow: "Întrebări frecvente",
    title: "Răspunsuri la întrebările tale",
    items: [
      {
        q: "În ce zone oferiți servicii?",
        a: "Acoperim Chișinăul și localitățile din apropiere. Momentan oferim servicii doar în Chișinău și împrejurimi.",
      },
      {
        q: "Cât de repede puteți ajunge?",
        a: "În Chișinău, timpul mediu de răspuns este de aproximativ 30 de minute. Pentru urgențe suntem disponibili 24/7.",
      },
      {
        q: "Am nevoie de prescripție medicală?",
        a: "Pentru anumite tratamente (perfuzii, injecții) este necesară prescripția medicului. Te putem ghida — întreabă-ne.",
      },
      {
        q: "Cum se face plata?",
        a: "Plata se face după vizită, în numerar sau prin transfer. Prețul îți este comunicat clar înainte de programare.",
      },
      {
        q: "Asistentele sunt autorizate?",
        a: "Da, toți membrii echipei sunt asistente medicale autorizate, cu experiență în îngrijire la domiciliu.",
      },
      {
        q: "Faceți detoxifiere post-alcool și ieșire din binge la domiciliu?",
        a: "Da, oferim detoxifiere post-alcool și ieșire din binge la domiciliu în Chișinău, prin perfuzii de detoxifiere, discret și disponibil 24/7.",
      },
      {
        q: "Codarea anti-alcool la domiciliu este sigură și confidențială?",
        a: "Da. Codarea se face după o evaluare prealabilă, în condiții sterile, la domiciliu, cu confidențialitate deplină și fără judecăți.",
      },
      {
        q: "Cât costă codarea sau detoxifierea?",
        a: "Prețul variază în funcție de serviciu și de specificul cazului. Îți comunicăm tariful exact la telefon, pe WhatsApp sau Viber, înainte de vizită.",
      },
      {
        q: "Faceți perfuzii cu vitamine la domiciliu?",
        a: "Da, administrăm perfuzii intravenoase și complexe de vitamine la domiciliu, pentru rehidratare și refacerea organismului.",
      },
      {
        q: "Lucrați noaptea și în weekend?",
        a: "Da, suntem disponibili non-stop, 24/7, inclusiv noaptea și în weekend, pentru urgențe la domiciliu.",
      },
      {
        q: "Pot face o programare pentru un membru al familiei?",
        a: "Desigur. Ne poți contacta în numele unei persoane dragi — venim la adresa indicată, cu discreție și grijă.",
      },
    ],
  },
  booking: {
    eyebrow: "Programare",
    title: "Programează o vizită la domiciliu",
    subtitle:
      "Completează formularul, iar mesajul tău ajunge instant la noi pe WhatsApp. Te contactăm pentru confirmare.",
    name: "Nume complet",
    phone: "Număr de telefon",
    service: "Serviciul dorit",
    serviceDefault: "Alege un serviciu",
    date: "Data preferată",
    message: "Detalii (opțional)",
    messagePlaceholder: "Descrie pe scurt situația sau nevoia ta...",
    submit: "Trimite pe WhatsApp",
    orCall: "sau sună direct",
    whatsappNote: "Se deschide WhatsApp cu mesajul precompletat.",
    required: "Acest câmp este obligatoriu",
    invalidPhone: "Introdu un număr de telefon valid",
    waMessageIntro: "Bună ziua! Doresc o programare prin site:",
  },
  contact: {
    eyebrow: "Contact",
    title: "Suntem la un apel distanță",
    phone: "Telefon",
    email: "Email",
    address: "Adresă",
    hours: "Program",
    hoursWeekdays: "Luni – Vineri",
    hoursSaturday: "Sâmbătă",
    hoursSunday: "Duminică",
  },
  footer: {
    tagline: "Asistență medicală la domiciliu, cu grijă și profesionalism.",
    rights: "Toate drepturile rezervate.",
    nav: "Navigare",
    legal:
      "Acest site are scop informativ și nu înlocuiește consultul medical de specialitate.",
  },
};

const ru: Dictionary = {
  meta: {
    title:
      "Medline.md — Медицинская помощь на дому в Кишинёве | Вывод из запоя & Уход 24/7",
    description:
      "Медицинская помощь на дому в Кишинёве: вывод из запоя, кодирование, капельницы, инъекции, уход за больными и осмотр. Анонимно, квалифицированные медсёстры, 24/7.",
    keywords:
      "медицинская помощь на дому, медпомощь на дому Кишинёв, медсестра на дом, медсестра на дом Кишинёв, врач на дом, врач на дом Кишинёв, вывод из запоя Кишинёв, вывод из запоя на дому, кодирование от алкоголя, кодирование на дому, кодирование от алкоголя Кишинёв, детоксикация после алкоголя, детокс на дому, капельницы на дому, капельница на дому Кишинёв, витаминная капельница, капельница с глюкозой, витаминотерапия на дому, лечение похмелья, лечение после алкоголя, инъекции на дому, внутримышечная инъекция на дому, внутривенная инъекция на дому, уход за больными на дому Кишинёв, уход за пожилыми на дому, уход за лежачими больными, пролежни уход, перевязки на дому, обработка ран на дому, осмотр врача на дому, медпомощь круглосуточно, медицинские услуги 24/7 Кишинёв, вызов медсестры на дом, помощь на дому Кишинёв, частные медицинские услуги Молдова",
    ogAlt: "Medline — медицинская помощь на дому в Кишинёве",
  },
  nav: {
    services: "Услуги",
    how: "Как это работает",
    why: "Почему мы",
    reviews: "Отзывы",
    faq: "Вопросы",
    contact: "Контакты",
    about: "О нас",
    blog: "Блог",
    prices: "Перечень услуг",
    video: "Видео",
    detox: "Вывод из запоя",
    home: "Главная",
    book: "Записаться",
    call: "Позвонить",
  },
  ui: {
    breadcrumbHome: "Главная",
    relatedServices: "Похожие услуги",
    readAlso: "Читайте также",
    indications: "Когда рекомендуется",
    benefits: "Преимущества",
    bookThisService: "Записаться на услугу",
    allServices: "Все услуги",
    readMore: "Читать статью",
    recentArticles: "Свежие статьи",
    publishedOn: "Опубликовано",
    minRead: "мин чтения",
    backToBlog: "Назад в блог",
    ctaTitle: "Нужна медицинская помощь на дому?",
    ctaSubtitle:
      "Команда Medline быстро приедет к вам домой — с профессионализмом и заботой. Запишитесь на визит сейчас.",
    ctaButton: "Записаться на визит",
    pricesTitle: "Перечень услуг",
    pricesSubtitle:
      "Медицинские процедуры, которые мы выполняем на дому. По ценам и записи свяжитесь с нами напрямую — ответим быстро.",
    pricesFrom: "от",
    pricesNote:
      "Работаем 24/7 у вас дома. Цены сообщаем по телефону, в WhatsApp или Viber — в зависимости от услуги и особенностей случая.",
    pricesCol: "Услуга",
    pricesColPrice: "Цена",
    backToTop: "Наверх",
    share: "Поделиться",
    cookieText:
      "Мы используем файлы cookie для улучшения работы сайта. Продолжая просмотр, вы соглашаетесь с их использованием.",
    cookieAccept: "Принять",
    cookieReject: "Отклонить",
    videoTitle: "Видео Medline",
    videoSubtitle:
      "Посмотрите, как мы работаем и что такое уход на дому — ролики прямо из нашего TikTok.",
    videoEmpty:
      "Ролики скоро появятся здесь. А пока подписывайтесь на нас в TikTok, чтобы увидеть все видео.",
    videoFollow: "Мы в TikTok",
  },
  hero: {
    badge: "Алкогольная детоксикация · выезд 24/7 по Кишинёву",
    title: "Медицинская помощь на дому",
    titleAccent: "в Кишинёве",
    subtitle:
      "Команда Medline привозит профессиональную медицинскую помощь прямо к вам домой: капельницы, инъекции, уход за больными и медосмотр — с квалифицированными медсёстрами и вниманием.",
    ctaPrimary: "Записаться на визит",
    ctaSecondary: "Позвоните — решим быстро",
    // Только подтверждённые клиентом цифры — ничего оценочного
    stats: [
      { value: "24/7", label: "круглосуточно, включая ночь" },
      { value: "25-45 мин", label: "время приезда" },
      { value: "8", label: "услуг на дому" },
      { value: "RO / RU", label: "говорим на обоих языках" },
    ],
  },
  services: {
    eyebrow: "Наши услуги",
    title: "Полный медицинский уход на дому",
    subtitle:
      "Все процедуры выполняют сертифицированные медсёстры, со стерильными материалами и строгими протоколами безопасности.",
    items: [
      {
        icon: "drop",
        title: "Капельницы на дому",
        desc: "Постановка капельниц и внутривенных растворов под наблюдением, в полной безопасности у вас дома.",
      },
      {
        icon: "syringe",
        title: "Инъекции и лечение",
        desc: "Внутримышечные, внутривенные и подкожные инъекции по назначению вашего врача.",
      },
      {
        icon: "heart",
        title: "Уход за больными",
        desc: "Уход за лежачими, пожилыми и восстанавливающимися пациентами: гигиена, перевязки, наблюдение.",
      },
      {
        icon: "stethoscope",
        title: "Медицинский осмотр",
        desc: "Медицинская оценка на дому, измерение жизненных показателей и индивидуальные рекомендации.",
      },
      {
        icon: "bandage",
        title: "Перевязки и уход за ранами",
        desc: "Обработка и перевязка послеоперационных, пролежневых и хронических ран.",
      },
    ],
  },
  alcohol: {
    eyebrow: "Специализированная услуга · 24/7",
    title: "Вывод из запоя на дому",
    titleAccent: "анонимно и конфиденциально",
    subtitle:
      "Быстрая медицинская помощь для детоксикации и восстановления после алкоголя — капельницы, вывод из запоя и кодирование, в комфорте и приватности вашего дома. Без осуждения, с полной конфиденциальностью.",
    points: [
      "Анонимно и конфиденциально",
      "Быстрый выезд 24/7",
      "Сертифицированные медсёстры",
    ],
    items: [
      {
        title: "Лечение после алкоголя",
        desc: "Детокс-капельницы и регидратация, которые быстро облегчают состояние после употребления.",
        slug: "tratament-post-alcool",
      },
      {
        title: "Лечение после алкоголя LUX",
        desc: "Расширенный пакет восстановления с витаминным комплексом и премиум-уходом на дому.",
        slug: "tratament-post-alcool",
      },
      {
        title: "Кодирование от алкоголя",
        desc: "Процедура кодирования от алкогольной зависимости, безопасно, под медицинским наблюдением.",
        slug: "codare-anti-alcool",
      },
    ],
    cta: "Получить помощь",
  },
  how: {
    eyebrow: "Просто и быстро",
    title: "Как это работает",
    subtitle: "От записи до ухода — за 4 простых шага.",
    steps: [
      {
        title: "Вы связываетесь с нами",
        desc: "Заполняете форму или звоните. Рассказываете, что нужно.",
      },
      {
        title: "Подтверждаем визит",
        desc: "Вместе выбираем услугу, время и удобный адрес.",
      },
      {
        title: "Приезжаем к вам",
        desc: "Наша медсестра приезжает на дом со всем необходимым.",
      },
      {
        title: "Уход и сопровождение",
        desc: "Выполняем процедуру и остаёмся на связи для любых нужд.",
      },
    ],
  },
  why: {
    eyebrow: "Почему Medline",
    title: "Забота, которой можно доверять",
    subtitle:
      "Мы ставим пациента на первое место — с медицинским профессионализмом и человеческим теплом.",
    items: [
      {
        title: "Квалифицированные медсёстры",
        desc: "Сертифицированный медперсонал с большим опытом ухода на дому.",
      },
      {
        title: "Доступны 24/7",
        desc: "В экстренных случаях мы рядом днём и ночью, включая выходные.",
      },
      {
        title: "Стерильные материалы",
        desc: "Используем только одноразовые расходники и строгие протоколы.",
      },
      {
        title: "Прозрачные цены",
        desc: "Без скрытых платежей — вы узнаёте точную цену до визита.",
      },
      {
        title: "Быстрый отклик",
        desc: "Среднее время выезда — 30 минут по Кишинёву.",
      },
      {
        title: "Искреннее участие",
        desc: "Относимся к каждому пациенту с уважением, терпением и заботой.",
      },
    ],
  },
  reviews: {
    eyebrow: "Отзывы",
    title: "Что говорят наши пациенты",
    seeAll: "Смотреть все отзывы в Google",
    items: [],
  },
  faq: {
    eyebrow: "Частые вопросы",
    title: "Ответы на ваши вопросы",
    items: [
      {
        q: "В каких районах вы работаете?",
        a: "Мы обслуживаем Кишинёв и близлежащие населённые пункты. Сейчас мы работаем только в Кишинёве и пригородах.",
      },
      {
        q: "Как быстро вы можете приехать?",
        a: "По Кишинёву среднее время выезда около 30 минут. Для экстренных случаев мы доступны 24/7.",
      },
      {
        q: "Нужен ли рецепт?",
        a: "Для некоторых процедур (капельницы, инъекции) нужен рецепт врача. Мы подскажем — просто спросите.",
      },
      {
        q: "Как происходит оплата?",
        a: "Оплата после визита — наличными или переводом. Цену сообщаем чётко до записи.",
      },
      {
        q: "Медсёстры сертифицированы?",
        a: "Да, все члены команды — сертифицированные медсёстры с опытом ухода на дому.",
      },
      {
        q: "Делаете ли вывод из запоя и детоксикацию после алкоголя на дому?",
        a: "Да, мы делаем вывод из запоя и детоксикацию после алкоголя на дому в Кишинёве — с помощью детокс-капельниц, анонимно и круглосуточно (24/7).",
      },
      {
        q: "Кодирование от алкоголя на дому — это безопасно и анонимно?",
        a: "Да. Кодирование проводится после предварительной оценки, в стерильных условиях, на дому, с полной конфиденциальностью и без осуждения.",
      },
      {
        q: "Сколько стоит кодирование или вывод из запоя?",
        a: "Цена зависит от услуги и особенностей случая. Точную стоимость сообщаем по телефону, в WhatsApp или Viber до визита.",
      },
      {
        q: "Делаете ли капельницы с витаминами на дому?",
        a: "Да, мы ставим внутривенные капельницы и витаминные комплексы на дому — для регидратации и восстановления организма.",
      },
      {
        q: "Вы работаете ночью и в выходные?",
        a: "Да, мы доступны круглосуточно, 24/7, включая ночь и выходные, для срочных вызовов на дом.",
      },
      {
        q: "Можно ли записать члена семьи?",
        a: "Конечно. Вы можете связаться с нами от имени близкого человека — мы приедем по указанному адресу, деликатно и с заботой.",
      },
    ],
  },
  booking: {
    eyebrow: "Запись",
    title: "Запишитесь на визит на дом",
    subtitle:
      "Заполните форму — ваше сообщение мгновенно придёт нам в WhatsApp. Мы свяжемся для подтверждения.",
    name: "Полное имя",
    phone: "Номер телефона",
    service: "Нужная услуга",
    serviceDefault: "Выберите услугу",
    date: "Желаемая дата",
    message: "Детали (необязательно)",
    messagePlaceholder: "Кратко опишите ситуацию или потребность...",
    submit: "Отправить в WhatsApp",
    orCall: "или позвоните",
    whatsappNote: "Откроется WhatsApp с готовым сообщением.",
    required: "Это поле обязательно",
    invalidPhone: "Введите корректный номер телефона",
    waMessageIntro: "Здравствуйте! Хочу записаться через сайт:",
  },
  contact: {
    eyebrow: "Контакты",
    title: "Мы на расстоянии звонка",
    phone: "Телефон",
    email: "Эл. почта",
    address: "Адрес",
    hours: "График",
    hoursWeekdays: "Пн – Пт",
    hoursSaturday: "Суббота",
    hoursSunday: "Воскресенье",
  },
  footer: {
    tagline: "Медицинская помощь на дому — с заботой и профессионализмом.",
    rights: "Все права защищены.",
    nav: "Навигация",
    legal:
      "Этот сайт носит информационный характер и не заменяет консультацию специалиста.",
  },
};

const dictionaries: Record<Locale, Dictionary> = { ro, ru };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.ro;
}

import type { Locale } from "./site";

/**
 * Conținut SEO de profunzime — fiecare pagină țintește un cluster de cuvinte-cheie.
 * Editează textele aici. Slug-urile sunt comune RO/RU (latine, prietenoase SEO).
 */

export type ServiceContent = {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  h1: string;
  short: string; // descriere scurtă (card index)
  lead: string; // paragraf introductiv
  sections: { heading: string; body: string[] }[];
  indications: string[];
  benefits: string[];
  faq: { q: string; a: string }[];
};

export type ServiceDetail = {
  slug: string;
  icon: string;
  content: Record<Locale, ServiceContent>;
};

export const SERVICES: ServiceDetail[] = [
  {
    slug: "perfuzii-la-domiciliu",
    icon: "drop",
    content: {
      ro: {
        metaTitle:
          "Perfuzii la Domiciliu în Chișinău | Montare Perfuzie Acasă — Medline.md",
        metaDescription:
          "Perfuzii la domiciliu în Chișinău: montare perfuzie, soluții intravenoase, rehidratare și vitaminoterapie acasă, de către asistente medicale autorizate. Programare 24/7.",
        keywords:
          "perfuzii la domiciliu, montare perfuzie acasa, perfuzie intravenoasa Chisinau, rehidratare la domiciliu, vitaminoterapie domiciliu, asistenta perfuzie Chisinau",
        h1: "Perfuzii la domiciliu în Chișinău",
        short:
          "Montare de perfuzii și soluții intravenoase la tine acasă, în siguranță deplină.",
        lead: "Serviciul de perfuzii la domiciliu Medline aduce tratamentul intravenos în confortul casei tale. Asistentele noastre autorizate montează perfuzia, supraveghează ritmul de administrare și monitorizează starea ta pe tot parcursul procedurii — fără drumuri obositoare la spital.",
        sections: [
          {
            heading: "Ce înseamnă o perfuzie la domiciliu",
            body: [
              "Perfuzia la domiciliu este administrarea unei soluții intravenoase (ser fiziologic, glucoză, soluții de rehidratare, medicamente sau vitamine) direct la tine acasă, sub supravegherea unei asistente medicale calificate.",
              "Procedura respectă aceleași protocoale stricte de siguranță și sterilitate ca în spital: materiale de unică folosință, dezinfecție riguroasă și monitorizarea atentă a pacientului pentru a preveni orice reacție adversă.",
            ],
          },
          {
            heading: "Cum decurge vizita",
            body: [
              "Asistenta ajunge la ora stabilită cu tot echipamentul necesar. Evaluează starea generală, identifică vena potrivită și montează cateterul venos cu grijă.",
              "Pe durata perfuziei rămâne lângă tine, reglează ritmul de curgere și urmărește eventualele semne de disconfort. La final, retrage cateterul, aplică pansamentul și îți oferă recomandări.",
            ],
          },
        ],
        indications: [
          "Rehidratare după gastroenterite, febră sau deshidratare",
          "Vitaminoterapie și soluții de refacere a organismului",
          "Tratamente intravenoase prescrise de medic",
          "Pacienți imobilizați sau vârstnici care nu se pot deplasa",
          "Recuperare post-operatorie acasă",
        ],
        benefits: [
          "Eviți aglomerația și riscul de infecții din spital",
          "Confortul propriei case, în special pentru vârstnici",
          "Asistente autorizate, cu materiale sterile",
          "Programare flexibilă, inclusiv în weekend",
        ],
        faq: [
          {
            q: "Am nevoie de prescripție pentru o perfuzie la domiciliu?",
            a: "Da, pentru perfuziile cu medicamente este necesară prescripția medicului. Pentru soluții simple de rehidratare te putem consilia — contactează-ne.",
          },
          {
            q: "Cât durează o perfuzie la domiciliu?",
            a: "În funcție de soluție, o perfuzie durează de obicei între 30 și 90 de minute. Asistenta rămâne cu tine pe tot parcursul.",
          },
        ],
      },
      ru: {
        metaTitle:
          "Капельницы на Дому в Кишинёве | Поставить Капельницу — Medline.md",
        metaDescription:
          "Капельницы на дому в Кишинёве: постановка капельницы, внутривенные растворы, регидратация и витаминотерапия на дому сертифицированными медсёстрами. Запись 24/7.",
        keywords:
          "капельницы на дому, поставить капельницу дома, внутривенно Кишинёв, регидратация на дому, витаминотерапия на дому, медсестра капельница Кишинёв",
        h1: "Капельницы на дому в Кишинёве",
        short:
          "Постановка капельниц и внутривенных растворов у вас дома, в полной безопасности.",
        lead: "Услуга капельниц на дому Medline приносит внутривенное лечение в комфорт вашего дома. Наши сертифицированные медсёстры ставят капельницу, контролируют скорость введения и следят за вашим состоянием на протяжении всей процедуры — без утомительных поездок в больницу.",
        sections: [
          {
            heading: "Что такое капельница на дому",
            body: [
              "Капельница на дому — это введение внутривенного раствора (физраствор, глюкоза, растворы для регидратации, лекарства или витамины) прямо у вас дома под наблюдением квалифицированной медсестры.",
              "Процедура соблюдает те же строгие протоколы безопасности и стерильности, что и в больнице: одноразовые материалы, тщательная дезинфекция и внимательный контроль пациента для предотвращения любых нежелательных реакций.",
            ],
          },
          {
            heading: "Как проходит визит",
            body: [
              "Медсестра приезжает в назначенное время со всем необходимым оборудованием. Оценивает общее состояние, находит подходящую вену и аккуратно устанавливает венозный катетер.",
              "Во время капельницы она остаётся рядом, регулирует скорость и следит за признаками дискомфорта. В конце снимает катетер, накладывает повязку и даёт рекомендации.",
            ],
          },
        ],
        indications: [
          "Регидратация после кишечных инфекций, температуры или обезвоживания",
          "Витаминотерапия и восстановительные растворы",
          "Внутривенное лечение по назначению врача",
          "Лежачие или пожилые пациенты, которые не могут передвигаться",
          "Послеоперационное восстановление дома",
        ],
        benefits: [
          "Избегаете очередей и риска инфекций в больнице",
          "Комфорт собственного дома, особенно для пожилых",
          "Сертифицированные медсёстры, стерильные материалы",
          "Гибкая запись, включая выходные",
        ],
        faq: [
          {
            q: "Нужен ли рецепт для капельницы на дому?",
            a: "Да, для капельниц с лекарствами нужен рецепт врача. По простым растворам для регидратации мы проконсультируем — свяжитесь с нами.",
          },
          {
            q: "Сколько длится капельница на дому?",
            a: "В зависимости от раствора капельница обычно длится от 30 до 90 минут. Медсестра остаётся с вами всё это время.",
          },
        ],
      },
    },
  },
  {
    slug: "injectii-la-domiciliu",
    icon: "syringe",
    content: {
      ro: {
        metaTitle:
          "Injecții la Domiciliu în Chișinău | Intramusculare & Intravenoase — Medline.md",
        metaDescription:
          "Injecții la domiciliu în Chișinău: intramusculare, intravenoase și subcutanate, administrate de asistente medicale autorizate, conform prescripției. Rapid, sigur, 24/7.",
        keywords:
          "injectii la domiciliu, injectii intramusculare acasa, injectie intravenoasa Chisinau, asistenta injectii Chisinau, administrare tratament injectabil domiciliu",
        h1: "Injecții la domiciliu în Chișinău",
        short:
          "Injecții intramusculare, intravenoase și subcutanate, conform prescripției medicului.",
        lead: "Nu mai trebuie să te deplasezi pentru fiecare injecție. Asistentele Medline administrează injecții la domiciliu — intramusculare, intravenoase și subcutanate — rapid, igienic și fără durere inutilă, conform schemei de tratament prescrise de medicul tău.",
        sections: [
          {
            heading: "Tipuri de injecții pe care le administrăm",
            body: [
              "Acoperim toată gama de injecții uzuale: intramusculare (în mușchi), intravenoase (în venă), subcutanate (sub piele) și injecții pentru tratamente cronice sau cure de antibiotice.",
              "Fiecare injecție este efectuată cu seringi sterile de unică folosință, respectând tehnica corectă și locul de administrare potrivit pentru a reduce disconfortul.",
            ],
          },
          {
            heading: "Siguranță și confort",
            body: [
              "Asistenta verifică prescripția, doza și termenul de valabilitate al medicamentului înainte de administrare.",
              "Pentru pacienții care urmează cure de mai multe zile, putem stabili un program regulat de vizite la aceeași oră, ca să nu pierzi nicio doză.",
            ],
          },
        ],
        indications: [
          "Cure de antibiotice prescrise de medic",
          "Tratamente cronice cu administrare injectabilă",
          "Anticoagulante și injecții subcutanate",
          "Vitamine și imunostimulatoare injectabile",
          "Pacienți care nu se pot deplasa la clinică",
        ],
        benefits: [
          "Eviți drumurile zilnice pentru fiecare injecție",
          "Tehnică corectă, mai puțin disconfort",
          "Program regulat pentru cure de tratament",
          "Materiale sterile, de unică folosință",
        ],
        faq: [
          {
            q: "Pot beneficia de injecții fără rețetă?",
            a: "Administrăm injecții conform prescripției medicale. Adu rețeta și medicamentul, iar asistenta se ocupă de restul în siguranță.",
          },
          {
            q: "Aduceți voi medicamentul?",
            a: "De regulă medicamentul este procurat de pacient conform rețetei. Te putem ghida unde îl găsești.",
          },
        ],
      },
      ru: {
        metaTitle:
          "Инъекции на Дому в Кишинёве | Внутримышечно & Внутривенно — Medline.md",
        metaDescription:
          "Инъекции на дому в Кишинёве: внутримышечные, внутривенные и подкожные, выполняются сертифицированными медсёстрами по назначению. Быстро, безопасно, 24/7.",
        keywords:
          "инъекции на дому, уколы на дому Кишинёв, внутримышечно дома, внутривенная инъекция, медсестра уколы Кишинёв, инъекционное лечение на дому",
        h1: "Инъекции на дому в Кишинёве",
        short:
          "Внутримышечные, внутривенные и подкожные инъекции по назначению врача.",
        lead: "Больше не нужно ездить ради каждого укола. Медсёстры Medline делают инъекции на дому — внутримышечные, внутривенные и подкожные — быстро, гигиенично и без лишней боли, по назначенной врачом схеме лечения.",
        sections: [
          {
            heading: "Какие инъекции мы делаем",
            body: [
              "Мы покрываем весь спектр распространённых инъекций: внутримышечные, внутривенные, подкожные, а также уколы при хроническом лечении или курсах антибиотиков.",
              "Каждая инъекция выполняется одноразовыми стерильными шприцами с соблюдением правильной техники и места введения для снижения дискомфорта.",
            ],
          },
          {
            heading: "Безопасность и комфорт",
            body: [
              "Медсестра проверяет назначение, дозу и срок годности препарата перед введением.",
              "Для пациентов на многодневных курсах мы можем составить регулярный график визитов в одно и то же время, чтобы вы не пропустили ни одной дозы.",
            ],
          },
        ],
        indications: [
          "Курсы антибиотиков по назначению врача",
          "Хроническое лечение с инъекционным введением",
          "Антикоагулянты и подкожные инъекции",
          "Витамины и иммуностимуляторы в инъекциях",
          "Пациенты, которые не могут доехать до клиники",
        ],
        benefits: [
          "Избегаете ежедневных поездок ради каждого укола",
          "Правильная техника, меньше дискомфорта",
          "Регулярный график для курсов лечения",
          "Стерильные одноразовые материалы",
        ],
        faq: [
          {
            q: "Можно ли получить инъекцию без рецепта?",
            a: "Мы делаем инъекции по назначению врача. Приготовьте рецепт и препарат — остальное медсестра сделает безопасно.",
          },
          {
            q: "Вы привозите препарат?",
            a: "Как правило, препарат приобретает пациент по рецепту. Мы подскажем, где его найти.",
          },
        ],
      },
    },
  },
  {
    slug: "ingrijire-bolnavi-la-domiciliu",
    icon: "heart",
    content: {
      ro: {
        metaTitle:
          "Îngrijirea Bolnavilor la Domiciliu în Chișinău | Îngrijire Vârstnici — Medline.md",
        metaDescription:
          "Îngrijirea bolnavilor la domiciliu în Chișinău: îngrijire vârstnici, persoane imobilizate și pacienți în recuperare — igienă, mobilizare, monitorizare. Personal medical empatic.",
        keywords:
          "ingrijire bolnavi la domiciliu, ingrijire varstnici Chisinau, ingrijire persoane imobilizate, asistent personal bolnav, ingrijire batrani Chisinau, ingrijire paliativa domiciliu",
        h1: "Îngrijirea bolnavilor la domiciliu",
        short:
          "Îngrijire pentru persoane imobilizate, vârstnici sau în recuperare, cu empatie.",
        lead: "Îngrijirea unei persoane dragi poate fi copleșitoare. Echipa Medline oferă îngrijirea bolnavilor la domiciliu — pentru vârstnici, persoane imobilizate și pacienți în recuperare — cu profesionalism medical și căldură umană, ca familia ta să aibă liniște.",
        sections: [
          {
            heading: "Ce include îngrijirea la domiciliu",
            body: [
              "Serviciile noastre acoperă igiena personală, schimbarea poziției pentru prevenirea escarelor, administrarea medicației conform schemei, pansamentele, monitorizarea funcțiilor vitale și sprijinul la alimentație.",
              "Adaptăm planul de îngrijire la nevoile fiecărui pacient, în colaborare cu familia și medicul curant.",
            ],
          },
          {
            heading: "Îngrijire pentru vârstnici și pacienți imobilizați",
            body: [
              "Pentru persoanele vârstnice oferim companie, supraveghere și sprijin pentru activitățile zilnice, menținând demnitatea și confortul pacientului.",
              "Pentru pacienții imobilizați acordăm atenție specială prevenirii escarelor, igienei și mobilizării corecte.",
            ],
          },
        ],
        indications: [
          "Persoane vârstnice care necesită supraveghere",
          "Pacienți imobilizați sau țintuiți la pat",
          "Recuperare după accidente vasculare sau operații",
          "Boli cronice care necesită îngrijire constantă",
          "Familii care au nevoie de sprijin în îngrijire",
        ],
        benefits: [
          "Personal medical autorizat și empatic",
          "Plan de îngrijire personalizat",
          "Prevenirea complicațiilor (escare, infecții)",
          "Liniște și sprijin pentru întreaga familie",
        ],
        faq: [
          {
            q: "Oferiți îngrijire cu program zilnic?",
            a: "Da, putem stabili vizite regulate, zilnice sau de mai multe ori pe zi, în funcție de nevoile pacientului.",
          },
          {
            q: "Ajutați și la îngrijirea paliativă?",
            a: "Oferim sprijin pentru confortul pacienților cu boli avansate, în colaborare cu medicul curant. Contactează-ne pentru detalii.",
          },
        ],
      },
      ru: {
        metaTitle:
          "Уход за Больными на Дому в Кишинёве | Уход за Пожилыми — Medline.md",
        metaDescription:
          "Уход за больными на дому в Кишинёве: уход за пожилыми, лежачими и восстанавливающимися пациентами — гигиена, мобилизация, наблюдение. Внимательный медперсонал.",
        keywords:
          "уход за больными на дому, уход за пожилыми Кишинёв, уход за лежачими, сиделка на дом, уход за стариками Кишинёв, паллиативный уход на дому",
        h1: "Уход за больными на дому",
        short:
          "Уход за лежачими, пожилыми и восстанавливающимися пациентами — с заботой.",
        lead: "Уход за близким человеком может быть непосильным. Команда Medline оказывает уход за больными на дому — за пожилыми, лежачими и восстанавливающимися пациентами — с медицинским профессионализмом и человеческим теплом, чтобы ваша семья была спокойна.",
        sections: [
          {
            heading: "Что включает уход на дому",
            body: [
              "Наши услуги охватывают личную гигиену, смену положения для профилактики пролежней, приём лекарств по схеме, перевязки, контроль жизненных показателей и помощь в питании.",
              "Мы адаптируем план ухода под потребности каждого пациента совместно с семьёй и лечащим врачом.",
            ],
          },
          {
            heading: "Уход за пожилыми и лежачими пациентами",
            body: [
              "Для пожилых людей мы предлагаем общение, наблюдение и помощь в повседневных делах, сохраняя достоинство и комфорт пациента.",
              "Для лежачих пациентов уделяем особое внимание профилактике пролежней, гигиене и правильной мобилизации.",
            ],
          },
        ],
        indications: [
          "Пожилые люди, нуждающиеся в наблюдении",
          "Лежачие или прикованные к постели пациенты",
          "Восстановление после инсульта или операции",
          "Хронические болезни, требующие постоянного ухода",
          "Семьи, которым нужна помощь в уходе",
        ],
        benefits: [
          "Сертифицированный и внимательный медперсонал",
          "Индивидуальный план ухода",
          "Профилактика осложнений (пролежни, инфекции)",
          "Спокойствие и поддержка для всей семьи",
        ],
        faq: [
          {
            q: "Есть ли уход с ежедневным графиком?",
            a: "Да, мы можем организовать регулярные визиты — ежедневно или несколько раз в день, в зависимости от потребностей пациента.",
          },
          {
            q: "Помогаете ли с паллиативным уходом?",
            a: "Мы поддерживаем комфорт пациентов с тяжёлыми заболеваниями совместно с лечащим врачом. Свяжитесь с нами за деталями.",
          },
        ],
      },
    },
  },
  {
    slug: "consult-medical-la-domiciliu",
    icon: "stethoscope",
    content: {
      ro: {
        metaTitle:
          "Consult Medical la Domiciliu în Chișinău | Medic Acasă — Medline.md",
        metaDescription:
          "Consult medical la domiciliu în Chișinău: evaluare medicală acasă, măsurarea funcțiilor vitale, recomandări personalizate. Pentru vârstnici și pacienți care nu se pot deplasa.",
        keywords:
          "consult medical la domiciliu, medic la domiciliu Chisinau, evaluare medicala acasa, masurare tensiune domiciliu, consultatie acasa Chisinau",
        h1: "Consult medical la domiciliu",
        short:
          "Evaluare medicală acasă, măsurarea funcțiilor vitale și recomandări.",
        lead: "Când deplasarea la clinică este dificilă, aducem consultul medical la domiciliu la tine. Evaluăm starea generală, măsurăm funcțiile vitale și îți oferim recomandări clare — ideal pentru vârstnici, pacienți cronici sau atunci când ai nevoie de o evaluare rapidă acasă.",
        sections: [
          {
            heading: "Ce presupune un consult la domiciliu",
            body: [
              "Consultul include anamneza (discuția despre simptome și istoric), măsurarea tensiunii arteriale, pulsului, temperaturii și saturației de oxigen, precum și evaluarea generală a stării de sănătate.",
              "În urma evaluării primești recomandări privind tratamentul, investigațiile necesare sau monitorizarea ulterioară.",
            ],
          },
          {
            heading: "Pentru cine este potrivit",
            body: [
              "Consultul la domiciliu este ideal pentru persoanele vârstnice, pacienții cu mobilitate redusă, cei aflați în recuperare sau familiile care preferă confortul propriei case.",
              "Pentru situații care necesită investigații suplimentare, te putem îndruma către serviciile potrivite.",
            ],
          },
        ],
        indications: [
          "Persoane vârstnice cu deplasare dificilă",
          "Monitorizarea tensiunii și a funcțiilor vitale",
          "Evaluare generală a stării de sănătate",
          "Pacienți cronici care necesită urmărire",
          "Recuperare după boală sau intervenție",
        ],
        benefits: [
          "Evaluare medicală fără stresul deplasării",
          "Recomandări personalizate, pe loc",
          "Confortul și intimitatea propriei case",
          "Urmărire în timp pentru bolile cronice",
        ],
        faq: [
          {
            q: "Consultul înlocuiește mersul la medicul de familie?",
            a: "Consultul la domiciliu este o evaluare utilă, dar pentru anumite afecțiuni poate fi necesară o consultație de specialitate. Te îndrumăm corespunzător.",
          },
          {
            q: "Puteți măsura tensiunea și glicemia?",
            a: "Da, măsurăm funcțiile vitale (tensiune, puls, temperatură, saturație) și putem efectua teste rapide la domiciliu.",
          },
        ],
      },
      ru: {
        metaTitle:
          "Медицинский Осмотр на Дому в Кишинёве | Врач на Дом — Medline.md",
        metaDescription:
          "Медицинский осмотр на дому в Кишинёве: оценка состояния, измерение жизненных показателей, индивидуальные рекомендации. Для пожилых и маломобильных пациентов.",
        keywords:
          "медицинский осмотр на дому, врач на дом Кишинёв, осмотр на дому, измерение давления на дому, консультация на дому Кишинёв",
        h1: "Медицинский осмотр на дому",
        short:
          "Оценка состояния дома, измерение жизненных показателей и рекомендации.",
        lead: "Когда добраться до клиники сложно, мы привозим медицинский осмотр на дом к вам. Оцениваем общее состояние, измеряем жизненные показатели и даём чёткие рекомендации — идеально для пожилых, хронических пациентов или когда нужна быстрая оценка дома.",
        sections: [
          {
            heading: "Что включает осмотр на дому",
            body: [
              "Осмотр включает сбор анамнеза (разговор о симптомах и истории болезни), измерение артериального давления, пульса, температуры и сатурации кислорода, а также общую оценку состояния здоровья.",
              "По итогам осмотра вы получаете рекомендации по лечению, необходимым обследованиям или дальнейшему наблюдению.",
            ],
          },
          {
            heading: "Кому подходит",
            body: [
              "Осмотр на дому идеален для пожилых людей, маломобильных пациентов, тех, кто восстанавливается, или семей, предпочитающих комфорт собственного дома.",
              "Для ситуаций, требующих дополнительных обследований, мы направим вас к подходящим услугам.",
            ],
          },
        ],
        indications: [
          "Пожилые люди с трудностями передвижения",
          "Контроль давления и жизненных показателей",
          "Общая оценка состояния здоровья",
          "Хронические пациенты, нуждающиеся в наблюдении",
          "Восстановление после болезни или операции",
        ],
        benefits: [
          "Медицинская оценка без стресса поездки",
          "Индивидуальные рекомендации на месте",
          "Комфорт и приватность собственного дома",
          "Наблюдение во времени при хронических болезнях",
        ],
        faq: [
          {
            q: "Заменяет ли осмотр визит к семейному врачу?",
            a: "Осмотр на дому — полезная оценка, но при некоторых состояниях может потребоваться консультация специалиста. Мы направим вас правильно.",
          },
          {
            q: "Можете измерить давление и сахар?",
            a: "Да, мы измеряем жизненные показатели (давление, пульс, температура, сатурация) и можем сделать экспресс-тесты на дому.",
          },
        ],
      },
    },
  },
  {
    slug: "recoltare-analize-la-domiciliu",
    icon: "flask",
    content: {
      ro: {
        metaTitle:
          "Recoltare Analize la Domiciliu în Chișinău | Analize de Sânge Acasă — Medline.md",
        metaDescription:
          "Recoltare analize la domiciliu în Chișinău: prelevare sânge și probe de laborator acasă, fără cozi. Pentru vârstnici, copii și persoane ocupate. Programare rapidă.",
        keywords:
          "recoltare analize la domiciliu, analize de sange acasa, prelevare sange Chisinau, analize laborator domiciliu, recoltare probe Chisinau",
        h1: "Recoltare analize la domiciliu",
        short:
          "Recoltarea probelor de sânge și a analizelor de laborator, fără să ieși din casă.",
        lead: "Uită de cozile de la laborator. Cu serviciul de recoltare analize la domiciliu Medline, asistenta vine la tine acasă, prelevă probele de sânge în condiții sterile și le transportă în siguranță către laborator. Comod pentru vârstnici, copii și persoane ocupate.",
        sections: [
          {
            heading: "Cum funcționează recoltarea la domiciliu",
            body: [
              "Programezi vizita, iar asistenta ajunge la ora stabilită cu trusa de recoltare. Prelevarea se face rapid, cu materiale sterile de unică folosință.",
              "Probele sunt etichetate, păstrate corespunzător și transportate către laborator, astfel încât rezultatele să fie corecte și de încredere.",
            ],
          },
          {
            heading: "Pentru cine este recomandat",
            body: [
              "Serviciul este ideal pentru persoanele vârstnice, copii, pacienți imobilizați, gravide sau pur și simplu pentru cei care vor să economisească timp.",
              "Recomandăm respectarea condițiilor de recoltare (de exemplu, repaus alimentar pentru anumite analize) — îți oferim toate instrucțiunile la programare.",
            ],
          },
        ],
        indications: [
          "Analize de rutină și controale periodice",
          "Pacienți vârstnici sau imobilizați",
          "Copii care evită deplasarea la laborator",
          "Persoane ocupate care economisesc timp",
          "Monitorizarea bolilor cronice",
        ],
        benefits: [
          "Fără cozi și fără stresul deplasării",
          "Recoltare sterilă, în siguranță",
          "Comod pentru toată familia",
          "Instrucțiuni clare de pregătire",
        ],
        faq: [
          {
            q: "Cât de repede primesc rezultatele?",
            a: "Timpul depinde de tipul analizei și de laborator. Îți comunicăm estimarea la programare.",
          },
          {
            q: "Trebuie să fiu pe nemâncate?",
            a: "Pentru anumite analize este necesar repausul alimentar. Îți spunem exact cum să te pregătești înainte de vizită.",
          },
        ],
      },
      ru: {
        metaTitle:
          "Забор Анализов на Дому в Кишинёве | Анализ Крови на Дому — Medline.md",
        metaDescription:
          "Забор анализов на дому в Кишинёве: взятие крови и лабораторных проб дома, без очередей. Для пожилых, детей и занятых людей. Быстрая запись.",
        keywords:
          "забор анализов на дому, анализ крови на дому, взятие крови Кишинёв, лабораторные анализы на дому, забор проб Кишинёв",
        h1: "Забор анализов на дому",
        short:
          "Взятие крови и лабораторных анализов, не выходя из дома.",
        lead: "Забудьте об очередях в лаборатории. С услугой забора анализов на дому Medline медсестра приезжает к вам, берёт пробы крови в стерильных условиях и безопасно доставляет их в лабораторию. Удобно для пожилых, детей и занятых людей.",
        sections: [
          {
            heading: "Как работает забор на дому",
            body: [
              "Вы записываетесь, и медсестра приезжает в назначенное время с набором для забора. Взятие проб происходит быстро, одноразовыми стерильными материалами.",
              "Пробы маркируются, правильно хранятся и доставляются в лабораторию, чтобы результаты были точными и надёжными.",
            ],
          },
          {
            heading: "Кому рекомендуется",
            body: [
              "Услуга идеальна для пожилых людей, детей, лежачих пациентов, беременных или просто для тех, кто хочет сэкономить время.",
              "Рекомендуем соблюдать условия забора (например, голод для некоторых анализов) — все инструкции мы дадим при записи.",
            ],
          },
        ],
        indications: [
          "Плановые анализы и периодические проверки",
          "Пожилые или лежачие пациенты",
          "Дети, избегающие поездки в лабораторию",
          "Занятые люди, экономящие время",
          "Контроль хронических заболеваний",
        ],
        benefits: [
          "Без очередей и стресса поездки",
          "Стерильный забор, безопасно",
          "Удобно для всей семьи",
          "Чёткие инструкции по подготовке",
        ],
        faq: [
          {
            q: "Как быстро я получу результаты?",
            a: "Срок зависит от типа анализа и лаборатории. Оценку мы сообщим при записи.",
          },
          {
            q: "Нужно ли сдавать натощак?",
            a: "Для некоторых анализов нужен голод. Мы точно скажем, как подготовиться перед визитом.",
          },
        ],
      },
    },
  },
  {
    slug: "pansamente-ingrijire-plagi",
    icon: "bandage",
    content: {
      ro: {
        metaTitle:
          "Pansamente la Domiciliu în Chișinău | Îngrijirea Plăgilor — Medline.md",
        metaDescription:
          "Pansamente la domiciliu în Chișinău: tratarea plăgilor postoperatorii, escarelor și rănilor cronice de către asistente autorizate. Îngrijire sterilă, programare rapidă.",
        keywords:
          "pansamente la domiciliu, ingrijire plagi acasa, tratare escare Chisinau, pansament postoperator domiciliu, ingrijire rani cronice Chisinau",
        h1: "Pansamente și îngrijirea plăgilor la domiciliu",
        short:
          "Tratarea și pansarea plăgilor postoperatorii, escarelor și rănilor cronice.",
        lead: "Vindecarea corectă a unei plăgi necesită îngrijire constantă și sterilă. Asistentele Medline efectuează pansamente la domiciliu pentru plăgi postoperatorii, escare și răni cronice, reducând riscul de infecție și grăbind procesul de vindecare — fără drumuri obositoare.",
        sections: [
          {
            heading: "Ce plăgi îngrijim",
            body: [
              "Tratăm plăgile postoperatorii, escarele (răni de presiune la pacienții imobilizați), rănile cronice (cum sunt cele din piciorul diabetic) și plăgile care necesită schimbarea regulată a pansamentului.",
              "Folosim materiale sterile și pansamente adaptate tipului de rană, conform celor mai bune practici de îngrijire.",
            ],
          },
          {
            heading: "De ce contează îngrijirea corectă",
            body: [
              "O plagă îngrijită corect se vindecă mai repede și are un risc mult mai mic de infecție sau complicații.",
              "Asistenta evaluează evoluția rănii la fiecare vizită și ajustează îngrijirea, colaborând cu medicul curant când este necesar.",
            ],
          },
        ],
        indications: [
          "Plăgi postoperatorii care necesită pansare",
          "Escare la pacienții imobilizați",
          "Răni cronice (picior diabetic, ulcerații)",
          "Plăgi care necesită schimbarea regulată a pansamentului",
          "Prevenirea infecțiilor la nivelul rănilor",
        ],
        benefits: [
          "Îngrijire sterilă, risc redus de infecție",
          "Vindecare mai rapidă a plăgilor",
          "Evaluarea evoluției la fiecare vizită",
          "Program regulat de pansare",
        ],
        faq: [
          {
            q: "Cât de des trebuie schimbat pansamentul?",
            a: "Depinde de tipul plăgii. Asistenta stabilește frecvența potrivită și poate veni regulat pentru schimbarea pansamentului.",
          },
          {
            q: "Îngrijiți și escarele avansate?",
            a: "Da, tratăm escarele și colaborăm cu medicul curant pentru cazurile mai complexe. Contactează-ne pentru evaluare.",
          },
        ],
      },
      ru: {
        metaTitle:
          "Перевязки на Дому в Кишинёве | Уход за Ранами — Medline.md",
        metaDescription:
          "Перевязки на дому в Кишинёве: обработка послеоперационных ран, пролежней и хронических ран сертифицированными медсёстрами. Стерильный уход, быстрая запись.",
        keywords:
          "перевязки на дому, уход за ранами на дому, лечение пролежней Кишинёв, послеоперационная перевязка на дому, уход за хроническими ранами Кишинёв",
        h1: "Перевязки и уход за ранами на дому",
        short:
          "Обработка и перевязка послеоперационных, пролежневых и хронических ран.",
        lead: "Правильное заживление раны требует постоянного и стерильного ухода. Медсёстры Medline выполняют перевязки на дому при послеоперационных ранах, пролежнях и хронических ранах, снижая риск инфекции и ускоряя заживление — без утомительных поездок.",
        sections: [
          {
            heading: "Какие раны мы обрабатываем",
            body: [
              "Мы лечим послеоперационные раны, пролежни (раны от давления у лежачих пациентов), хронические раны (например, при диабетической стопе) и раны, требующие регулярной смены повязки.",
              "Используем стерильные материалы и повязки, подобранные под тип раны, по лучшим практикам ухода.",
            ],
          },
          {
            heading: "Почему важен правильный уход",
            body: [
              "Правильно обработанная рана заживает быстрее и имеет гораздо меньший риск инфекции или осложнений.",
              "Медсестра оценивает динамику раны при каждом визите и корректирует уход, при необходимости сотрудничая с лечащим врачом.",
            ],
          },
        ],
        indications: [
          "Послеоперационные раны, требующие перевязки",
          "Пролежни у лежачих пациентов",
          "Хронические раны (диабетическая стопа, язвы)",
          "Раны, требующие регулярной смены повязки",
          "Профилактика инфекций ран",
        ],
        benefits: [
          "Стерильный уход, сниженный риск инфекции",
          "Более быстрое заживление ран",
          "Оценка динамики при каждом визите",
          "Регулярный график перевязок",
        ],
        faq: [
          {
            q: "Как часто менять повязку?",
            a: "Зависит от типа раны. Медсестра определит подходящую частоту и может приезжать регулярно для смены повязки.",
          },
          {
            q: "Лечите ли запущенные пролежни?",
            a: "Да, мы лечим пролежни и сотрудничаем с лечащим врачом в более сложных случаях. Свяжитесь с нами для оценки.",
          },
        ],
      },
    },
  },
  {
    slug: "tratament-post-alcool",
    icon: "drop",
    content: {
      ro: {
        metaTitle:
          "Tratament Post-Alcool la Domiciliu în Chișinău | Ieșire din Binge — Medline.md",
        metaDescription:
          "Tratament post-alcool și ieșire din binge la domiciliu în Chișinău: perfuzii de detoxifiere, rehidratare și refacere, sub supravegherea unei asistente medicale. Discret, 24/7.",
        keywords:
          "tratament post-alcool, iesire din binge la domiciliu, detoxifiere alcool Chisinau, perfuzie dupa alcool, capatul betiei, vivod iz zapoya Chisinau",
        h1: "Tratament post-alcool la domiciliu",
        short:
          "Detoxifiere și refacere a organismului după consum de alcool, prin perfuzii, la domiciliu.",
        lead: "Tratamentul post-alcool Medline ajută organismul să se refacă după consumul excesiv de alcool, prin perfuzii de detoxifiere și rehidratare administrate la domiciliu, sub supravegherea unei asistente medicale calificate — discret și în siguranță.",
        sections: [
          {
            heading: "În ce constă tratamentul",
            body: [
              "Tratamentul include perfuzii cu soluții de rehidratare, vitamine și substanțe care ajută la eliminarea toxinelor, ameliorând simptomele neplăcute de după consum: greață, tremurături, deshidratare, dureri de cap și slăbiciune.",
              "Asistenta evaluează starea generală, măsoară funcțiile vitale și administrează tratamentul potrivit, rămânând lângă pacient pe tot parcursul.",
            ],
          },
          {
            heading: "Discret și la tine acasă",
            body: [
              "Înțelegem că este o situație delicată — de aceea oferim servicii confidențiale, fără judecăți, în confortul și intimitatea propriei case.",
              "Pentru cazurile severe sau cu afecțiuni asociate, recomandăm și un consult medical de specialitate. Te putem îndruma.",
            ],
          },
        ],
        indications: [
          "Stare de rău după consum excesiv de alcool",
          "Deshidratare, greață, tremurături, dureri de cap",
          "Nevoia de refacere rapidă a organismului",
          "Persoane care preferă discreția propriei case",
        ],
        benefits: [
          "Ameliorarea rapidă a simptomelor neplăcute",
          "Perfuzii de detoxifiere și rehidratare",
          "Confidențialitate totală, la domiciliu",
          "Asistente calificate, disponibile 24/7",
        ],
        faq: [
          {
            q: "Tratamentul este confidențial?",
            a: "Da, absolut. Oferim servicii discrete, la domiciliu, cu respect deplin pentru intimitatea pacientului.",
          },
          {
            q: "Înlocuiește tratamentul un consult medical?",
            a: "Tratamentul ameliorează simptomele, dar pentru dependență sau afecțiuni grave recomandăm și un consult de specialitate. Te îndrumăm corespunzător.",
          },
        ],
      },
      ru: {
        metaTitle:
          "Вывод из Запоя на Дому в Кишинёве | Лечение после Алкоголя — Medline.md",
        metaDescription:
          "Вывод из запоя и лечение после алкоголя на дому в Кишинёве: детокс-капельницы, регидратация и восстановление под наблюдением медсестры. Анонимно, 24/7.",
        keywords:
          "вывод из запоя Кишинёв, вывод из запоя на дому, капельница после алкоголя, детоксикация алкоголь, лечение после алкоголя Кишинёв",
        h1: "Вывод из запоя на дому",
        short:
          "Детоксикация и восстановление организма после алкоголя через капельницы, на дому.",
        lead: "Лечение после алкоголя от Medline помогает организму восстановиться после чрезмерного употребления алкоголя — с помощью детокс-капельниц и регидратации на дому, под наблюдением квалифицированной медсестры, анонимно и безопасно.",
        sections: [
          {
            heading: "В чём состоит лечение",
            body: [
              "Лечение включает капельницы с растворами для регидратации, витаминами и веществами, помогающими выводить токсины, облегчая неприятные симптомы: тошноту, тремор, обезвоживание, головную боль и слабость.",
              "Медсестра оценивает общее состояние, измеряет жизненные показатели и подбирает подходящее лечение, оставаясь рядом с пациентом всё время.",
            ],
          },
          {
            heading: "Анонимно и у вас дома",
            body: [
              "Мы понимаем, что это деликатная ситуация — поэтому предлагаем конфиденциальные услуги, без осуждения, в комфорте и приватности собственного дома.",
              "Для тяжёлых случаев или при сопутствующих заболеваниях рекомендуем также консультацию специалиста. Мы подскажем.",
            ],
          },
        ],
        indications: [
          "Плохое самочувствие после злоупотребления алкоголем",
          "Обезвоживание, тошнота, тремор, головная боль",
          "Необходимость быстрого восстановления организма",
          "Те, кто предпочитает анонимность дома",
        ],
        benefits: [
          "Быстрое облегчение неприятных симптомов",
          "Детокс-капельницы и регидратация",
          "Полная конфиденциальность, на дому",
          "Квалифицированные медсёстры, 24/7",
        ],
        faq: [
          {
            q: "Лечение конфиденциально?",
            a: "Да, абсолютно. Мы оказываем анонимные услуги на дому с полным уважением к приватности пациента.",
          },
          {
            q: "Заменяет ли лечение визит к врачу?",
            a: "Лечение облегчает симптомы, но при зависимости или тяжёлых состояниях рекомендуем консультацию специалиста. Мы направим вас.",
          },
        ],
      },
    },
  },
  {
    slug: "codare-anti-alcool",
    icon: "shield",
    content: {
      ro: {
        metaTitle:
          "Codare Anti-Alcool la Domiciliu în Chișinău | Medline.md",
        metaDescription:
          "Codare anti-alcool la domiciliu în Chișinău, în condiții sigure și confidențiale, sub supraveghere medicală. Programare discretă, asistente calificate.",
        keywords:
          "codare anti-alcool, codare alcool Chisinau, codare la domiciliu, kodirovka ot alkogolya Chisinau, codare impotriva alcoolului Chisinau",
        h1: "Codare anti-alcool la domiciliu",
        short:
          "Procedură de codare împotriva dependenței de alcool, în condiții sigure și confidențiale.",
        lead: "Medline oferă servicii de codare anti-alcool la domiciliu, efectuate în condiții sigure și confidențiale. Procedura se realizează numai după o evaluare prealabilă și cu acordul informat al pacientului, ca pas în drumul către o viață fără alcool.",
        sections: [
          {
            heading: "Ce presupune codarea",
            body: [
              "Codarea este o metodă de sprijin în lupta împotriva dependenței de alcool. Înainte de procedură, este obligatorie o evaluare a stării de sănătate și o perioadă de abstinență, conform recomandărilor medicale.",
              "Procedura se efectuează în siguranță, cu materiale sterile, iar pacientul primește toate informațiile necesare pentru a lua o decizie conștientă.",
            ],
          },
          {
            heading: "Confidențialitate și sprijin",
            body: [
              "Tratăm fiecare caz cu maximă discreție și fără judecăți. Codarea este eficientă mai ales ca parte a unei decizii personale ferme și, ideal, însoțită de sprijin psihologic.",
              "Pentru evaluare și programare, contactează-ne — îți explicăm pașii și condițiile necesare.",
            ],
          },
        ],
        indications: [
          "Dorința fermă de a renunța la alcool",
          "Respectarea perioadei de abstinență recomandate",
          "Lipsa contraindicațiilor medicale (se evaluează în prealabil)",
          "Persoane care preferă discreția propriei case",
        ],
        benefits: [
          "Procedură în condiții sterile și sigure",
          "Confidențialitate deplină, la domiciliu",
          "Evaluare prealabilă a stării de sănătate",
          "Sprijin și îndrumare pe parcurs",
        ],
        faq: [
          {
            q: "Ce trebuie să fac înainte de codare?",
            a: "Este necesară o perioadă de abstinență și o evaluare a stării de sănătate. Te informăm exact ce condiții trebuie îndeplinite la programare.",
          },
          {
            q: "Procedura este confidențială?",
            a: "Da, oferim servicii complet discrete, la domiciliu, cu respect pentru intimitatea ta.",
          },
        ],
      },
      ru: {
        metaTitle:
          "Кодирование от Алкоголя на Дому в Кишинёве | Medline.md",
        metaDescription:
          "Кодирование от алкоголя на дому в Кишинёве — в безопасных и анонимных условиях, под медицинским наблюдением. Дискретная запись, квалифицированные медсёстры.",
        keywords:
          "кодирование от алкоголя, кодировка от алкоголя Кишинёв, кодирование на дому, кодировка от алкоголизма Кишинёв",
        h1: "Кодирование от алкоголя на дому",
        short:
          "Процедура кодирования от алкогольной зависимости в безопасных и анонимных условиях.",
        lead: "Medline предлагает услуги кодирования от алкоголя на дому, выполняемые в безопасных и конфиденциальных условиях. Процедура проводится только после предварительной оценки и с информированного согласия пациента — как шаг на пути к жизни без алкоголя.",
        sections: [
          {
            heading: "Что включает кодирование",
            body: [
              "Кодирование — это метод поддержки в борьбе с алкогольной зависимостью. Перед процедурой обязательны оценка состояния здоровья и период трезвости согласно медицинским рекомендациям.",
              "Процедура выполняется безопасно, стерильными материалами, и пациент получает всю необходимую информацию для осознанного решения.",
            ],
          },
          {
            heading: "Конфиденциальность и поддержка",
            body: [
              "Мы относимся к каждому случаю с максимальной деликатностью и без осуждения. Кодирование эффективнее всего как часть твёрдого личного решения и, в идеале, в сопровождении психологической поддержки.",
              "Для оценки и записи свяжитесь с нами — объясним шаги и необходимые условия.",
            ],
          },
        ],
        indications: [
          "Твёрдое желание отказаться от алкоголя",
          "Соблюдение рекомендованного периода трезвости",
          "Отсутствие медицинских противопоказаний (оценивается заранее)",
          "Те, кто предпочитает анонимность дома",
        ],
        benefits: [
          "Процедура в стерильных и безопасных условиях",
          "Полная конфиденциальность, на дому",
          "Предварительная оценка состояния здоровья",
          "Поддержка и сопровождение",
        ],
        faq: [
          {
            q: "Что нужно сделать перед кодированием?",
            a: "Необходим период трезвости и оценка состояния здоровья. Мы точно расскажем, какие условия нужно выполнить, при записи.",
          },
          {
            q: "Процедура анонимна?",
            a: "Да, мы оказываем полностью анонимные услуги на дому с уважением к вашей приватности.",
          },
        ],
      },
    },
  },
];

export function getService(slug: string): ServiceDetail | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/* ────────────────────────────────────────────
   BLOG — articole pe cuvinte-cheie informaționale
   ──────────────────────────────────────────── */

export type ArticleContent = {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  title: string;
  excerpt: string;
  sections: { heading?: string; body: string[] }[];
};

export type Article = {
  slug: string;
  date: string; // ISO
  readMinutes: number;
  /** Link complet TikTok (opțional) — dacă e setat, clipul apare în articol */
  tiktok?: string;
  content: Record<Locale, ArticleContent>;
};

export const ARTICLES: Article[] = [
  {
    slug: "perfuzie-la-domiciliu-video",
    date: "2026-06-19",
    readMinutes: 1,
    tiktok: "https://www.tiktok.com/@medlinehealth/video/7584846822665981206",
    content: {
      ro: {
        metaTitle: "Perfuzie la Domiciliu — Video | Medline.md",
        metaDescription:
          "Vezi pe video cum montăm o perfuzie la domiciliu în Chișinău, în siguranță, de către asistentă medicală autorizată.",
        keywords: "perfuzie la domiciliu video, perfuzie acasa Chisinau, montare perfuzie",
        title: "Perfuzie la domiciliu — vezi cum decurge",
        excerpt: "Urmărește cum montăm o perfuzie în confortul casei tale, în deplină siguranță.",
        sections: [
          {
            body: [
              "În acest clip vezi cum decurge o perfuzie la domiciliu, efectuată de o asistentă medicală Medline — rapid, igienic și fără stresul deplasării la spital.",
              "Ai nevoie de o perfuzie acasă? Programează o vizită și ajungem la tine.",
            ],
          },
        ],
      },
      ru: {
        metaTitle: "Капельница на Дому — Видео | Medline.md",
        metaDescription:
          "Посмотрите на видео, как мы ставим капельницу на дому в Кишинёве — безопасно, сертифицированной медсестрой.",
        keywords: "капельница на дому видео, капельница дома Кишинёв, поставить капельницу",
        title: "Капельница на дому — как это происходит",
        excerpt: "Посмотрите, как мы ставим капельницу в комфорте вашего дома, безопасно.",
        sections: [
          {
            body: [
              "В этом ролике видно, как проходит капельница на дому от медсестры Medline — быстро, гигиенично и без стресса поездки в больницу.",
              "Нужна капельница на дому? Запишитесь на визит — мы приедем к вам.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "injectie-intramusculara-video",
    date: "2026-06-18",
    readMinutes: 1,
    tiktok: "https://www.tiktok.com/@medlinehealth/video/7566715799537192214",
    content: {
      ro: {
        metaTitle: "Injecție Intramusculară la Domiciliu — Video | Medline.md",
        metaDescription:
          "Prezentare video: cum facem o injecție intramusculară la domiciliu, corect și fără durere inutilă.",
        keywords: "injectie intramusculara video, injectie la domiciliu Chisinau, injectie i/m",
        title: "Injecție intramusculară — prezentare",
        excerpt: "Vezi cum administrăm o injecție intramusculară corect, la tine acasă.",
        sections: [
          {
            body: [
              "Clip demonstrativ cu administrarea unei injecții intramusculare de către asistenta Medline — tehnică corectă, materiale sterile, disconfort minim.",
              "Programează o injecție la domiciliu — venim la ora potrivită pentru tine.",
            ],
          },
        ],
      },
      ru: {
        metaTitle: "Внутримышечная Инъекция на Дому — Видео | Medline.md",
        metaDescription:
          "Видео-презентация: как мы делаем внутримышечную инъекцию на дому — правильно и без лишней боли.",
        keywords: "внутримышечная инъекция видео, укол на дому Кишинёв, инъекция в/м",
        title: "Внутримышечная инъекция — презентация",
        excerpt: "Посмотрите, как мы правильно делаем внутримышечную инъекцию у вас дома.",
        sections: [
          {
            body: [
              "Демонстрационный ролик с внутримышечной инъекцией от медсестры Medline — правильная техника, стерильные материалы, минимум дискомфорта.",
              "Запишитесь на инъекцию на дому — приедем в удобное для вас время.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "masaj-asistenta-medicala-video",
    date: "2026-06-17",
    readMinutes: 1,
    tiktok: "https://www.tiktok.com/@medlinehealth/video/7581119244792777987",
    content: {
      ro: {
        metaTitle: "Masaj cu Asistentă Medicală la Domiciliu — Video | Medline.md",
        metaDescription:
          "Vezi pe video serviciul de masaj efectuat de asistenta medicală Medline, la domiciliu, în Chișinău.",
        keywords: "masaj la domiciliu Chisinau, masaj asistenta medicala, masaj acasa",
        title: "Masaj cu asistentă medicală",
        excerpt: "Relaxare și recuperare prin masaj, efectuat profesional la tine acasă.",
        sections: [
          {
            body: [
              "În acest clip vezi serviciul de masaj realizat de asistenta medicală Medline, direct la domiciliu — util pentru relaxare și recuperare.",
              "Vrei un masaj la domiciliu? Contactează-ne pentru o programare.",
            ],
          },
        ],
      },
      ru: {
        metaTitle: "Массаж от Медсестры на Дому — Видео | Medline.md",
        metaDescription:
          "Посмотрите на видео услугу массажа от медсестры Medline на дому в Кишинёве.",
        keywords: "массаж на дому Кишинёв, массаж медсестра, массаж дома",
        title: "Массаж от медсестры",
        excerpt: "Расслабление и восстановление через массаж, профессионально у вас дома.",
        sections: [
          {
            body: [
              "В этом ролике — услуга массажа от медсестры Medline прямо на дому, для расслабления и восстановления.",
              "Хотите массаж на дому? Свяжитесь с нами для записи.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "tratament-post-alcool-lux-video",
    date: "2026-06-16",
    readMinutes: 1,
    tiktok: "https://www.tiktok.com/@medlinehealth/video/7583404836935372034",
    content: {
      ro: {
        metaTitle: "Tratament Post-Alcool LUX la Domiciliu — Video | Medline.md",
        metaDescription:
          "Vezi pe video tratamentul post-alcool LUX la domiciliu: detoxifiere și refacere, discret și în siguranță.",
        keywords: "tratament post-alcool lux, iesire din binge Chisinau, detoxifiere alcool video",
        title: "Tratament post-alcool LUX",
        excerpt: "Pachetul LUX de detoxifiere și refacere după alcool, la domiciliu, discret.",
        sections: [
          {
            body: [
              "Clip cu tratamentul post-alcool LUX Medline — perfuzii de detoxifiere și refacere a organismului, în confortul și intimitatea propriei case.",
              "Ai nevoie de ajutor rapid și discret? Sună-ne — venim 24/7.",
            ],
          },
        ],
      },
      ru: {
        metaTitle: "Лечение после Алкоголя LUX на Дому — Видео | Medline.md",
        metaDescription:
          "Посмотрите на видео лечение после алкоголя LUX на дому: детокс и восстановление, анонимно и безопасно.",
        keywords: "лечение после алкоголя lux, вывод из запоя Кишинёв, детокс алкоголь видео",
        title: "Лечение после алкоголя LUX",
        excerpt: "Пакет LUX для детокса и восстановления после алкоголя, на дому, анонимно.",
        sections: [
          {
            body: [
              "Ролик о лечении после алкоголя LUX от Medline — детокс-капельницы и восстановление организма в комфорте и приватности дома.",
              "Нужна быстрая и анонимная помощь? Звоните — работаем 24/7.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "interviu-recenzii-video",
    date: "2026-06-15",
    readMinutes: 1,
    tiktok: "https://www.tiktok.com/@medlinehealth/video/7574534105031806230",
    content: {
      ro: {
        metaTitle: "Interviu & Recenzii Pacienți — Video | Medline.md",
        metaDescription:
          "Rubrica de interviu și recenzii Medline: ce spun pacienții despre asistența medicală la domiciliu.",
        keywords: "recenzii Medline, pareri asistenta medicala domiciliu, interviu pacienti",
        title: "Rubrica interviu & recenzii",
        excerpt: "Ascultă direct de la pacienții noștri cum a fost experiența cu Medline.",
        sections: [
          {
            body: [
              "În rubrica noastră de interviu și recenzii, pacienții povestesc experiența reală cu serviciile Medline la domiciliu.",
              "Vrei să faci parte din echipa de pacienți mulțumiți? Programează o vizită.",
            ],
          },
        ],
      },
      ru: {
        metaTitle: "Интервью и Отзывы Пациентов — Видео | Medline.md",
        metaDescription:
          "Рубрика интервью и отзывов Medline: что говорят пациенты о медицинской помощи на дому.",
        keywords: "отзывы Medline, мнения о медпомощи на дому, интервью пациентов",
        title: "Рубрика интервью и отзывы",
        excerpt: "Услышьте напрямую от наших пациентов, каким был опыт с Medline.",
        sections: [
          {
            body: [
              "В нашей рубрике интервью и отзывов пациенты рассказывают реальный опыт с услугами Medline на дому.",
              "Хотите присоединиться к довольным пациентам? Запишитесь на визит.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "avantajele-asistentei-medicale-la-domiciliu",
    date: "2026-05-12",
    readMinutes: 5,
    content: {
      ro: {
        metaTitle:
          "Avantajele Asistenței Medicale la Domiciliu vs. Spitalizare | Medline.md",
        metaDescription:
          "De ce să alegi asistența medicală la domiciliu? Confort, risc redus de infecții, costuri mai mici și îngrijire personalizată. Ghid complet de la Medline.md.",
        keywords:
          "avantaje asistenta medicala la domiciliu, ingrijire la domiciliu vs spital, beneficii ingrijire acasa",
        title: "Avantajele asistenței medicale la domiciliu față de spitalizare",
        excerpt:
          "Tot mai mulți pacienți aleg îngrijirea acasă. Iată de ce asistența medicală la domiciliu poate fi o alternativă mai bună la spitalizare.",
        sections: [
          {
            body: [
              "Asistența medicală la domiciliu a devenit o opțiune tot mai populară pentru pacienții care au nevoie de îngrijire, dar preferă confortul propriei case. În acest articol explicăm principalele avantaje față de spitalizarea clasică.",
            ],
          },
          {
            heading: "1. Confortul și siguranța casei tale",
            body: [
              "Acasă, pacientul se odihnește mai bine, este înconjurat de familie și își păstrează rutina zilnică. Acest confort psihologic accelerează recuperarea, mai ales în cazul vârstnicilor.",
            ],
          },
          {
            heading: "2. Risc redus de infecții nosocomiale",
            body: [
              "Spitalele, oricât de bine îngrijite, prezintă un risc de infecții asociate asistenței medicale. Îngrijirea la domiciliu reduce semnificativ acest risc, deoarece pacientul nu intră în contact cu agenți patogeni din mediul spitalicesc.",
            ],
          },
          {
            heading: "3. Îngrijire personalizată",
            body: [
              "La domiciliu, asistenta se concentrează exclusiv pe un singur pacient, oferind atenție individuală și un plan de îngrijire adaptat nevoilor specifice.",
            ],
          },
          {
            heading: "Când este potrivită îngrijirea la domiciliu",
            body: [
              "Asistența la domiciliu este ideală pentru perfuzii, injecții, pansamente, îngrijirea vârstnicilor și recuperarea post-operatorie. Pentru urgențe majore, spitalizarea rămâne necesară.",
              "Echipa Medline te poate ajuta să stabilești dacă îngrijirea la domiciliu este potrivită pentru situația ta — contactează-ne pentru o evaluare.",
            ],
          },
        ],
      },
      ru: {
        metaTitle:
          "Преимущества Медпомощи на Дому против Госпитализации | Medline.md",
        metaDescription:
          "Почему стоит выбрать медицинскую помощь на дому? Комфорт, сниженный риск инфекций, меньшие расходы и индивидуальный уход. Полный гид от Medline.md.",
        keywords:
          "преимущества медпомощи на дому, уход на дому против больницы, плюсы ухода дома",
        title: "Преимущества медицинской помощи на дому перед госпитализацией",
        excerpt:
          "Всё больше пациентов выбирают уход дома. Вот почему медицинская помощь на дому может быть лучшей альтернативой госпитализации.",
        sections: [
          {
            body: [
              "Медицинская помощь на дому становится всё более популярным вариантом для пациентов, которым нужен уход, но которые предпочитают комфорт собственного дома. В этой статье мы объясняем главные преимущества перед классической госпитализацией.",
            ],
          },
          {
            heading: "1. Комфорт и безопасность дома",
            body: [
              "Дома пациент лучше отдыхает, окружён семьёй и сохраняет привычный распорядок. Этот психологический комфорт ускоряет восстановление, особенно у пожилых.",
            ],
          },
          {
            heading: "2. Сниженный риск внутрибольничных инфекций",
            body: [
              "Больницы, как бы хорошо они ни обслуживались, несут риск инфекций, связанных с медицинской помощью. Уход на дому существенно снижает этот риск, поскольку пациент не контактирует с патогенами больничной среды.",
            ],
          },
          {
            heading: "3. Индивидуальный уход",
            body: [
              "Дома медсестра сосредоточена исключительно на одном пациенте, обеспечивая индивидуальное внимание и план ухода, адаптированный под конкретные потребности.",
            ],
          },
          {
            heading: "Когда уход на дому уместен",
            body: [
              "Помощь на дому идеальна для капельниц, инъекций, перевязок, ухода за пожилыми и послеоперационного восстановления. При серьёзных экстренных случаях госпитализация остаётся необходимой.",
              "Команда Medline поможет определить, подходит ли уход на дому для вашей ситуации — свяжитесь с нами для оценки.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "cum-te-pregatesti-pentru-perfuzie-la-domiciliu",
    date: "2026-05-28",
    readMinutes: 4,
    content: {
      ro: {
        metaTitle:
          "Cum Te Pregătești pentru o Perfuzie la Domiciliu | Ghid — Medline.md",
        metaDescription:
          "Ghid pas cu pas: cum te pregătești pentru o perfuzie la domiciliu. Ce trebuie să pregătești, hidratare, prescripție și ce se întâmplă în timpul procedurii.",
        keywords:
          "pregatire perfuzie la domiciliu, ce trebuie pentru perfuzie acasa, perfuzie domiciliu ghid",
        title: "Cum te pregătești pentru o perfuzie la domiciliu",
        excerpt:
          "Câțiva pași simpli care fac perfuzia la domiciliu mai confortabilă și mai sigură pentru tine.",
        sections: [
          {
            body: [
              "O perfuzie la domiciliu este o procedură simplă și sigură atunci când este efectuată de o asistentă autorizată. Iată cum te poți pregăti pentru ca totul să decurgă lin.",
            ],
          },
          {
            heading: "1. Pregătește prescripția și medicamentele",
            body: [
              "Asigură-te că ai rețeta medicului și soluția sau medicamentele prescrise. Asistenta le verifică înainte de administrare.",
            ],
          },
          {
            heading: "2. Hidratează-te și mănâncă ușor",
            body: [
              "Cu excepția cazului în care medicul a indicat altfel, bea apă și ia o gustare ușoară înainte de perfuzie. O bună hidratare ajută la identificarea venei.",
            ],
          },
          {
            heading: "3. Pregătește un spațiu confortabil",
            body: [
              "Alege un loc confortabil, cu o canapea sau un pat, unde poți sta relaxat 30–90 de minute. Asigură o sursă de lumină bună pentru asistentă.",
            ],
          },
          {
            heading: "În timpul și după procedură",
            body: [
              "Pe durata perfuziei, relaxează-te și anunță asistenta dacă simți disconfort. După retragerea cateterului, ține pansamentul câteva ore și evită efortul intens.",
              "Ai nevoie de o perfuzie la domiciliu? Programează o vizită cu echipa Medline și ne ocupăm de tot.",
            ],
          },
        ],
      },
      ru: {
        metaTitle:
          "Как Подготовиться к Капельнице на Дому | Гид — Medline.md",
        metaDescription:
          "Пошаговый гид: как подготовиться к капельнице на дому. Что подготовить, гидратация, рецепт и что происходит во время процедуры.",
        keywords:
          "подготовка к капельнице на дому, что нужно для капельницы дома, капельница на дому гид",
        title: "Как подготовиться к капельнице на дому",
        excerpt:
          "Несколько простых шагов, которые сделают капельницу на дому комфортнее и безопаснее для вас.",
        sections: [
          {
            body: [
              "Капельница на дому — простая и безопасная процедура, когда её выполняет сертифицированная медсестра. Вот как подготовиться, чтобы всё прошло гладко.",
            ],
          },
          {
            heading: "1. Подготовьте рецепт и препараты",
            body: [
              "Убедитесь, что у вас есть рецепт врача и назначенный раствор или препараты. Медсестра проверит их перед введением.",
            ],
          },
          {
            heading: "2. Пейте воду и поешьте легко",
            body: [
              "Если врач не указал иное, выпейте воды и перекусите перед капельницей. Хорошая гидратация помогает найти вену.",
            ],
          },
          {
            heading: "3. Подготовьте удобное место",
            body: [
              "Выберите удобное место с диваном или кроватью, где можно расслабленно посидеть 30–90 минут. Обеспечьте хорошее освещение для медсестры.",
            ],
          },
          {
            heading: "Во время и после процедуры",
            body: [
              "Во время капельницы расслабьтесь и сообщите медсестре о любом дискомфорте. После снятия катетера держите повязку несколько часов и избегайте интенсивных нагрузок.",
              "Нужна капельница на дому? Запишитесь на визит с командой Medline — мы позаботимся обо всём.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "ingrijirea-varstnicilor-la-domiciliu-ghid",
    date: "2026-06-09",
    readMinutes: 6,
    content: {
      ro: {
        metaTitle:
          "Îngrijirea Vârstnicilor la Domiciliu: Ghid Complet | Medline.md",
        metaDescription:
          "Ghid complet pentru îngrijirea vârstnicilor la domiciliu: igienă, alimentație, prevenirea căderilor și a escarelor, sprijin emoțional. Sfaturi practice de la Medline.md.",
        keywords:
          "ingrijirea varstnicilor la domiciliu, ghid ingrijire batrani, cum ingrijesti un varstnic acasa",
        title: "Îngrijirea vârstnicilor la domiciliu: ghid complet",
        excerpt:
          "Sfaturi practice pentru a oferi îngrijire de calitate persoanelor vârstnice în confortul propriei case.",
        sections: [
          {
            body: [
              "Îngrijirea unui părinte sau bunic vârstnic acasă este o responsabilitate plină de iubire, dar și solicitantă. Acest ghid oferă repere practice pentru o îngrijire sigură și demnă.",
            ],
          },
          {
            heading: "Igiena și confortul zilnic",
            body: [
              "Igiena regulată previne infecțiile și menține confortul. Pentru persoanele cu mobilitate redusă, este importantă schimbarea poziției și îngrijirea pielii pentru a preveni escarele.",
            ],
          },
          {
            heading: "Alimentația echilibrată",
            body: [
              "O dietă adaptată vârstei și afecțiunilor, cu hidratare suficientă, susține sănătatea. Mesele mici și dese sunt adesea mai ușor de tolerat.",
            ],
          },
          {
            heading: "Prevenirea căderilor",
            body: [
              "Eliminarea covoarelor alunecoase, montarea barelor de sprijin și o iluminare bună reduc riscul de căderi, una dintre principalele cauze de accidentare la vârstnici.",
            ],
          },
          {
            heading: "Sprijin emoțional și medical",
            body: [
              "Compania, conversația și menținerea legăturilor sociale sunt la fel de importante ca îngrijirea fizică. Un asistent medical poate prelua sarcinile medicale, oferind familiei timp pentru relația cu cel drag.",
              "Echipa Medline oferă îngrijirea vârstnicilor la domiciliu, cu profesionalism și empatie. Contactează-ne pentru un plan de îngrijire personalizat.",
            ],
          },
        ],
      },
      ru: {
        metaTitle:
          "Уход за Пожилыми на Дому: Полный Гид | Medline.md",
        metaDescription:
          "Полный гид по уходу за пожилыми на дому: гигиена, питание, профилактика падений и пролежней, эмоциональная поддержка. Практичные советы от Medline.md.",
        keywords:
          "уход за пожилыми на дому, гид по уходу за стариками, как ухаживать за пожилым дома",
        title: "Уход за пожилыми на дому: полный гид",
        excerpt:
          "Практичные советы, как обеспечить качественный уход пожилым людям в комфорте собственного дома.",
        sections: [
          {
            body: [
              "Уход за пожилым родителем или дедушкой дома — это ответственность, полная любви, но и требовательная. Этот гид даёт практичные ориентиры для безопасного и достойного ухода.",
            ],
          },
          {
            heading: "Гигиена и ежедневный комфорт",
            body: [
              "Регулярная гигиена предотвращает инфекции и поддерживает комфорт. Для маломобильных важна смена положения и уход за кожей для профилактики пролежней.",
            ],
          },
          {
            heading: "Сбалансированное питание",
            body: [
              "Диета, адаптированная под возраст и заболевания, с достаточной гидратацией, поддерживает здоровье. Частые небольшие приёмы пищи часто переносятся легче.",
            ],
          },
          {
            heading: "Профилактика падений",
            body: [
              "Уберите скользкие ковры, установите поручни и обеспечьте хорошее освещение — это снижает риск падений, одной из главных причин травм у пожилых.",
            ],
          },
          {
            heading: "Эмоциональная и медицинская поддержка",
            body: [
              "Общение, разговоры и поддержание социальных связей так же важны, как и физический уход. Медсестра может взять на себя медицинские задачи, давая семье время на отношения с близким.",
              "Команда Medline оказывает уход за пожилыми на дому с профессионализмом и заботой. Свяжитесь с нами для индивидуального плана ухода.",
            ],
          },
        ],
      },
    },
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Extrage ID-ul clipului dintr-un link TikTok */
export function tiktokVideoId(url: string): string {
  return url.match(/video\/(\d+)/)?.[1] ?? "";
}

/* ────────────────────────────────────────────
   LISTA DE SERVICII PRESTATE (fără prețuri afișate)
   Editează lista aici. Prețurile se comunică la contact.
   ──────────────────────────────────────────── */

export type ServiceListItem = {
  ro: string;
  ru: string;
  /** evidențiază serviciul (badge) */
  featured?: boolean;
};

export const SERVICE_LIST: ServiceListItem[] = [
  { ro: "Injecție intramusculară (I/M)", ru: "Внутримышечная инъекция (в/м)" },
  { ro: "Injecție subcutanată (S/C)", ru: "Подкожная инъекция (п/к)" },
  { ro: "Injecție intravenoasă (I/V)", ru: "Внутривенная инъекция (в/в)" },
  { ro: "Perfuzie intravenoasă (I/V)", ru: "Внутривенная капельница (в/в)" },
  { ro: "Complex de vitamine I/V", ru: "Витаминный комплекс в/в" },
  { ro: "Tratament post-alcool", ru: "Лечение после алкоголя (вывод из запоя)" },
  { ro: "Tratament post-alcool LUX", ru: "Лечение после алкоголя LUX" },
  { ro: "Codare (anti-alcool)", ru: "Кодирование от алкоголя", featured: true },
  { ro: "Pansamente și îngrijirea plăgilor", ru: "Перевязки и уход за ранами" },
  { ro: "Recoltare analize la domiciliu", ru: "Забор анализов на дому" },
  { ro: "Consult medical la domiciliu", ru: "Медицинский осмотр на дому" },
  { ro: "Îngrijirea bolnavilor la domiciliu", ru: "Уход за больными на дому" },
];

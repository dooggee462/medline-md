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
  /** Slug-uri RO de articole pe aceeași temă — leagă serviciul de clusterul lui de conținut (SEO intern) */
  relatedArticles?: string[];
  /**
   * Cale (fără locale) către pagina dedicată care tratează același subiect mai
   * pe larg — ex. "/codare". Când e setată, pagina de serviciu o declară drept
   * canonică și iese din sitemap, ca cele două să nu se canibalizeze în Google.
   */
  canonicalTo?: string;
  content: Record<Locale, ServiceContent>;
};

export const SERVICES: ServiceDetail[] = [
  {
    slug: "perfuzii-la-domiciliu",
    icon: "drop",
    relatedArticles: [
      "perfuzii-cu-vitamine-beneficii",
      "cum-te-pregatesti-pentru-perfuzie-la-domiciliu",
      "perfuzie-la-domiciliu-video",
    ],
    content: {
      ro: {
        metaTitle:
          "Perfuzii la Domiciliu în Chișinău | Montare Perfuzie Acasă — Medline.md",
        metaDescription:
          "Perfuzii la domiciliu în Chișinău: montare perfuzie, soluții intravenoase, rehidratare și vitaminoterapie acasă, de către asistente medicale autorizate. Programare 24/7.",
        keywords:
          "perfuzii la domiciliu, perfuzie la domiciliu, montare perfuzie acasa, perfuzie acasa Chisinau, perfuzie intravenoasa Chisinau, perfuzii la domiciliu pret, rehidratare la domiciliu, vitaminoterapie domiciliu, perfuzie cu vitamine, perfuzie ser fiziologic, asistenta perfuzie Chisinau",
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
          {
            heading: "În cât timp ajungem la tine",
            body: [
              "Ajungem la domiciliu în 25-45 de minute de la apel, în Chișinău. Nu lucrăm cu program fix: echipa pornește în momentul în care ne suni, indiferent de oră.",
              "Serviciul este disponibil non-stop, inclusiv noaptea, în weekend și de sărbători. Dacă ai nevoie de o perfuzie la domiciliu urgent, la 3 dimineața, ne suni și venim — nu te punem pe listă de așteptare pentru a doua zi.",
            ],
          },
          {
            heading: "Ce trebuie să pregătești înainte de vizită",
            body: [
              "Practic nimic. Asistenta vine cu tot necesarul: perfuzor, catetere, ace, soluții, dezinfectant, mănuși și pansamente sterile, toate de unică folosință. Nu trebuie să cumperi nimic de la farmacie și nu trebuie să procuri tu materialele.",
              "Ajută dacă pregătești un loc unde pacientul poate sta întins confortabil 30-90 de minute — un pat sau o canapea, cu o masă sau un scaun alături. E util și un pahar cu apă la îndemână.",
              "Dacă pacientul urmează deja un tratament sau are afecțiuni cronice, ține la îndemână documentele medicale și lista medicamentelor. Asistenta le verifică înainte de a începe.",
            ],
          },
          {
            heading: "Cât durează o perfuzie și ce simți",
            body: [
              "O perfuzie la domiciliu durează în mod obișnuit între 30 și 90 de minute, în funcție de soluția administrată și de ritmul potrivit pentru pacient. Perfuziile de rehidratare sunt de regulă mai scurte, cele cu vitamine sau de refacere pot dura mai mult.",
              "Singurul moment ușor neplăcut este înțepătura pentru montarea cateterului — comparabilă cu o recoltare de sânge, câteva secunde. După ce cateterul e fixat, nu mai simți durere; unii pacienți simt o ușoară răcoare pe braț, ceea ce e normal.",
              "Nu rămâi singur în timpul procedurii. Asistenta stă lângă tine pe toată durata perfuziei, urmărește ritmul și starea generală, iar la final scoate cateterul și îți spune ce e de urmărit în orele următoare.",
            ],
          },
          {
            heading: "Când perfuzia la domiciliu nu este suficientă",
            body: [
              "Perfuzia la domiciliu acoperă majoritatea situațiilor de rehidratare, refacere și tratament intravenos prescris, dar nu înlocuiește spitalul în urgențe majore.",
              "Sună la 112, nu la noi, dacă apar: durere în piept, dificultăți severe de respirație, pierderea cunoștinței, convulsii, semne de accident vascular (față asimetrică, vorbire neclară, slăbiciune pe o parte a corpului) sau sângerare care nu se oprește.",
              "La evaluarea de la fața locului, asistenta poate stabili că starea pacientului depășește ce se poate rezolva acasă — în acest caz îți spune direct și te îndrumă către spital. Preferăm să pierdem o vizită decât să riscăm sănătatea pacientului.",
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
          {
            q: "În cât timp ajungeți la domiciliu?",
            a: "Ajungem în 25-45 de minute de la apel, în Chișinău. Pornim în momentul în care ne suni, nu la o oră programată dinainte.",
          },
          {
            q: "Veniți și noaptea sau în weekend?",
            a: "Da, lucrăm non-stop: noaptea, în weekend și de sărbători. Nu există supliment de așteptare — dacă suni la 3 dimineața, echipa pornește atunci.",
          },
          {
            q: "Ce trebuie să pregătesc sau să cumpăr înainte?",
            a: "Nimic. Asistenta aduce tot necesarul: perfuzor, catetere, soluții, dezinfectant și pansamente sterile, de unică folosință. Pregătește doar un loc unde pacientul poate sta întins confortabil.",
          },
          {
            q: "Doare când se montează perfuzia?",
            a: "Doar înțepătura de la început, câteva secunde, comparabilă cu o recoltare de sânge. După ce cateterul e fixat, nu mai simți durere.",
          },
          {
            q: "Pot rămâne singur în timpul perfuziei?",
            a: "Nu e cazul — asistenta rămâne lângă pacient pe toată durata procedurii, urmărește ritmul de administrare și starea generală, până la scoaterea cateterului.",
          },
        ],
      },
      ru: {
        metaTitle:
          "Капельницы на Дому в Кишинёве | Поставить Капельницу — Medline.md",
        metaDescription:
          "Капельницы на дому в Кишинёве: постановка капельницы, внутривенные растворы, регидратация и витаминотерапия на дому сертифицированными медсёстрами. Запись 24/7.",
        keywords:
          "капельницы на дому, капельница на дому Кишинёв, поставить капельницу дома, капельница на дому цена, внутривенно Кишинёв, регидратация на дому, витаминотерапия на дому, капельница с витаминами, медсестра на дом капельница Кишинёв",
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
          {
            heading: "Как быстро мы приезжаем",
            body: [
              "Приезжаем на дом за 25-45 минут после звонка, в пределах Кишинёва. Мы не работаем по фиксированному графику: бригада выезжает в момент вашего звонка, в любое время суток.",
              "Услуга доступна круглосуточно — ночью, в выходные и праздники. Если капельница на дому нужна срочно, в три часа ночи, вы звоните и мы выезжаем, а не записываем вас на следующий день.",
            ],
          },
          {
            heading: "Что нужно подготовить до приезда",
            body: [
              "Практически ничего. Медсестра привозит всё необходимое: систему, катетеры, иглы, растворы, антисептик, перчатки и стерильные повязки — всё одноразовое. Покупать что-либо в аптеке не нужно.",
              "Пригодится место, где пациент сможет удобно полежать 30-90 минут — кровать или диван, рядом стол или стул. Полезно поставить рядом стакан воды.",
              "Если пациент уже принимает лечение или имеет хронические заболевания, держите под рукой медицинские документы и список препаратов — медсестра проверит их перед началом.",
            ],
          },
          {
            heading: "Сколько длится капельница и что вы чувствуете",
            body: [
              "Капельница на дому обычно занимает от 30 до 90 минут — в зависимости от раствора и подходящей пациенту скорости введения. Регидратационные капельницы, как правило, короче, витаминные и восстановительные могут длиться дольше.",
              "Единственный слегка неприятный момент — прокол при установке катетера, сравнимый со сдачей крови, несколько секунд. После фиксации катетера боли нет; некоторые пациенты ощущают лёгкую прохладу по руке, это нормально.",
              "Вы не остаётесь одни во время процедуры. Медсестра находится рядом всё время, следит за скоростью введения и общим состоянием, в конце снимает катетер и объясняет, за чем следить в ближайшие часы.",
            ],
          },
          {
            heading: "Когда капельницы на дому недостаточно",
            body: [
              "Капельница на дому закрывает большинство ситуаций: регидратацию, восстановление и назначенное внутривенное лечение. Но она не заменяет больницу при тяжёлых неотложных состояниях.",
              "Звоните 112, а не нам, если появились: боль в груди, выраженная одышка, потеря сознания, судороги, признаки инсульта (асимметрия лица, невнятная речь, слабость в одной половине тела) или кровотечение, которое не останавливается.",
              "При осмотре на месте медсестра может определить, что состояние пациента выходит за рамки того, что решается дома — тогда она скажет об этом прямо и направит в больницу. Мы лучше потеряем выезд, чем рискнём здоровьем пациента.",
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
          {
            q: "Как быстро вы приезжаете на дом?",
            a: "Приезжаем за 25-45 минут после звонка, в пределах Кишинёва. Выезжаем в момент вашего звонка, а не к заранее назначенному часу.",
          },
          {
            q: "Вы приезжаете ночью и в выходные?",
            a: "Да, работаем круглосуточно: ночью, в выходные и праздники. Если вы звоните в три часа ночи, бригада выезжает сразу.",
          },
          {
            q: "Что нужно подготовить или купить заранее?",
            a: "Ничего. Медсестра привозит всё необходимое: систему, катетеры, растворы, антисептик и стерильные повязки, всё одноразовое. Подготовьте только место, где пациент сможет удобно полежать.",
          },
          {
            q: "Больно ли ставить капельницу?",
            a: "Только сам прокол в начале, несколько секунд, сравнимо со сдачей крови. После установки катетера боли нет.",
          },
          {
            q: "Могу ли я остаться один во время капельницы?",
            a: "В этом нет необходимости — медсестра находится рядом с пациентом всю процедуру, следит за скоростью введения и состоянием, вплоть до снятия катетера.",
          },
        ],
      },
    },
  },
  {
    slug: "injectii-la-domiciliu",
    icon: "syringe",
    relatedArticles: [
      "ce-injectii-se-pot-face-la-domiciliu",
      "injectie-intramusculara-video",
      "avantajele-asistentei-medicale-la-domiciliu",
    ],
    content: {
      ro: {
        metaTitle:
          "Injecții la Domiciliu în Chișinău | Intramusculare & Intravenoase — Medline.md",
        metaDescription:
          "Injecții la domiciliu în Chișinău: intramusculare, intravenoase și subcutanate, administrate de asistente medicale autorizate, conform prescripției. Rapid, sigur, 24/7.",
        keywords:
          "injectii la domiciliu, injectie la domiciliu, injectii intramusculare acasa, injectie intramusculara Chisinau, injectie intravenoasa Chisinau, injectie subcutanata, injectie acasa, asistenta injectii Chisinau, administrare tratament injectabil domiciliu",
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
          {
            heading: "Cum decurge o vizită pentru injecție",
            body: [
              "Vizita este scurtă: în mod obișnuit durează 10-15 minute. Asistenta verifică prescripția și medicamentul, confirmă doza, alege locul potrivit pentru administrare și face injecția.",
              "Rămâne apoi câteva minute cu tine, ca să se asigure că nu apare o reacție imediată — mai ales la prima administrare a unui medicament nou. Înainte de plecare îți spune la ce să fii atent în orele următoare.",
            ],
          },
          {
            heading: "Cine procură medicamentul",
            body: [
              "Ai două variante, alegi tu care e mai comodă: fie procuri medicamentul de la farmacie pe baza rețetei, fie îl cumpărăm noi și îl aducem odată cu vizita. Spune-ne când suni și ne ocupăm.",
              "Consumabilele intră oricum în serviciu: seringi și ace sterile de unică folosință, dezinfectant, mănuși, tampoane și recipient pentru deșeuri medicale. Nu trebuie să ai nimic din astea în casă.",
              "Dacă medicamentul îl ai deja, verifică termenul de valabilitate și cum a fost păstrat — unele preparate se țin la frigider și își pierd eficiența dacă au stat la căldură.",
            ],
          },
          {
            heading: "Cure de tratament pe mai multe zile",
            body: [
              "Multe tratamente injectabile nu înseamnă o singură administrare, ci o cură: antibiotice timp de 5-7 zile, anticoagulante zilnic după o intervenție chirurgicală, sau vitamine în serie.",
              "Pentru astfel de situații venim zilnic, la aceeași oră, pe toată durata curei. Fixăm intervalul de la prima vizită, ca să nu fie nevoie să suni de fiecare dată — iar administrarea la ore constante contează pentru eficiența tratamentului.",
              "Dacă tratamentul se întinde pe mai multe săptămâni, stabilim programul dinainte pentru toată perioada.",
            ],
          },
          {
            heading: "Când injecția la domiciliu nu este soluția potrivită",
            body: [
              "Administrăm injecții prescrise de medic, dar nu punem diagnostice și nu recomandăm noi tratamente injectabile — aceasta rămâne decizia medicului curant.",
              "Dacă pacientul are febră mare care nu cedează, durere puternică de cauză necunoscută, semne de infecție extinsă sau starea se agravează de la o zi la alta, nu amâna cu injecții la domiciliu: e nevoie de o consultație, iar în urgențe de 112.",
              "Spune-ne dinainte dacă pacientul a avut vreodată o reacție alergică la un medicament injectabil. Sunt situații în care administrarea trebuie făcută în cabinet, unde există dotarea necesară pentru o reacție severă.",
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
            a: "Cum îți este mai comod: fie îl procuri tu de la farmacie pe baza rețetei, fie îl cumpărăm noi și îl aducem odată cu vizita. Spune-ne când ne suni.",
          },
          {
            q: "Cât durează o vizită pentru o injecție?",
            a: "În mod obișnuit 10-15 minute. Asistenta rămâne câteva minute după administrare, ca să se asigure că nu apare vreo reacție.",
          },
          {
            q: "Veniți mai multe zile la rând, pentru o cură?",
            a: "Da. Pentru cure de antibiotice, anticoagulante sau vitamine venim zilnic, la aceeași oră, pe toată durata tratamentului. Programul se stabilește de la prima vizită.",
          },
          {
            q: "În cât timp ajungeți după ce sun?",
            a: "În 25-45 de minute, în Chișinău. Lucrăm non-stop, deci și noaptea sau în weekend echipa pornește în momentul apelului.",
          },
          {
            q: "Ce tipuri de injecții administrați?",
            a: "Intramusculare, intravenoase și subcutanate, conform prescripției medicale — de la antibiotice și anticoagulante până la vitamine injectabile.",
          },
        ],
      },
      ru: {
        metaTitle:
          "Инъекции на Дому в Кишинёве | Внутримышечно & Внутривенно — Medline.md",
        metaDescription:
          "Инъекции на дому в Кишинёве: внутримышечные, внутривенные и подкожные, выполняются сертифицированными медсёстрами по назначению. Быстро, безопасно, 24/7.",
        keywords:
          "инъекции на дому, укол на дому, уколы на дому Кишинёв, поставить укол дома, внутримышечно дома, внутривенная инъекция, подкожная инъекция, медсестра уколы Кишинёв, инъекционное лечение на дому",
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
          {
            heading: "Как проходит визит для инъекции",
            body: [
              "Визит короткий: обычно 10-15 минут. Медсестра проверяет назначение и препарат, подтверждает дозу, выбирает подходящее место введения и делает инъекцию.",
              "После этого она остаётся с вами на несколько минут, чтобы убедиться, что нет немедленной реакции — особенно при первом введении нового препарата. Перед уходом объясняет, за чем следить в ближайшие часы.",
            ],
          },
          {
            heading: "Кто покупает препарат",
            body: [
              "У вас два варианта, выбирайте как удобнее: либо вы покупаете препарат в аптеке по рецепту, либо мы приобретаем его и привозим вместе с визитом. Скажите об этом при звонке.",
              "Расходные материалы в любом случае входят в услугу: стерильные одноразовые шприцы и иглы, антисептик, перчатки, салфетки и контейнер для медицинских отходов. Ничего из этого держать дома не нужно.",
              "Если препарат у вас уже есть, проверьте срок годности и условия хранения — некоторые препараты хранятся в холодильнике и теряют эффективность, если находились в тепле.",
            ],
          },
          {
            heading: "Курсы лечения на несколько дней",
            body: [
              "Многие инъекционные назначения — это не одно введение, а курс: антибиотики на 5-7 дней, антикоагулянты ежедневно после операции или витамины серией.",
              "В таких случаях мы приезжаем ежедневно, в одно и то же время, на весь курс. Интервал фиксируем с первого визита, чтобы не приходилось звонить каждый раз — а введение в постоянные часы влияет на эффективность лечения.",
              "Если лечение растянуто на несколько недель, составляем график заранее на весь период.",
            ],
          },
          {
            heading: "Когда инъекция на дому не подходит",
            body: [
              "Мы делаем инъекции по назначению врача, но не ставим диагнозы и не назначаем инъекционное лечение сами — это остаётся решением лечащего врача.",
              "Если у пациента высокая температура, которая не спадает, сильная боль неясного происхождения, признаки распространённой инфекции или состояние ухудшается день ото дня — не откладывайте, обращаясь к инъекциям на дому: нужен осмотр врача, а при неотложных состояниях 112.",
              "Предупредите заранее, если у пациента когда-либо была аллергическая реакция на инъекционный препарат. В части случаев введение должно проходить в кабинете, где есть оснащение на случай тяжёлой реакции.",
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
            a: "Как вам удобнее: либо вы покупаете его в аптеке по рецепту, либо мы приобретаем и привозим вместе с визитом. Скажите об этом при звонке.",
          },
          {
            q: "Сколько длится визит для инъекции?",
            a: "Обычно 10-15 минут. Медсестра остаётся ещё на несколько минут после введения, чтобы убедиться в отсутствии реакции.",
          },
          {
            q: "Приезжаете ли вы несколько дней подряд, на курс?",
            a: "Да. Для курсов антибиотиков, антикоагулянтов или витаминов приезжаем ежедневно, в одно и то же время, на весь период лечения. График составляем с первого визита.",
          },
          {
            q: "Как быстро вы приезжаете после звонка?",
            a: "За 25-45 минут в пределах Кишинёва. Работаем круглосуточно, поэтому ночью и в выходные бригада выезжает сразу после звонка.",
          },
          {
            q: "Какие виды инъекций вы делаете?",
            a: "Внутримышечные, внутривенные и подкожные, по назначению врача — от антибиотиков и антикоагулянтов до инъекционных витаминов.",
          },
        ],
      },
    },
  },
  {
    slug: "ingrijire-bolnavi-la-domiciliu",
    icon: "heart",
    relatedArticles: [
      "ingrijire-parinte-imobilizat",
      "semne-varstnic-are-nevoie-ingrijire",
      "ingrijirea-varstnicilor-la-domiciliu-ghid",
    ],
    content: {
      ro: {
        metaTitle:
          "Îngrijirea Bolnavilor la Domiciliu în Chișinău | Îngrijire Vârstnici — Medline.md",
        metaDescription:
          "Îngrijirea bolnavilor la domiciliu în Chișinău: îngrijire vârstnici, persoane imobilizate și pacienți în recuperare — igienă, mobilizare, monitorizare. Personal medical empatic.",
        keywords:
          "ingrijire bolnavi la domiciliu, ingrijire la domiciliu Chisinau, ingrijire varstnici Chisinau, ingrijire persoane imobilizate, ingrijire post-operatorie, asistent personal bolnav, dadaca medicala batrani, ingrijire batrani Chisinau, ingrijire paliativa domiciliu",
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
          {
            heading: "Cum se organizează îngrijirea",
            body: [
              "Lucrăm în două formule, în funcție de ce are nevoie familia. Prima este îngrijirea pe ore: venim pentru un interval stabilit, facem ce e de făcut și plecăm — potrivită când familia se descurcă în rest, dar are nevoie de ajutor la anumite momente ale zilei.",
              "A doua este îngrijirea permanentă, 24 de ore din 24, cu tarif corespunzător. Aici cineva rămâne cu pacientul non-stop, inclusiv noaptea.",
              "Preluăm și cazuri de lungă durată, pe luni de zile. Pentru acestea stabilim un program regulat, cu revizuirea situației o dată la una-două săptămâni, ca îngrijirea să fie ajustată pe măsură ce starea pacientului se schimbă.",
            ],
          },
          {
            heading: "Ce presupune îngrijirea unui pacient imobilizat",
            body: [
              "Îngrijirea unei persoane care nu se poate ridica din pat înseamnă mai mult decât prezență. Cea mai importantă parte este prevenirea escarelor: schimbarea poziției la câteva ore, verificarea zonelor de sprijin — călcâie, șolduri, spate — și igiena atentă a pielii.",
              "Se adaugă igiena zilnică, ajutorul la alimentare și hidratare, administrarea medicamentelor la orele stabilite și urmărirea funcțiilor vitale.",
              "Familia primește și îndrumare practică: cum se mobilizează corect pacientul fără să vă accidentați, ce semne cer atenție imediată și cum se organizează camera ca îngrijirea zilnică să fie mai ușoară.",
            ],
          },
          {
            heading: "Când familia nu mai face față singură",
            body: [
              "Nu trebuie să așteptați epuizarea completă ca să cereți ajutor. Semnele că îngrijirea depășește puterile familiei apar devreme: nopți nedormite în serie, imposibilitatea de a merge la serviciu, pacient care a căzut deja o dată, sau răni pe piele care nu se vindecă.",
              "Îngrijirea unui bolnav imobilizat cere efort fizic real și cunoștințe pe care nimeni nu le are din instinct. Un ajutor calificat câteva ore pe zi schimbă complet situația, atât pentru pacient, cât și pentru cei din jur.",
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
          "уход за больными на дому, уход на дому Кишинёв, уход за пожилыми Кишинёв, уход за лежачими больными, послеоперационный уход, сиделка на дом, сиделка для пожилых, уход за стариками Кишинёв, паллиативный уход на дому",
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
          {
            heading: "Как организован уход",
            body: [
              "Мы работаем в двух форматах, в зависимости от потребностей семьи. Первый — уход по часам: приезжаем на оговорённый интервал, выполняем необходимое и уезжаем. Подходит, когда семья справляется в целом, но нуждается в помощи в определённые часы.",
              "Второй — круглосуточный уход, 24 часа в сутки, с соответствующей оплатой. Здесь человек находится рядом с пациентом постоянно, включая ночь.",
              "Берём и длительные случаи, на месяцы. Для них составляем регулярный график с пересмотром ситуации раз в одну-две недели, чтобы уход подстраивался под изменения состояния пациента.",
            ],
          },
          {
            heading: "Что включает уход за лежачим пациентом",
            body: [
              "Уход за человеком, который не встаёт с постели, — это больше, чем присутствие рядом. Важнейшая часть — профилактика пролежней: смена положения каждые несколько часов, проверка опорных зон (пятки, бёдра, спина) и тщательная гигиена кожи.",
              "К этому добавляются ежедневная гигиена, помощь с питанием и питьём, приём препаратов по часам и контроль жизненных показателей.",
              "Семья получает и практические рекомендации: как правильно перемещать пациента, не травмируя себя, какие признаки требуют немедленного внимания и как организовать комнату, чтобы ежедневный уход был легче.",
            ],
          },
          {
            heading: "Когда семья перестаёт справляться",
            body: [
              "Не нужно ждать полного истощения, чтобы попросить помощь. Признаки появляются рано: бессонные ночи подряд, невозможность выйти на работу, пациент, который уже однажды упал, или незаживающие раны на коже.",
              "Уход за лежачим больным требует реальных физических усилий и знаний, которых нет ни у кого по наитию. Квалифицированная помощь несколько часов в день полностью меняет ситуацию — и для пациента, и для близких.",
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
    relatedArticles: [
      "avantajele-asistentei-medicale-la-domiciliu",
      "semne-varstnic-are-nevoie-ingrijire",
      "ingrijirea-varstnicilor-la-domiciliu-ghid",
    ],
    content: {
      ro: {
        metaTitle:
          "Consult Medical la Domiciliu în Chișinău | Medic Acasă — Medline.md",
        metaDescription:
          "Consult medical la domiciliu în Chișinău: evaluare medicală acasă, măsurarea funcțiilor vitale, recomandări personalizate. Pentru vârstnici și pacienți care nu se pot deplasa.",
        keywords:
          "consult medical la domiciliu, medic la domiciliu Chisinau, vizita medic acasa, chemare medic la domiciliu, evaluare medicala acasa, masurare tensiune domiciliu, masurare glicemie domiciliu, consultatie acasa Chisinau",
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
          {
            heading: "Ce se măsoară la un consult",
            body: [
              "Consultul la domiciliu include verificarea tuturor indicilor vitali: temperatura, pulsul, tensiunea arterială, glicemia și saturația de oxigen din sânge.",
              "Pe lângă cifre, contează evaluarea stării generale — cum arată pacientul, cum respiră, dacă e orientat, cum se alimentează, ce simptome descrie. Un pacient poate avea valori acceptabile și, totuși, să necesite atenție medicală.",
              "La final primiți o imagine clară a situației și recomandări concrete: ce se poate trata acasă, ce necesită investigații suplimentare și când e cazul să vă adresați medicului de familie sau spitalului.",
            ],
          },
          {
            heading: "Consult cu asistent sau cu medic",
            body: [
              "În funcție de problemă, consultul se face de către asistentul medical sau de către medic. Când ne sunați, descrieți situația și noi stabilim cine este potrivit să vină.",
              "Pentru monitorizarea unor parametri, verificarea unei stări cunoscute sau evaluarea de rutină a unui pacient cronic, asistentul medical este suficient. Pentru situații care cer diagnostic sau schimbarea unui tratament, vine medicul.",
            ],
          },
          {
            heading: "Ce nu facem la domiciliu",
            body: [
              "Nu recoltăm analize de laborator la domiciliu. Dacă în urma consultului reies analize necesare, vă spunem exact care sunt și unde le puteți face.",
              "Nu efectuăm investigații imagistice — ecografie, radiografie, tomografie — acestea necesită aparatură de clinică.",
              "În urgențe majore — durere în piept, dificultăți severe de respirație, pierderea cunoștinței, semne de accident vascular — sunați la 112. Un consult programat nu înlocuiește intervenția de urgență.",
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
          "медицинский осмотр на дому, вызов врача на дом Кишинёв, врач на дом, осмотр на дому, измерение давления на дому, измерение сахара на дому, консультация на дому Кишинёв",
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
          {
            heading: "Что измеряется на приёме",
            body: [
              "Осмотр на дому включает проверку всех жизненных показателей: температуры, пульса, артериального давления, уровня глюкозы и насыщения крови кислородом.",
              "Помимо цифр важна оценка общего состояния — как пациент выглядит, как дышит, ориентирован ли он, как питается, какие симптомы описывает. Показатели могут быть приемлемыми, а состояние всё равно требовать внимания.",
              "В конце вы получаете ясную картину и конкретные рекомендации: что можно лечить дома, что требует дополнительных обследований и когда следует обратиться к семейному врачу или в больницу.",
            ],
          },
          {
            heading: "Осмотр медсестрой или врачом",
            body: [
              "В зависимости от проблемы осмотр проводит медработник или врач. При звонке опишите ситуацию — мы определим, кто должен приехать.",
              "Для контроля показателей, проверки известного состояния или планового наблюдения хронического пациента достаточно медработника. Для ситуаций, требующих диагноза или изменения лечения, приезжает врач.",
            ],
          },
          {
            heading: "Чего мы не делаем на дому",
            body: [
              "Мы не берём анализы на дому. Если по итогам осмотра нужны анализы, мы точно скажем какие и где их можно сдать.",
              "Не проводим визуализирующие исследования — УЗИ, рентген, томографию: для них нужна аппаратура клиники.",
              "При неотложных состояниях — боль в груди, выраженная одышка, потеря сознания, признаки инсульта — звоните 112. Плановый осмотр не заменяет экстренную помощь.",
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
    slug: "vitaminoterapie-la-domiciliu",
    icon: "flask",
    relatedArticles: [
      "perfuzii-cu-vitamine-beneficii",
      "cum-te-pregatesti-pentru-perfuzie-la-domiciliu",
    ],
    content: {
      ro: {
        metaTitle: "Complex de Vitamine Intravenos la Domiciliu Chișinău | Vitaminoterapie — Medline.md",
        metaDescription:
          "Complex de vitamine administrat intravenos la domiciliu în Chișinău: refacere după epuizare, imunitate scăzută, oboseală cronică. Asistenți medicali autorizați, programare 24/7.",
        keywords:
          "complex de vitamine intravenos, vitaminoterapie la domiciliu Chisinau, perfuzie cu vitamine pret, vitamine intravenos Chisinau, perfuzie pentru imunitate, perfuzie pentru energie, cocktail de vitamine intravenos, vitamine perfuzie oboseala",
        h1: "Complex de vitamine intravenos la domiciliu",
        short:
          "Vitamine administrate intravenos acasă, pentru refacere după epuizare, imunitate scăzută sau oboseală prelungită.",
        lead: "Administrarea intravenoasă a vitaminelor ocolește digestia și duce substanțele direct în sânge, unde organismul le poate folosi imediat. Serviciul se efectuează la domiciliu, de asistenți medicali autorizați, după o evaluare prealabilă a stării tale.",
        sections: [
          {
            heading: "De ce intravenos și nu pastile",
            body: [
              "Când iei vitamine pe cale orală, o parte se pierde în procesul digestiv, iar absorbția depinde de starea stomacului, de alimentație și de medicamentele pe care le iei în paralel. Pentru mulți oameni, mai ales după boală sau în perioade de stres, absorbția e vizibil redusă.",
              "Administrarea intravenoasă elimină pasul acesta: substanțele ajung direct în circulație. De aceea efectul se simte de obicei mai repede decât la suplimentele obișnuite.",
              "Asta nu înseamnă că perfuzia înlocuiește o alimentație corectă sau tratamentul unei afecțiuni. E o măsură de sprijin, nu un substitut pentru ce lipsește din viața de zi cu zi.",
            ],
          },
          {
            heading: "Când merită să ceri o perfuzie cu vitamine",
            body: [
              "Cele mai frecvente situații în care ne sunt cerute: recuperare după o viroză sau o boală care a lăsat organismul epuizat, perioade de suprasolicitare cu somn puțin, oboseală care nu trece după odihnă, imunitate scăzută cu răceli repetate.",
              "Se cere des și după perioade de deshidratare sau alimentație dezechilibrată, precum și în convalescența de după o intervenție chirurgicală, când organismul are nevoie de resurse suplimentare.",
              "Dacă oboseala durează de luni de zile, nu începe cu perfuzia. Poate ascunde anemie, o problemă tiroidiană sau altceva care se vede în analize. Îți spunem asta deschis și te îndrumăm către investigații — o perfuzie care maschează un simptom fără să lămurească cauza nu ajută pe nimeni.",
            ],
          },
          {
            heading: "Cum decurge vizita",
            body: [
              "Asistentul ajunge la ora stabilită, cu tot materialul necesar. Evaluează starea generală, măsoară funcțiile vitale și confirmă compoziția potrivită pentru situația ta.",
              "Perfuzia durează de obicei între 30 și 60 de minute. Poți sta întins pe canapea, poți citi sau lucra la laptop — nu e nevoie să faci nimic special. Asistentul rămâne lângă tine tot timpul.",
              "La final, cateterul e scos, se aplică pansamentul și primești recomandări pentru orele următoare. Nu ai nevoie de recuperare: îți poți relua activitatea imediat.",
            ],
          },
          {
            heading: "Cine nu trebuie să facă vitaminoterapie",
            body: [
              "Procedura nu se efectuează în caz de alergie cunoscută la componentele soluției, insuficiență renală sau cardiacă severă, sau în timpul unei infecții acute cu febră mare, când organismul are nevoie de alt tip de tratament.",
              "Sarcina și alăptarea necesită acordul medicului curant. La fel și situațiile în care iei deja tratament cronic — unele substanțe interacționează.",
              "Asistentul evaluează toate acestea înainte de a începe. Dacă ceva nu permite procedura, îți spunem direct, chiar dacă asta înseamnă să anulăm vizita.",
            ],
          },
        ],
        indications: [
          "Epuizare fizică după boală sau suprasolicitare",
          "Imunitate scăzută, răceli frecvente",
          "Oboseală care nu trece după odihnă",
          "Convalescență după intervenții chirurgicale",
          "Perioade de stres prelungit și somn insuficient",
        ],
        benefits: [
          "Absorbție directă, fără pierderi digestive",
          "La tine acasă, fără drum la clinică",
          "Asistenți autorizați, materiale sterile de unică folosință",
          "Evaluare înainte de administrare, nu doar montarea perfuziei",
        ],
        faq: [
          {
            q: "Cât durează o perfuzie cu vitamine?",
            a: "În mod obișnuit între 30 și 60 de minute, în funcție de compoziție. Asistentul rămâne lângă tine pe toată durata procedurii.",
          },
          {
            q: "În cât timp se simte efectul?",
            a: "Mulți pacienți raportează o ameliorare în primele 24 de ore, dar depinde de starea inițială și de cauza oboselii. Dacă nu simți nicio diferență, spune-ne — poate fi un semn că problema are altă cauză.",
          },
          {
            q: "Câte ședințe sunt necesare?",
            a: "Depinde de situație. Uneori o singură perfuzie e suficientă, alteori se recomandă o serie scurtă. Stabilim împreună după evaluare, fără să vindem ședințe de care nu ai nevoie.",
          },
          {
            q: "Este nevoie de analize înainte?",
            a: "Pentru o perfuzie simplă de refacere, de obicei nu. Dacă oboseala durează de mult timp sau ai afecțiuni cronice, îți recomandăm analizele întâi — pot arăta o cauză care se tratează altfel.",
          },
          {
            q: "În cât timp ajungeți la domiciliu?",
            a: "În 25-45 de minute în Chișinău. Programarea se poate face la orice oră, inclusiv seara sau în weekend.",
          },
        ],
      },
      ru: {
        metaTitle: "Витаминный Комплекс Внутривенно на Дому Кишинёв | Витаминотерапия — Medline.md",
        metaDescription:
          "Витаминный комплекс внутривенно на дому в Кишинёве: восстановление после истощения, сниженный иммунитет, хроническая усталость. Сертифицированные медработники, запись 24/7.",
        keywords:
          "витаминный комплекс внутривенно, витаминотерапия на дому Кишинёв, капельница с витаминами цена, витамины внутривенно Кишинёв, капельница для иммунитета, капельница для энергии, витаминный коктейль внутривенно",
        h1: "Витаминный комплекс внутривенно на дому",
        short:
          "Витамины внутривенно у вас дома — для восстановления после истощения, при сниженном иммунитете или длительной усталости.",
        lead: "Внутривенное введение витаминов минует пищеварение и доставляет вещества прямо в кровь, где организм может использовать их сразу. Услуга выполняется на дому сертифицированными медработниками, после предварительной оценки вашего состояния.",
        sections: [
          {
            heading: "Почему внутривенно, а не в таблетках",
            body: [
              "При приёме внутрь часть витаминов теряется в процессе пищеварения, а усвоение зависит от состояния желудка, питания и параллельно принимаемых препаратов. У многих людей, особенно после болезни или в периоды стресса, усвоение заметно снижено.",
              "Внутривенное введение убирает этот этап: вещества попадают прямо в кровоток. Поэтому эффект обычно ощущается быстрее, чем от обычных добавок.",
              "Это не значит, что капельница заменяет правильное питание или лечение заболевания. Это поддержка, а не замена того, чего не хватает в повседневной жизни.",
            ],
          },
          {
            heading: "Когда стоит попросить витаминную капельницу",
            body: [
              "Самые частые ситуации: восстановление после вируса или болезни, истощившей организм; периоды перегрузки с недосыпом; усталость, которая не проходит после отдыха; сниженный иммунитет с частыми простудами.",
              "Часто просят и после периодов обезвоживания или несбалансированного питания, а также в восстановительном периоде после операции, когда организму нужны дополнительные ресурсы.",
              "Если усталость длится месяцами, не начинайте с капельницы. За ней может стоять анемия, проблема щитовидной железы или что-то ещё, видимое в анализах. Мы скажем это прямо и направим на обследование — капельница, маскирующая симптом без выяснения причины, не помогает никому.",
            ],
          },
          {
            heading: "Как проходит визит",
            body: [
              "Медработник приезжает в назначенное время со всем необходимым. Оценивает общее состояние, измеряет жизненные показатели и подтверждает подходящий состав для вашей ситуации.",
              "Капельница обычно занимает от 30 до 60 минут. Можно лежать на диване, читать или работать за ноутбуком — ничего особенного делать не нужно. Медработник находится рядом всё время.",
              "В конце катетер снимается, накладывается повязка, и вы получаете рекомендации на ближайшие часы. Восстановление не требуется: к своим делам можно вернуться сразу.",
            ],
          },
          {
            heading: "Кому витаминотерапия не подходит",
            body: [
              "Процедура не проводится при известной аллергии на компоненты раствора, тяжёлой почечной или сердечной недостаточности, а также во время острой инфекции с высокой температурой, когда организму нужно другое лечение.",
              "Беременность и кормление грудью требуют согласия лечащего врача. То же касается ситуаций, когда вы уже принимаете хроническое лечение — некоторые вещества взаимодействуют.",
              "Медработник оценивает всё это до начала. Если что-то не позволяет процедуру, мы говорим прямо, даже если это означает отменить визит.",
            ],
          },
        ],
        indications: [
          "Физическое истощение после болезни или перегрузки",
          "Сниженный иммунитет, частые простуды",
          "Усталость, не проходящая после отдыха",
          "Восстановление после хирургических вмешательств",
          "Периоды длительного стресса и недосыпа",
        ],
        benefits: [
          "Прямое усвоение, без потерь в пищеварении",
          "У вас дома, без поездки в клинику",
          "Сертифицированные медработники, стерильные одноразовые материалы",
          "Оценка перед введением, а не просто постановка капельницы",
        ],
        faq: [
          {
            q: "Сколько длится витаминная капельница?",
            a: "Обычно от 30 до 60 минут, в зависимости от состава. Медработник находится рядом всю процедуру.",
          },
          {
            q: "Через сколько чувствуется эффект?",
            a: "Многие пациенты отмечают улучшение в первые 24 часа, но это зависит от исходного состояния и причины усталости. Если разницы нет — скажите нам, это может означать, что причина в другом.",
          },
          {
            q: "Сколько сеансов нужно?",
            a: "Зависит от ситуации. Иногда достаточно одной капельницы, иногда рекомендуется короткий курс. Определяем вместе после осмотра, не продавая сеансы, которые вам не нужны.",
          },
          {
            q: "Нужны ли анализы заранее?",
            a: "Для простой восстановительной капельницы обычно нет. Если усталость длится давно или есть хронические заболевания, сначала рекомендуем анализы — они могут показать причину, которая лечится иначе.",
          },
          {
            q: "Как быстро вы приезжаете на дом?",
            a: "За 25-45 минут в пределах Кишинёва. Записаться можно в любое время, включая вечер и выходные.",
          },
        ],
      },
    },
  },
  {
    slug: "pansamente-ingrijire-plagi",
    icon: "bandage",
    relatedArticles: [
      "ingrijirea-plagilor-si-escarelor-la-domiciliu",
      "ingrijire-parinte-imobilizat",
    ],
    content: {
      ro: {
        metaTitle:
          "Pansamente la Domiciliu în Chișinău | Îngrijirea Plăgilor — Medline.md",
        metaDescription:
          "Pansamente la domiciliu în Chișinău: tratarea plăgilor postoperatorii, escarelor și rănilor cronice de către asistente autorizate. Îngrijire sterilă, programare rapidă.",
        keywords:
          "pansamente la domiciliu, pansament la domiciliu Chisinau, ingrijire plagi acasa, schimbare pansament acasa, tratare escare Chisinau, ingrijire escare, pansament picior diabetic, pansament postoperator domiciliu, ingrijire rani cronice Chisinau",
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
          {
            heading: "Ce tipuri de pansamente efectuăm",
            body: [
              "Efectuăm toate tipurile de pansamente: plăgi postoperatorii, plăgi cronice care se vindecă greu, escare în diferite stadii, arsuri și leziuni traumatice.",
              "Scoatem firele de sutură, agrafele chirurgicale și atelele postoperatorii, la termenul indicat de medicul care a operat. Nu e nevoie să vă deplasați la spital pentru asta.",
              "Fiecare pansament se face cu materiale sterile de unică folosință, iar plaga este evaluată de fiecare dată — culoare, secreții, miros, marginile rănii. Aceste detalii spun dacă vindecarea decurge normal sau apare o complicație.",
            ],
          },
          {
            heading: "Consultația chirurgului la domiciliu",
            body: [
              "Pentru pacienții cu escare avansate sau complicații postoperatorii, aducem la domiciliu și consultația unui medic chirurg. Sunt situații în care pansamentul singur nu rezolvă: rana are nevoie de o evaluare de specialitate și, uneori, de o intervenție locală.",
              "Așa se evită deplasarea unui pacient imobilizat la spital — dificilă, dureroasă și, în cazul plăgilor deschise, cu risc de contaminare.",
              "Dacă asistentul constată la fața locului că situația depășește îngrijirea obișnuită, vă spune direct și organizăm consultația.",
            ],
          },
          {
            heading: "Semne că plaga nu evoluează bine",
            body: [
              "Anunțați-ne, sau mergeți la medic, dacă apar: roșeață care se întinde în jurul rănii, umflătură crescândă, secreție cu miros neplăcut sau puroi, febră, durere care se intensifică de la o zi la alta, sau margini ale plăgii care se depărtează.",
              "În cazul escarelor, orice zonă de piele care se înnegrește ori rana care se adâncește vizibil cere evaluare rapidă — escarele avansate se complică repede și devin greu de tratat.",
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
          "перевязки на дому, перевязка на дому Кишинёв, уход за ранами на дому, смена повязки на дому, лечение пролежней Кишинёв, уход за пролежнями, перевязка диабетической стопы, послеоперационная перевязка на дому, уход за хроническими ранами Кишинёв",
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
          {
            heading: "Какие перевязки мы делаем",
            body: [
              "Мы выполняем все виды перевязок: послеоперационные раны, хронические долго заживающие раны, пролежни разных стадий, ожоги и травматические повреждения.",
              "Снимаем швы, хирургические скобы и послеоперационные шины в сроки, указанные оперировавшим врачом. Ехать для этого в больницу не нужно.",
              "Каждая перевязка выполняется стерильными одноразовыми материалами, и рана оценивается заново при каждом визите: цвет, отделяемое, запах, края раны. Эти детали показывают, идёт заживление нормально или развивается осложнение.",
            ],
          },
          {
            heading: "Консультация хирурга на дому",
            body: [
              "Для пациентов с запущенными пролежнями или послеоперационными осложнениями мы организуем на дому и консультацию врача-хирурга. Бывают ситуации, когда одной перевязки недостаточно: рана требует специализированной оценки, а иногда и местного вмешательства.",
              "Так удаётся избежать перевозки лежачего пациента в больницу — трудной, болезненной и, при открытых ранах, связанной с риском загрязнения.",
              "Если медработник на месте видит, что ситуация выходит за рамки обычного ухода, он говорит об этом прямо и мы организуем консультацию.",
            ],
          },
          {
            heading: "Признаки, что рана заживает плохо",
            body: [
              "Сообщите нам или обратитесь к врачу, если появились: краснота, распространяющаяся вокруг раны, нарастающий отёк, отделяемое с неприятным запахом или гноем, температура, усиливающаяся день ото дня боль или расходящиеся края раны.",
              "При пролежнях любой участок чернеющей кожи или заметно углубляющаяся рана требуют быстрой оценки — запущенные пролежни осложняются быстро и трудно поддаются лечению.",
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
    relatedArticles: [
      "cum-convingi-pe-cineva-sa-se-trateze-de-alcool",
      "ghid-complet-iesire-din-binge",
      "semne-ca-ai-nevoie-de-perfuzie-detoxifiere",
      "mahmureala-severa-ce-sa-faci",
      "cat-costa-perfuzie-detoxifiere",
    ],
    content: {
      ro: {
        metaTitle:
          "Tratament Post-Alcool la Domiciliu în Chișinău | Ieșire din Binge — Medline.md",
        metaDescription:
          "Tratament post-alcool și ieșire din binge la domiciliu în Chișinău: perfuzii de detoxifiere, rehidratare și refacere, sub supravegherea unei asistente medicale. Discret, 24/7.",
        keywords:
          "tratament post-alcool, tratament post-alcool la domiciliu, iesire din binge la domiciliu, detoxifiere alcool Chisinau, perfuzie dupa alcool, perfuzie dupa betie, scoatere din betie, capatul betiei, perfuzie mahmureala, vivod iz zapoya Chisinau",
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
          {
            heading: "Cât durează și câte zile sunt necesare",
            body: [
              "O intervenție durează între 45 și 60 de minute. Numărul de zile depinde de gradul de intoxicare: în cazurile ușoare o singură vizită este suficientă, iar în situațiile severe tratamentul se poate întinde până la 10 zile.",
              "Nu stabilim durata la telefon. Asistentul medical evaluează starea la fața locului și vă spune realist la ce să vă așteptați — o beție de o seară și un consum continuu de câteva săptămâni sunt situații complet diferite.",
            ],
          },
          {
            heading: "Ce se întâmplă pe durata perfuziei",
            body: [
              "Asistentul medical rămâne lângă pacient pe toată durata perfuziei. Verifică permanent indicii vitali — puls, tensiune, saturație — și menține contactul cu pacientul, pentru a observa din timp orice schimbare a stării.",
              "Pe lângă partea medicală se face și o discuție de sprijin psihologic. Momentul de după consum este adesea singurul în care persoana recunoaște că are o problemă, iar o discuție calmă atunci contează mai mult decât zece conversații purtate în alte zile.",
              "Nu judecăm și nu ținem morală. Rolul nostru este să stabilizăm pacientul și să-i arătăm că există un drum mai departe, dacă vrea să-l urmeze.",
            ],
          },
          {
            heading: "Când este nevoie de spital, nu de tratament la domiciliu",
            body: [
              "Sunați la 112 dacă apar: convulsii, pierderea cunoștinței, vărsături cu sânge, halucinații, dezorientare severă sau tremurături puternice însoțite de febră. Acestea pot indica un sevraj complicat, care se tratează exclusiv în spital.",
              "Sevrajul alcoolic sever poate pune viața în pericol. Dacă pacientul consumă zilnic de luni de zile și încearcă să se oprească brusc, întrebați-ne înainte — oprirea neasistată nu este întotdeauna sigură.",
              "Dacă la evaluare starea depășește ce se poate trata acasă, vă spunem direct și vă îndrumăm către spital.",
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
          "вывод из запоя Кишинёв, вывод из запоя на дому, вывод из запоя цена, капельница после алкоголя, капельница от запоя на дом, прокапаться от алкоголя, снятие алкогольной интоксикации, детоксикация алкоголь, лечение после алкоголя Кишинёв",
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
          {
            heading: "Сколько длится и сколько дней нужно",
            body: [
              "Одна процедура занимает от 45 до 60 минут. Количество дней зависит от степени интоксикации: в лёгких случаях достаточно одного визита, при тяжёлых лечение может занять до 10 дней.",
              "Мы не определяем длительность по телефону. Медработник оценивает состояние на месте и реалистично объясняет, чего ожидать — вечернее злоупотребление и непрерывное употребление в течение нескольких недель это совершенно разные ситуации.",
            ],
          },
          {
            heading: "Что происходит во время капельницы",
            body: [
              "Медработник находится рядом с пациентом всё время процедуры. Постоянно контролирует жизненные показатели — пульс, давление, сатурацию — и поддерживает контакт с пациентом, чтобы вовремя заметить любое изменение состояния.",
              "Помимо медицинской части проводится и психологическая поддержка. Момент после употребления часто оказывается единственным, когда человек признаёт наличие проблемы, и спокойный разговор в этот момент значит больше, чем десять бесед в другие дни.",
              "Мы не осуждаем и не читаем нотаций. Наша задача — стабилизировать пациента и показать, что есть путь дальше, если он захочет по нему пойти.",
            ],
          },
          {
            heading: "Когда нужна больница, а не лечение на дому",
            body: [
              "Звоните 112, если появились: судороги, потеря сознания, рвота с кровью, галлюцинации, тяжёлая дезориентация или сильная дрожь с температурой. Это может указывать на осложнённый синдром отмены, который лечится только в стационаре.",
              "Тяжёлый алкогольный абстинентный синдром может быть опасен для жизни. Если пациент пьёт ежедневно месяцами и пытается резко прекратить, спросите нас заранее — прекращение без наблюдения не всегда безопасно.",
              "Если при осмотре состояние выходит за рамки того, что лечится дома, мы говорим об этом прямо и направляем в больницу.",
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
    // /codare tratează același subiect mult mai pe larg (604 vs 348 cuvinte, 6 vs 3 FAQ)
    canonicalTo: "/codare",
    relatedArticles: [
      "ghid-complet-codare-anti-alcool",
      "metode-codare-anti-alcool",
      "pregatire-codare-anti-alcool",
      "codare-sau-tratament-post-alcool",
    ],
    content: {
      ro: {
        metaTitle:
          "Codare Anti-Alcool la Domiciliu în Chișinău | Medline.md",
        metaDescription:
          "Codare anti-alcool la domiciliu în Chișinău, în condiții sigure și confidențiale, sub supraveghere medicală. Programare discretă, asistente calificate.",
        keywords:
          "codare anti-alcool, codare la domiciliu, codare la domiciliu Chisinau, codare alcool Chisinau, codare alcool pret, codare anti-alcool la domiciliu, codare impotriva alcoolului, codare alcoolism Chisinau, kodirovka ot alkogolya Chisinau",
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
          "кодирование от алкоголя, кодирование от алкоголя на дому, кодирование от алкоголя цена, кодировка от алкоголя Кишинёв, закодироваться от алкоголя, кодирование на дому, кодировка от алкоголизма Кишинёв",
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
   SLUG-URI LOCALIZATE PENTRU RU (transliterare rusă, bun pentru SEO)
   Cheie = slug RO (canonic), valoare = slug RU.
   Acoperă atât servicii, cât și articole de blog.
   ──────────────────────────────────────────── */
export const RU_SLUG: Record<string, string> = {
  // Servicii
  "perfuzii-la-domiciliu": "kapelnicy-na-domu",
  "injectii-la-domiciliu": "inekcii-na-domu",
  "ingrijire-bolnavi-la-domiciliu": "uhod-za-bolnymi-na-domu",
  "consult-medical-la-domiciliu": "medicinskiy-osmotr-na-domu",
  "vitaminoterapie-la-domiciliu": "vitaminoterapiya-na-domu",
  "pansamente-ingrijire-plagi": "perevyazki-i-uhod-za-ranami",
  "tratament-post-alcool": "lechenie-posle-alkogolya",
  "codare-anti-alcool": "kodirovanie-ot-alkogolya",
  // Articole blog
  "cum-convingi-pe-cineva-sa-se-trateze-de-alcool": "kak-ubedit-lechitsya-ot-alkogolya",
  "ce-injectii-se-pot-face-la-domiciliu": "kakie-ukoly-mozhno-stavit-na-domu",
  "ingrijirea-plagilor-si-escarelor-la-domiciliu": "uhod-za-ranami-i-prolezhnyami-na-domu",
  "ghid-complet-iesire-din-binge": "vyvod-iz-zapoya-polnyy-gid",
  "ghid-complet-codare-anti-alcool": "kodirovanie-polnyy-gid",
  "metode-codare-anti-alcool": "metody-kodirovaniya",
  "codare-sau-tratament-post-alcool": "kodirovanie-ili-lechenie",
  "pregatire-codare-anti-alcool": "podgotovka-k-kodirovaniyu",
  "ce-sa-faci-daca-cineva-a-baut-prea-mult": "chto-delat-esli-perepil",
  "cum-ajuti-pe-cineva-sa-iasa-din-binge": "kak-pomoch-vyyti-iz-zapoya",
  "mahmureala-severa-ce-sa-faci": "tyazheloe-pohmele",
  "semne-ca-ai-nevoie-de-perfuzie-detoxifiere": "priznaki-nuzhna-kapelnica",
  "avantajele-asistentei-medicale-la-domiciliu": "preimushestva-pomoshi-na-domu",
  "cum-te-pregatesti-pentru-perfuzie-la-domiciliu": "kak-podgotovitsya-k-kapelnice",
  "ingrijirea-varstnicilor-la-domiciliu-ghid": "uhod-za-pozhilymi-na-domu",
  "perfuzie-la-domiciliu-video": "kapelnica-na-domu-video",
  "injectie-intramusculara-video": "vnutrimyshechnaya-inekciya-video",
  "masaj-asistenta-medicala-video": "massazh-medsestry-video",
  "tratament-post-alcool-lux-video": "lechenie-posle-alkogolya-lux-video",
  "interviu-recenzii-video": "intervyu-i-otzyvy-video",
  "perfuzii-cu-vitamine-beneficii": "vitaminnye-kapelnicy-polza",
  "cat-costa-perfuzie-detoxifiere": "skolko-stoit-kapelnica-detoks",
  "ingrijire-parinte-imobilizat": "uhod-za-lezhachim-rodstvennikom",
  "semne-varstnic-are-nevoie-ingrijire": "priznaki-pozhilomu-nuzhen-uhod",
};

const RU_TO_RO: Record<string, string> = Object.fromEntries(
  Object.entries(RU_SLUG).map(([ro, ru]) => [ru, ro])
);

/** slug RO → slug afișat pentru limba dată */
export function localizeSlug(roSlug: string, locale: Locale): string {
  return locale === "ru" ? RU_SLUG[roSlug] ?? roSlug : roSlug;
}

/** slug din URL (orice limbă) → slug RO canonic */
export function canonicalSlug(slug: string): string {
  return RU_TO_RO[slug] ?? slug;
}

/** URL complet pentru un serviciu, pe limba dată (primește slug RO) */
export function serviceHref(locale: Locale, roSlug: string): string {
  // Serviciile cu pagină dedicată (canonicalTo) trimit direct acolo: toate
  // legăturile interne duc în același loc în care Google indexează, iar
  // autoritatea nu se împarte între două URL-uri.
  const svc = getService(roSlug);
  if (svc?.canonicalTo) return `/${locale}${svc.canonicalTo}`;
  return `/${locale}/servicii/${localizeSlug(roSlug, locale)}`;
}

/** Găsește serviciul după slug-ul din URL (RO sau RU) */
export function getServiceByLocaleSlug(slug: string): ServiceDetail | undefined {
  return getService(canonicalSlug(slug));
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
    slug: "cum-convingi-pe-cineva-sa-se-trateze-de-alcool",
    date: "2026-08-28",
    readMinutes: 8,
    content: {
      ro: {
        metaTitle: "Cum Convingi pe Cineva să se Trateze de Alcool | Ghid pentru Familie — Medline.md",
        metaDescription:
          "Ce funcționează și ce nu, când vrei să convingi un apropiat să se trateze de alcool. Ghid practic pentru familii din Chișinău: ce să spui, ce să eviți, când să ceri ajutor medical.",
        keywords: "cum convingi pe cineva sa se trateze de alcool, sotul bea ce fac, cum ajut un alcoolic, familia unui alcoolic, convingere tratament alcool, ajutor dependenta alcool Chisinau",
        title: "Cum convingi pe cineva să se trateze de alcool",
        excerpt:
          "Ce funcționează și ce nu, când încerci să convingi un apropiat să accepte ajutor. Un ghid onest pentru familii, scris din ce vedem la domiciliu.",
        sections: [
          {
            body: [
              "Dacă ai ajuns să cauți asta, probabil ai încercat deja multe: ai vorbit frumos, ai țipat, ai amenințat cu plecarea, ai turnat sticle în chiuvetă. Și probabil nimic nu a ținut mai mult de câteva zile.",
              "Nu e vina ta că n-a funcționat. Metodele care par logice sunt, de cele mai multe ori, exact cele care întăresc rezistența. Textul de mai jos nu promite o formulă magică — descrie ce vedem că funcționează și ce nu, la sute de vizite la domiciliu.",
            ],
          },
          {
            heading: "De ce nu funcționează cearta și amenințările",
            body: [
              "Persoana dependentă știe deja că are o problemă. Nu are nevoie să i se spună — are nevoie să nu se mai simtă atacată, pentru că apărarea consumă exact energia care i-ar trebui ca să accepte ajutor.",
              "Cearta creează un tipar previzibil: tu ataci, el se apără, apoi bea ca să scape de tensiunea creată de ceartă. Ai devenit, fără să vrei, parte din motivul pentru care bea. E dureros de auzit, dar e important.",
              "Amenințările nefolosite funcționează și mai rău. Dacă spui „plec cu copiii” a cincea oară și nu pleci, ai anunțat că nimic nu se schimbă indiferent ce face. Spune doar ce ești pregătit să duci până la capăt.",
            ],
          },
          {
            heading: "Momentul contează mai mult decât cuvintele",
            body: [
              "Nu discuta niciodată când persoana e băută. Nu ține minte, nu procesează, iar tu te epuizezi degeaba. Ai o discuție reală doar cu un om treaz.",
              "Cea mai bună fereastră e a doua zi dimineața, în perioada de rușine și rău fizic. Atunci apărarea e cea mai slabă și conștiința problemei cea mai clară. Nu e manipulare — e singurul moment în care te aude.",
              "A doua fereastră apare după un incident: o cădere, o ceartă cu martori, o zi de muncă pierdută, o sperietură medicală. Acolo, în primele 24 de ore, se iau cele mai multe decizii de tratament.",
            ],
          },
          {
            heading: "Ce să spui, concret",
            body: [
              "Vorbește despre tine, nu despre el. „Mi-e frică” ajunge mai departe decât „ești alcoolic”. Prima e o afirmație pe care nu o poate contesta; a doua e o etichetă împotriva căreia se va apăra.",
              "Fii concret și fără reproș: „Marți nu te-ai trezit la telefon și am crezut că ai murit” spune mai mult decât „bei prea mult”.",
              "Oferă un pas mic, nu o transformare. „Hai să vină cineva să-ți verifice tensiunea și analizele” e acceptabil. „Trebuie să te lași definitiv” e o cerere pe care nimeni nu o poate accepta pe loc.",
              "Nu cere o promisiune pe viață. Cere o singură zi, o singură vizită, o singură discuție cu cineva calificat.",
            ],
          },
          {
            heading: "Ce nu poți face, oricât ai vrea",
            body: [
              "Nu poți trata pe cineva fără acordul lui. Ni se cere des să venim „pe ascuns”, să spunem că e o vizită de rutină, sau să facem codarea fără ca persoana să știe. Nu facem asta — și niciun serviciu serios nu o face.",
              "Motivul nu e doar legal. O procedură făcută împotriva voinței cuiva nu funcționează: bariera fizică rămâne, decizia nu apare, iar încrederea în familie se rupe definitiv. Pierzi și tratamentul, și relația.",
              "Nu poți nici să-l salvezi de consecințe la nesfârșit. Când plătești datoriile, suni la serviciu să-l scuzi și cureți după el, ștergi exact realitatea care l-ar putea determina să se oprească.",
            ],
          },
          {
            heading: "Când e nevoie de ajutor medical, nu de discuții",
            body: [
              "Sunt situații în care nu mai e vorba de convingere, ci de siguranță. Cere ajutor medical urgent dacă apar: tremurături puternice, transpirații abundente, halucinații, confuzie severă, convulsii sau vărsături cu sânge.",
              "Sevrajul alcoolic sever poate pune viața în pericol. Dacă persoana bea zilnic de săptămâni sau luni și se oprește brusc, oprirea neasistată nu e sigură — sună înainte și întreabă.",
              "Dacă persoana e într-un consum continuu de mai multe zile, prima etapă nu e codarea, ci [detoxifierea la domiciliu](/ro/detoxifiere): organismul trebuie stabilizat înainte de orice altceva.",
            ],
          },
          {
            heading: "Ce facem noi, dacă acceptă",
            body: [
              "Venim la domiciliu, discret, fără însemne pe mașină, în 25-45 de minute de la apel, la orice oră. Pentru mulți oameni, faptul că nu trebuie să intre pe ușa unei clinici e exact ce face pasul posibil.",
              "Asistentul evaluează starea, explică opțiunile și spune deschis ce se poate și ce nu. Dacă e nevoie de detoxifiere înainte de [codare](/ro/codare), o spunem — nu vindem proceduri care nu ajută.",
              "Poți suna și doar ca să întrebi, fără ca persoana să știe încă. Discuția e gratuită și confidențială, iar de multe ori ajută să vorbești cu cineva care a văzut situația asta de sute de ori.",
            ],
          },
        ],
      },
      ru: {
        metaTitle: "Как Убедить Человека Лечиться от Алкоголя | Гид для Семьи — Medline.md",
        metaDescription:
          "Что работает, а что нет, когда вы хотите убедить близкого лечиться от алкоголя. Практический гид для семей в Кишинёве: что говорить, чего избегать, когда нужна медицинская помощь.",
        keywords: "как убедить лечиться от алкоголя, муж пьёт что делать, как помочь алкоголику, семья алкоголика, помощь при алкогольной зависимости Кишинёв",
        title: "Как убедить человека лечиться от алкоголя",
        excerpt:
          "Что работает и что нет, когда вы пытаетесь убедить близкого принять помощь. Честный гид для семей, основанный на том, что мы видим на дому.",
        sections: [
          {
            body: [
              "Если вы это ищете, вы наверняка уже многое перепробовали: говорили по-хорошему, кричали, грозили уйти, выливали бутылки. И, скорее всего, ничего не продержалось дольше нескольких дней.",
              "Это не ваша вина. Методы, которые кажутся логичными, чаще всего как раз и усиливают сопротивление. Ниже — не волшебная формула, а то, что мы видим работающим и не работающим на сотнях выездов на дом.",
            ],
          },
          {
            heading: "Почему ссоры и угрозы не работают",
            body: [
              "Зависимый человек и так знает, что у него проблема. Ему не нужно об этом говорить — ему нужно перестать чувствовать себя атакованным, потому что защита съедает ровно ту энергию, которая нужна, чтобы принять помощь.",
              "Ссора создаёт предсказуемый круг: вы нападаете, он защищается, потом пьёт, чтобы снять напряжение от ссоры. Вы невольно стали частью причины, по которой он пьёт. Это тяжело слышать, но важно.",
              "Невыполненные угрозы работают ещё хуже. Если вы в пятый раз говорите «я уйду с детьми» и не уходите, вы объявили, что ничего не изменится, что бы он ни делал. Говорите только то, что готовы довести до конца.",
            ],
          },
          {
            heading: "Момент важнее слов",
            body: [
              "Никогда не разговаривайте, когда человек пьян. Он не запомнит, не осмыслит, а вы выгорите зря. Настоящий разговор возможен только с трезвым.",
              "Лучшее время — следующее утро, в период стыда и физического недомогания. Тогда защита слабее всего, а осознание проблемы — яснее всего. Это не манипуляция, это единственный момент, когда он вас слышит.",
              "Второе окно появляется после происшествия: падение, ссора при свидетелях, потерянный рабочий день, испуг из-за здоровья. Именно в первые 24 часа принимается большинство решений о лечении.",
            ],
          },
          {
            heading: "Что говорить конкретно",
            body: [
              "Говорите о себе, а не о нём. «Мне страшно» доходит лучше, чем «ты алкоголик». Первое нельзя оспорить, второе — ярлык, от которого он будет защищаться.",
              "Будьте конкретны и без упрёка: «Во вторник ты не брал трубку, и я думала, что ты умер» говорит больше, чем «ты слишком много пьёшь».",
              "Предлагайте маленький шаг, а не полное преображение. «Пусть приедут, измерят давление и посмотрят анализы» — приемлемо. «Ты должен бросить навсегда» — просьба, которую невозможно принять сразу.",
              "Не требуйте обещания на всю жизнь. Попросите один день, один визит, один разговор со специалистом.",
            ],
          },
          {
            heading: "Чего вы не можете сделать, как бы ни хотели",
            body: [
              "Нельзя лечить человека без его согласия. Нас часто просят приехать «незаметно», сказать, что это плановый осмотр, или провести кодирование втайне. Мы этого не делаем — и ни одна серьёзная служба не делает.",
              "Причина не только юридическая. Процедура против воли человека не работает: физический барьер остаётся, решение не появляется, а доверие в семье рушится окончательно. Вы теряете и лечение, и отношения.",
              "Нельзя и бесконечно ограждать его от последствий. Оплачивая долги, оправдывая его на работе и убирая за ним, вы стираете ту самую реальность, которая могла бы его остановить.",
            ],
          },
          {
            heading: "Когда нужна медицинская помощь, а не разговоры",
            body: [
              "Есть ситуации, где речь уже не об убеждении, а о безопасности. Срочно обращайтесь за медицинской помощью при: сильной дрожи, обильной потливости, галлюцинациях, тяжёлой спутанности сознания, судорогах или рвоте с кровью.",
              "Тяжёлый алкогольный абстинентный синдром может быть опасен для жизни. Если человек пьёт ежедневно неделями или месяцами и резко прекращает, прекращение без наблюдения небезопасно — позвоните и спросите заранее.",
              "Если человек в запое несколько дней, первый этап — не кодирование, а [детоксикация на дому](/ru/detoxifiere): организм нужно сначала стабилизировать.",
            ],
          },
          {
            heading: "Что делаем мы, если он согласится",
            body: [
              "Приезжаем на дом незаметно, без опознавательных знаков, за 25-45 минут после звонка, в любое время суток. Для многих именно то, что не надо входить в дверь клиники, и делает шаг возможным.",
              "Медработник оценивает состояние, объясняет варианты и прямо говорит, что возможно, а что нет. Если перед [кодированием](/ru/codare) нужна детоксикация, мы это скажем — мы не продаём процедуры, которые не помогут.",
              "Позвонить можно и просто чтобы спросить, пока человек ещё не знает. Разговор бесплатный и конфиденциальный, и часто помогает поговорить с тем, кто видел такую ситуацию сотни раз.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "ce-injectii-se-pot-face-la-domiciliu",
    date: "2026-07-14",
    readMinutes: 5,
    content: {
      ro: {
        metaTitle: "Ce Injecții se Pot Face la Domiciliu în Chișinău | Medline.md",
        metaDescription:
          "Ce tipuri de injecții se pot administra la domiciliu în Chișinău: intramusculare, intravenoase, subcutanate. Când e sigur, cum decurge și ce trebuie să pregătești.",
        keywords: "ce injectii se pot face la domiciliu, injectie intramusculara acasa, injectie la domiciliu Chisinau, injectie subcutanata acasa, cine face injectii la domiciliu",
        title: "Ce injecții se pot face la domiciliu",
        excerpt: "Ce tipuri de injecții se administrează în siguranță acasă, cum decurge vizita și ce e bine să pregătești dinainte.",
        sections: [
          {
            body: [
              "Nu mai e nevoie să stai la coadă la spital sau la policlinică pentru o injecție prescrisă de medic. Multe tratamente injectabile se pot administra în siguranță la domiciliu, de către o asistentă medicală autorizată — mai comod, mai rapid și fără stresul deplasării.",
            ],
          },
          {
            heading: "Ce tipuri de injecții se pot face acasă",
            body: [
              "### Injecții intramusculare (i.m.)",
              "Cele mai frecvente — antibiotice, antiinflamatoare, vitamine (ex. B12), analgezice. Se administrează în mușchi și sunt printre cele mai simple de făcut la domiciliu.",
              "### Injecții intravenoase (i.v.)",
              "Administrare directă în venă, pentru tratamente care necesită efect rapid. Necesită experiență — de aceea le face doar personal medical calificat.",
              "### Injecții subcutanate (s.c.)",
              "Sub piele — de exemplu anticoagulante (heparine), insulină sau alte tratamente cronice. Se pot administra zilnic, la ore fixe.",
            ],
          },
          {
            heading: "Cum decurge o vizită",
            body: [
              "Ne suni sau ne scrii, ne spui ce injecție ai prescrisă și stabilim ora. Asistenta vine cu materiale sterile de unică folosință, verifică prescripția și medicamentul, administrează injecția corect și rămâne câteva minute pentru a se asigura că totul e în regulă.",
            ],
          },
          {
            heading: "Ce trebuie să pregătești",
            body: [
              "Prescripția medicului și medicamentul (dacă îl ai deja). Restul — seringi, ace, dezinfectant, mănuși — le aduce asistenta. E util să ai la îndemână și lista tratamentelor pe care le urmezi.",
            ],
          },
          {
            heading: "Este sigur?",
            body: [
              "Da, atât timp cât injecția e administrată de o asistentă medicală autorizată, cu respectarea prescripției și cu materiale sterile. Vezi pagina de [injecții la domiciliu](/ro/servicii/injectii-la-domiciliu) pentru detalii sau sună-ne direct pentru o programare.",
            ],
          },
        ],
      },
      ru: {
        metaTitle: "Какие Уколы Можно Ставить на Дому в Кишинёве | Medline.md",
        metaDescription:
          "Какие виды инъекций можно ставить на дому в Кишинёве: внутримышечные, внутривенные, подкожные. Когда это безопасно, как проходит визит и что подготовить.",
        keywords: "какие уколы можно ставить на дому, внутримышечный укол на дому, инъекция на дому Кишинёв, подкожная инъекция дома, кто ставит уколы на дому",
        title: "Какие уколы можно ставить на дому",
        excerpt: "Какие виды инъекций безопасно ставить дома, как проходит визит и что стоит подготовить заранее.",
        sections: [
          {
            body: [
              "Больше не нужно стоять в очереди в больнице или поликлинике ради назначенного врачом укола. Многие инъекционные препараты можно безопасно вводить на дому — сертифицированной медсестрой, удобнее, быстрее и без стресса от поездки.",
            ],
          },
          {
            heading: "Какие виды уколов можно ставить дома",
            body: [
              "### Внутримышечные (в/м)",
              "Самые частые — антибиотики, противовоспалительные, витамины (например B12), обезболивающие. Вводятся в мышцу и проще всего выполняются на дому.",
              "### Внутривенные (в/в)",
              "Введение прямо в вену, для препаратов, требующих быстрого эффекта. Требует опыта — поэтому их делает только квалифицированный медперсонал.",
              "### Подкожные (п/к)",
              "Под кожу — например антикоагулянты (гепарины), инсулин или другое хроническое лечение. Можно вводить ежедневно, в фиксированное время.",
            ],
          },
          {
            heading: "Как проходит визит",
            body: [
              "Вы звоните или пишете, говорите, какой укол назначен, и мы согласуем время. Медсестра приезжает со стерильными одноразовыми материалами, проверяет назначение и препарат, правильно ставит инъекцию и остаётся на несколько минут, чтобы убедиться, что всё в порядке.",
            ],
          },
          {
            heading: "Что нужно подготовить",
            body: [
              "Назначение врача и препарат (если он уже у вас). Остальное — шприцы, иглы, дезинфектант, перчатки — привозит медсестра. Полезно иметь под рукой список принимаемых препаратов.",
            ],
          },
          {
            heading: "Это безопасно?",
            body: [
              "Да, пока укол ставит сертифицированная медсестра, по назначению и стерильными материалами. Смотрите страницу [инъекции на дому](/ru/servicii/inekcii-na-domu) для деталей или звоните напрямую для записи.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "ingrijirea-plagilor-si-escarelor-la-domiciliu",
    date: "2026-07-13",
    readMinutes: 6,
    content: {
      ro: {
        metaTitle: "Îngrijirea Plăgilor și Escarelor la Domiciliu în Chișinău | Medline.md",
        metaDescription:
          "Cum se îngrijesc plăgile postoperatorii, escarele și rănile cronice la domiciliu în Chișinău. Semne de infecție, cum previi escarele și când chemi asistenta.",
        keywords: "ingrijire plagi la domiciliu, pansament la domiciliu Chisinau, tratare escare, prevenire escare pacient imobilizat, ingrijire rani postoperatorii acasa",
        title: "Îngrijirea plăgilor și escarelor la domiciliu",
        excerpt: "Cum se îngrijesc corect plăgile postoperatorii și escarele acasă, cum previi complicațiile și când e nevoie de o asistentă.",
        sections: [
          {
            body: [
              "Îngrijirea corectă a unei plăgi face diferența între o vindecare rapidă și o infecție care întârzie recuperarea. Pentru pacienții operați recent sau imobilizați la pat, pansamentele și prevenirea escarelor sunt esențiale — și se pot face în siguranță la domiciliu.",
            ],
          },
          {
            heading: "Tipuri de plăgi care necesită îngrijire",
            body: [
              "### Plăgi postoperatorii",
              "După o intervenție chirurgicală, plaga trebuie curățată și pansată periodic pentru a preveni infecția și a favoriza vindecarea.",
              "### Escare (răni de presiune)",
              "Apar la pacienții imobilizați, în zonele de presiune (spate, șold, călcâie). Netratate, se pot adânci rapid.",
              "### Răni cronice",
              "Ulcere venoase, picior diabetic sau alte răni care se vindecă greu și necesită pansamente specializate.",
            ],
          },
          {
            heading: "Cum previi escarele la un pacient imobilizat",
            body: [
              "Schimbă poziția pacientului la fiecare 2 ore, menține pielea curată și uscată, folosește saltele antiescară și verifică zilnic zonele de presiune. La primul semn de roșeață care nu dispare, cere sfatul unei asistente — e mult mai ușor de prevenit decât de tratat.",
            ],
          },
          {
            heading: "Semne că o plagă s-a infectat",
            body: [
              "Roșeață care se extinde, umflătură, durere crescândă, secreție cu miros neplăcut sau puroi, febră. Dacă apar, nu aștepta — o plagă infectată tratată la timp se vindecă mult mai repede.",
            ],
          },
          {
            heading: "Când chemi o asistentă medicală",
            body: [
              "Pentru pansamente sterile regulate, tratarea escarelor sau a rănilor cronice, ai nevoie de personal calificat. Medline face [pansamente și îngrijirea plăgilor](/ro/servicii/pansamente-ingrijire-plagi) la domiciliu în Chișinău, iar pentru pacienții imobilizați oferim și [îngrijire de durată](/ro/servicii/ingrijire-bolnavi-la-domiciliu).",
            ],
          },
        ],
      },
      ru: {
        metaTitle: "Уход за Ранами и Пролежнями на Дому в Кишинёве | Medline.md",
        metaDescription:
          "Как ухаживать за послеоперационными ранами, пролежнями и хроническими ранами на дому в Кишинёве. Признаки инфекции, профилактика пролежней и когда звать медсестру.",
        keywords: "уход за ранами на дому, перевязка на дому Кишинёв, лечение пролежней, профилактика пролежней у лежачих, уход за послеоперационными ранами дома",
        title: "Уход за ранами и пролежнями на дому",
        excerpt: "Как правильно ухаживать за послеоперационными ранами и пролежнями дома, как предотвратить осложнения и когда нужна медсестра.",
        sections: [
          {
            body: [
              "Правильный уход за раной определяет, будет ли заживление быстрым или начнётся инфекция, которая затянет восстановление. Для недавно прооперированных или лежачих пациентов перевязки и профилактика пролежней критически важны — и их можно безопасно делать на дому.",
            ],
          },
          {
            heading: "Виды ран, требующих ухода",
            body: [
              "### Послеоперационные раны",
              "После хирургического вмешательства рану нужно периодически очищать и перевязывать, чтобы предотвратить инфекцию и способствовать заживлению.",
              "### Пролежни (раны от давления)",
              "Возникают у лежачих пациентов в зонах давления (спина, бедро, пятки). Без лечения быстро углубляются.",
              "### Хронические раны",
              "Венозные язвы, диабетическая стопа или другие трудно заживающие раны, требующие специальных перевязок.",
            ],
          },
          {
            heading: "Как предотвратить пролежни у лежачего пациента",
            body: [
              "Меняйте положение пациента каждые 2 часа, держите кожу чистой и сухой, используйте противопролежневые матрасы и ежедневно проверяйте зоны давления. При первом признаке покраснения, которое не проходит, обратитесь к медсестре — предотвратить намного проще, чем лечить.",
            ],
          },
          {
            heading: "Признаки инфицирования раны",
            body: [
              "Распространяющееся покраснение, отёк, нарастающая боль, выделения с неприятным запахом или гной, температура. Если они появились, не ждите — вовремя обработанная рана заживает намного быстрее.",
            ],
          },
          {
            heading: "Когда звать медсестру",
            body: [
              "Для регулярных стерильных перевязок, лечения пролежней или хронических ран нужен квалифицированный персонал. Medline делает [перевязки и уход за ранами](/ru/servicii/perevyazki-i-uhod-za-ranami) на дому в Кишинёве, а для лежачих пациентов предлагаем и [длительный уход](/ru/servicii/uhod-za-bolnymi-na-domu).",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "perfuzii-cu-vitamine-beneficii",
    date: "2026-06-29",
    readMinutes: 6,
    content: {
      ro: {
        metaTitle: "Perfuzii cu Vitamine la Domiciliu: Beneficii și Când Ai Nevoie | Medline.md",
        metaDescription:
          "Perfuzii cu vitamine la domiciliu în Chișinău: ce conțin, ce beneficii au, când sunt recomandate și cum se administrează în siguranță. Programare 24/7.",
        keywords: "perfuzii cu vitamine, perfuzie vitamine la domiciliu, vitaminoterapie Chisinau, perfuzie pentru imunitate, perfuzie de refacere",
        title: "Perfuzii cu vitamine la domiciliu: beneficii și când ai nevoie",
        excerpt: "Ce sunt perfuziile cu vitamine, ce beneficii aduc și în ce situații te ajută cel mai mult.",
        sections: [
          {
            body: [
              "Perfuziile cu vitamine au devenit o metodă populară de a sprijini rapid organismul, mai ales în perioade de oboseală, după boală sau după excese. Administrate corect, la domiciliu, sunt o soluție comodă și sigură.",
            ],
          },
          {
            heading: "Ce sunt perfuziile cu vitamine",
            body: [
              "Sunt soluții administrate intravenos care conțin vitamine, minerale și electroliți. Avantajul față de pastile: substanțele ajung direct în sânge, cu absorbție rapidă și completă.",
            ],
          },
          {
            heading: "Ce beneficii au",
            body: [
              "### Energie și refacere",
              "Ajută la combaterea oboselii, epuizării și a stării de slăbiciune, mai ales după boală, efort sau stres prelungit.",
              "### Hidratare și echilibru",
              "Reechilibrează rapid organismul în caz de deshidratare (după gastroenterite, febră sau consum de alcool).",
              "### Sprijin pentru imunitate",
              "Vitaminele din grupul B și C, împreună cu mineralele, susțin sistemul imunitar.",
            ],
          },
          {
            heading: "Când sunt recomandate",
            body: [
              "Oboseală cronică, perioade de stres, recuperare după boală, deshidratare, sau ca parte a [tratamentului post-alcool](/ro/servicii/tratament-post-alcool). Pentru detalii, vezi pagina de [perfuzii la domiciliu](/ro/servicii/perfuzii-la-domiciliu).",
            ],
          },
          {
            heading: "Sunt sigure?",
            body: [
              "Da, atunci când sunt administrate de o asistentă medicală autorizată, cu materiale sterile și după o scurtă evaluare. Medline le aduce la domiciliu, în Chișinău, rapid și în siguranță.",
            ],
          },
          {
            heading: "Concluzie",
            body: [
              "Perfuziile cu vitamine sunt un mod eficient de a-ți reda energia și de a-ți susține organismul. Sună-ne pentru o programare la domiciliu.",
            ],
          },
        ],
      },
      ru: {
        metaTitle: "Витаминные Капельницы на Дому: Польза и Когда Нужны | Medline.md",
        metaDescription:
          "Витаминные капельницы на дому в Кишинёве: что содержат, какая польза, когда рекомендуются и как ставятся безопасно. Запись 24/7.",
        keywords: "витаминные капельницы, капельница с витаминами на дому, витаминотерапия Кишинёв, капельница для иммунитета, восстановительная капельница",
        title: "Витаминные капельницы на дому: польза и когда нужны",
        excerpt: "Что такое витаминные капельницы, какую пользу приносят и в каких ситуациях помогают больше всего.",
        sections: [
          {
            body: [
              "Витаминные капельницы стали популярным способом быстро поддержать организм — особенно при усталости, после болезни или излишеств. При правильном проведении на дому это удобное и безопасное решение.",
            ],
          },
          {
            heading: "Что такое витаминные капельницы",
            body: [
              "Это растворы для внутривенного введения с витаминами, минералами и электролитами. Преимущество перед таблетками: вещества попадают прямо в кровь, с быстрым и полным усвоением.",
            ],
          },
          {
            heading: "Какая польза",
            body: [
              "### Энергия и восстановление",
              "Помогают бороться с усталостью, истощением и слабостью — особенно после болезни, нагрузок илидлительного стресса.",
              "### Гидратация и баланс",
              "Быстро восстанавливают организм при обезвоживании (после кишечных инфекций, температуры или алкоголя).",
              "### Поддержка иммунитета",
              "Витамины группы B и C вместе с минералами поддерживают иммунную систему.",
            ],
          },
          {
            heading: "Когда рекомендуются",
            body: [
              "Хроническая усталость, периоды стресса, восстановление после болезни, обезвоживание или как часть [лечения после алкоголя](/ru/servicii/lechenie-posle-alkogolya). Подробнее — на странице [капельницы на дому](/ru/servicii/kapelnicy-na-domu).",
            ],
          },
          {
            heading: "Это безопасно?",
            body: [
              "Да, если их ставит сертифицированная медсестра, стерильными материалами и после короткой оценки. Medline привозит их на дом в Кишинёве — быстро и безопасно.",
            ],
          },
          {
            heading: "Заключение",
            body: [
              "Витаминные капельницы — эффективный способ вернуть энергию и поддержать организм. Позвоните для записи на дом.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "cat-costa-perfuzie-detoxifiere",
    date: "2026-06-28",
    readMinutes: 5,
    content: {
      ro: {
        metaTitle: "Cât Costă o Perfuzie / Detoxifiere la Domiciliu — Ghid | Medline.md",
        metaDescription:
          "De ce depinde prețul unei perfuzii sau detoxifieri la domiciliu în Chișinău și cum afli tariful exact. Transparent, fără costuri ascunse.",
        keywords: "cat costa perfuzie la domiciliu, pret detoxifiere alcool, cat costa codare, pret perfuzie Chisinau, tarife asistenta medicala domiciliu",
        title: "Cât costă o perfuzie sau detoxifiere la domiciliu",
        excerpt: "De ce depinde prețul și cum afli tariful exact, fără costuri ascunse.",
        sections: [
          {
            body: [
              "Una dintre primele întrebări ale pacienților este „cât costă?”. Răspunsul corect depinde de câțiva factori — îți explicăm transparent cum se formează prețul.",
            ],
          },
          {
            heading: "De ce depinde prețul",
            body: [
              "Prețul variază în funcție de: tipul serviciului (perfuzie simplă, complex de vitamine, detoxifiere, codare), complexitatea cazului, materialele și medicamentele necesare și momentul (urgență de noapte).",
            ],
          },
          {
            heading: "De ce nu afișăm prețuri fixe",
            body: [
              "Fiecare caz e diferit. Un preț fix afișat ar fi adesea inexact. De aceea îți comunicăm tariful exact înainte de vizită, ca să știi clar la ce să te aștepți — fără costuri ascunse.",
            ],
          },
          {
            heading: "Cum afli prețul exact",
            body: [
              "Sună-ne sau scrie-ne pe WhatsApp/Viber, spune-ne de ce ai nevoie, iar noi îți spunem prețul pe loc. Vezi și lista de [servicii prestate](/ro/preturi) sau pagina de [detoxifiere](/ro/detoxifiere).",
            ],
          },
          {
            heading: "Concluzie",
            body: [
              "La Medline, prețul e transparent și comunicat înainte de programare. Contactează-ne pentru o ofertă exactă, fără obligații.",
            ],
          },
        ],
      },
      ru: {
        metaTitle: "Сколько Стоит Капельница / Детокс на Дому — Гид | Medline.md",
        metaDescription:
          "От чего зависит цена капельницы или детоксикации на дому в Кишинёве и как узнать точную стоимость. Прозрачно, без скрытых платежей.",
        keywords: "сколько стоит капельница на дому, цена вывода из запоя, сколько стоит кодирование, цена капельницы Кишинёв, тарифы медпомощи на дому",
        title: "Сколько стоит капельница или детоксикация на дому",
        excerpt: "От чего зависит цена и как узнать точную стоимость, без скрытых платежей.",
        sections: [
          {
            body: [
              "Один из первых вопросов пациентов — «сколько стоит?». Правильный ответ зависит от нескольких факторов — объясняем прозрачно, как формируется цена.",
            ],
          },
          {
            heading: "От чего зависит цена",
            body: [
              "Цена зависит от: типа услуги (простая капельница, витаминный комплекс, детокс, кодирование), сложности случая, необходимых материалов и препаратов и времени (срочный ночной вызов).",
            ],
          },
          {
            heading: "Почему мы не показываем фиксированные цены",
            body: [
              "Каждый случай разный. Фиксированная цена часто была бы неточной. Поэтому мы сообщаем точную стоимость до визита, чтобы вы чётко знали, чего ожидать — без скрытых платежей.",
            ],
          },
          {
            heading: "Как узнать точную цену",
            body: [
              "Позвоните или напишите в WhatsApp/Viber, скажите, что нужно, и мы назовём цену сразу. Смотрите также [перечень услуг](/ru/preturi) или страницу [вывод из запоя](/ru/detoxifiere).",
            ],
          },
          {
            heading: "Заключение",
            body: [
              "В Medline цена прозрачна и сообщается до записи. Свяжитесь с нами для точного расчёта, без обязательств.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "ingrijire-parinte-imobilizat",
    date: "2026-06-27",
    readMinutes: 6,
    content: {
      ro: {
        metaTitle: "Îngrijirea unui Părinte Imobilizat la Domiciliu: Ghid Practic | Medline.md",
        metaDescription:
          "Cum îngrijești un părinte imobilizat la domiciliu: prevenirea escarelor, igienă, mobilizare, alimentație și sprijin medical. Ghid practic + ajutor profesionist.",
        keywords: "ingrijire parinte imobilizat, ingrijire persoana imobilizata, prevenire escare, ingrijire la pat, ingrijire bolnav imobilizat Chisinau",
        title: "Îngrijirea unui părinte imobilizat la domiciliu: ghid practic",
        excerpt: "Sfaturi practice pentru o îngrijire sigură și demnă a unei persoane imobilizate la pat.",
        sections: [
          {
            body: [
              "Îngrijirea unui părinte imobilizat este o responsabilitate plină de iubire, dar solicitantă fizic și emoțional. Acest ghid îți oferă repere practice ca îngrijirea să fie sigură și demnă.",
            ],
          },
          {
            heading: "Prevenirea escarelor",
            body: [
              "Escarele (rănile de presiune) apar la persoanele care stau mult la pat. Schimbă poziția pacientului la fiecare 2 ore, folosește saltele speciale și menține pielea curată și uscată.",
            ],
          },
          {
            heading: "Igiena zilnică",
            body: [
              "Igiena regulată previne infecțiile și menține confortul. Pentru persoanele imobilizate există tehnici de igienă la pat — o asistentă medicală te poate ghida sau prelua aceste sarcini.",
            ],
          },
          {
            heading: "Alimentația și hidratarea",
            body: [
              "Mese mici și dese, ușor de înghițit, cu hidratare suficientă. Atenție la poziția în timpul mesei pentru a evita înecul.",
            ],
          },
          {
            heading: "Sprijinul medical la domiciliu",
            body: [
              "Pansamentele, perfuziile, injecțiile și monitorizarea funcțiilor vitale pot fi făcute acasă de o asistentă. Vezi serviciul nostru de [îngrijire a bolnavilor la domiciliu](/ro/servicii/ingrijire-bolnavi-la-domiciliu).",
            ],
          },
          {
            heading: "Ai grijă și de tine",
            body: [
              "Îngrijitorii obosesc. Acceptă ajutor — fie de la familie, fie de la o echipă profesionistă. Medline poate prelua sarcinile medicale, ca tu să ai timp pentru relația cu cel drag.",
            ],
          },
        ],
      },
      ru: {
        metaTitle: "Уход за Лежачим Родителем на Дому: Практический Гид | Medline.md",
        metaDescription:
          "Как ухаживать за лежачим родителем на дому: профилактика пролежней, гигиена, мобилизация, питание и медицинская поддержка. Практический гид + помощь специалиста.",
        keywords: "уход за лежачим родителем, уход за лежачим больным, профилактика пролежней, уход за лежачими на дому Кишинёв",
        title: "Уход за лежачим родителем на дому: практический гид",
        excerpt: "Практичные советы для безопасного и достойного ухода за лежачим человеком.",
        sections: [
          {
            body: [
              "Уход за лежачим родителем — это ответственность, полная любви, но трудная физически и эмоционально. Этот гид даёт практичные ориентиры, чтобы уход был безопасным и достойным.",
            ],
          },
          {
            heading: "Профилактика пролежней",
            body: [
              "Пролежни появляются у тех, кто долго лежит. Меняйте положение пациента каждые 2 часа, используйте специальные матрасы и держите кожу чистой и сухой.",
            ],
          },
          {
            heading: "Ежедневная гигиена",
            body: [
              "Регулярная гигиена предотвращает инфекции и поддерживает комфорт. Для лежачих есть техники гигиены в постели — медсестра подскажет или возьмёт это на себя.",
            ],
          },
          {
            heading: "Питание и гидратация",
            body: [
              "Частые небольшие приёмы пищи, лёгкие для глотания, с достаточным питьём. Следите за положением во время еды, чтобы избежать поперхивания.",
            ],
          },
          {
            heading: "Медицинская поддержка на дому",
            body: [
              "Перевязки, капельницы, инъекции и контроль показателей можно делать дома силами медсестры. Смотрите нашу услугу [уход за больными на дому](/ru/servicii/uhod-za-bolnymi-na-domu).",
            ],
          },
          {
            heading: "Берегите и себя",
            body: [
              "Те, кто ухаживает, устают. Принимайте помощь — от семьи или профессиональной команды. Medline может взять на себя медицинские задачи, чтобы у вас оставалось время на близкого человека.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "semne-varstnic-are-nevoie-ingrijire",
    date: "2026-06-26",
    readMinutes: 5,
    content: {
      ro: {
        metaTitle: "Semne că un Vârstnic Are Nevoie de Îngrijire la Domiciliu | Medline.md",
        metaDescription:
          "Cum îți dai seama că un vârstnic are nevoie de ajutor la domiciliu: semne fizice, cognitive și de siguranță. Ghid pentru familii + sprijin profesionist în Chișinău.",
        keywords: "semne varstnic are nevoie de ingrijire, ingrijire varstnici la domiciliu, ajutor batrani acasa, ingrijire batrani Chisinau",
        title: "Semne că un vârstnic are nevoie de îngrijire la domiciliu",
        excerpt: "Semnele la care să fii atent ca să știi când e momentul să ceri ajutor pentru un părinte vârstnic.",
        sections: [
          {
            body: [
              "Mulți vârstnici nu cer ajutor, ca să nu-și împovăreze familia. De aceea e important să recunoști semnele că au nevoie de sprijin la domiciliu.",
            ],
          },
          {
            heading: "Semne fizice",
            body: [
              "Slăbiciune, căderi frecvente, dificultăți la deplasare, scădere în greutate, igienă personală neglijată sau dificultăți la activitățile zilnice (gătit, îmbrăcat).",
            ],
          },
          {
            heading: "Semne cognitive",
            body: [
              "Uitarea medicamentelor, confuzie, dezorientare, repetarea acelorași întrebări sau neglijarea facturilor și treburilor casnice.",
            ],
          },
          {
            heading: "Semne de siguranță",
            body: [
              "Aragaz lăsat aprins, uși descuiate, rătăcirea prin casă, sau accidente casnice repetate. Acestea indică nevoia urgentă de supraveghere.",
            ],
          },
          {
            heading: "Ce poți face",
            body: [
              "Nu aștepta o criză. O asistentă medicală la domiciliu poate ajuta cu medicația, igiena, monitorizarea sănătății și companie. Vezi serviciul de [îngrijire a vârstnicilor la domiciliu](/ro/servicii/ingrijire-bolnavi-la-domiciliu).",
            ],
          },
          {
            heading: "Concluzie",
            body: [
              "Recunoașterea din timp a acestor semne îți protejează părintele. Medline oferă îngrijire la domiciliu în Chișinău, cu profesionalism și empatie — contactează-ne.",
            ],
          },
        ],
      },
      ru: {
        metaTitle: "Признаки, что Пожилому Нужен Уход на Дому | Medline.md",
        metaDescription:
          "Как понять, что пожилому человеку нужна помощь на дому: физические, когнитивные признаки и признаки безопасности. Гид для семей + помощь специалиста в Кишинёве.",
        keywords: "признаки что нужен уход пожилому, уход за пожилыми на дому, помощь пожилым дома, уход за стариками Кишинёв",
        title: "Признаки, что пожилому человеку нужен уход на дому",
        excerpt: "Признаки, на которые стоит обратить внимание, чтобы понять, когда пора просить помощь для пожилого родителя.",
        sections: [
          {
            body: [
              "Многие пожилые не просят помощи, чтобы не обременять семью. Поэтому важно распознать признаки того, что им нужна поддержка на дому.",
            ],
          },
          {
            heading: "Физические признаки",
            body: [
              "Слабость, частые падения, трудности с передвижением, потеря веса, запущенная личная гигиена или трудности с повседневными делами (готовка, одевание).",
            ],
          },
          {
            heading: "Когнитивные признаки",
            body: [
              "Забывание лекарств, спутанность, дезориентация, повторение одних и тех же вопросов или запущенные счета и домашние дела.",
            ],
          },
          {
            heading: "Признаки безопасности",
            body: [
              "Оставленная включённая плита, незапертые двери, блуждание по дому или повторяющиеся бытовые происшествия. Это указывает на срочную необходимость присмотра.",
            ],
          },
          {
            heading: "Что можно сделать",
            body: [
              "Не ждите кризиса. Медсестра на дому поможет с лекарствами, гигиеной, контролем здоровья и общением. Смотрите услугу [уход за пожилыми на дому](/ru/servicii/uhod-za-bolnymi-na-domu).",
            ],
          },
          {
            heading: "Заключение",
            body: [
              "Раннее распознавание этих признаков защищает вашего родителя. Medline предоставляет уход на дому в Кишинёве, с профессионализмом и заботой — свяжитесь с нами.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "metode-codare-anti-alcool",
    date: "2026-06-21",
    readMinutes: 8,
    content: {
      ro: {
        metaTitle: "Metode de Codare Anti-Alcool: Tipuri și Cum Alegi | Medline.md",
        metaDescription:
          "Ghid complet despre metodele de codare anti-alcool: tipuri, cum funcționează fiecare, cum alegi metoda potrivită și ce condiții sunt necesare. Codare la domiciliu în Chișinău.",
        keywords: "metode codare anti-alcool, tipuri de codare alcool, cum functioneaza codarea, codare alcool Chisinau, codare la domiciliu",
        title: "Metode de codare anti-alcool: tipuri și cum alegi",
        excerpt: "Ce metode de codare există, cum funcționează fiecare și cum o alegi pe cea potrivită pentru tine.",
        sections: [
          {
            body: [
              "Codarea anti-alcool este una dintre cele mai cunoscute forme de sprijin în renunțarea la alcool, dar puțini știu că există mai multe abordări. În acest ghid îți explicăm tipurile principale, cum funcționează și cum alegi metoda potrivită — pe înțelesul tuturor.",
            ],
          },
          {
            heading: "Pe scurt: ce este codarea",
            body: [
              "Codarea este o procedură care întărește decizia de a nu mai consuma alcool, funcționând cel mai bine ca parte a unei hotărâri ferme și, ideal, cu sprijin psihologic. Pentru detalii complete, vezi [pagina noastră despre codarea anti-alcool](/ro/servicii/codare-anti-alcool).",
            ],
          },
          {
            heading: "Tipurile principale de codare",
            body: [
              "### Codarea medicamentoasă",
              "Se bazează pe substanțe care creează o reacție neplăcută în cazul consumului de alcool, descurajând astfel băutul. Se face numai după evaluare medicală și cu acordul informat al pacientului.",
              "### Codarea psihoterapeutică",
              "Folosește tehnici psihologice care întăresc respingerea alcoolului și motivația de a rămâne treaz. Funcționează cel mai bine la persoanele receptive și cu o decizie clară.",
              "### Abordarea combinată",
              "Multe cazuri răspund cel mai bine la o combinație: pregătire (inclusiv detoxifiere dacă e nevoie), codare și sprijin psihologic ulterior. Astfel se acoperă atât latura fizică, cât și cea mentală.",
            ],
          },
          {
            heading: "Cum se alege metoda potrivită",
            body: [
              "Alegerea depinde de starea de sănătate, de istoricul consumului și de preferințele pacientului. De aceea, o evaluare prealabilă este esențială — nu există o metodă universală.",
              "Cel mai important factor rămâne decizia personală: codarea ajută, dar nu înlocuiește dorința reală de a renunța.",
            ],
          },
          {
            heading: "Condiții și evaluare prealabilă",
            body: [
              "Înainte de orice codare este necesară o perioadă de abstinență (stabilită în funcție de caz) și o evaluare a stării de sănătate, pentru a exclude contraindicațiile. Dacă persoana vine după o perioadă lungă de consum, poate fi nevoie întâi de [tratament post-alcool](/ro/servicii/tratament-post-alcool).",
            ],
          },
          {
            heading: "Ce rezultate să aștepți",
            body: [
              "Codarea poate fi un sprijin eficient, dar rezultatul pe termen lung depinde de implicarea persoanei și de mediul de susținere. Recăderile nu înseamnă eșec — fac parte din proces, iar ajutorul rămâne disponibil.",
            ],
          },
          {
            heading: "Codarea la domiciliu",
            body: [
              "La Medline oferim codare la domiciliu, în Chișinău, în condiții sigure și discrete, după evaluarea prealabilă. Totul este confidențial, fără judecăți.",
            ],
          },
          {
            heading: "Întrebări frecvente",
            body: [
              "### Care metodă e cea mai bună?",
              "Nu există un răspuns unic — cea mai bună metodă e cea potrivită cazului tău, stabilită după evaluare.",
              "### Codarea funcționează fără voință?",
              "Nu. Dorința reală de a renunța rămâne factorul decisiv; codarea o susține.",
            ],
          },
          {
            heading: "Concluzie",
            body: [
              "Există mai multe metode de codare, iar alegerea corectă se face împreună cu un specialist, după o evaluare. Echipa Medline te ghidează cu profesionalism și discreție — contactează-ne pentru o evaluare.",
            ],
          },
        ],
      },
      ru: {
        metaTitle: "Методы Кодирования от Алкоголя: Виды и Как Выбрать | Medline.md",
        metaDescription:
          "Полный гид по методам кодирования от алкоголя: виды, как работает каждый, как выбрать подходящий и какие условия нужны. Кодирование на дому в Кишинёве.",
        keywords: "методы кодирования от алкоголя, виды кодирования, как работает кодирование, кодирование от алкоголя Кишинёв, кодирование на дому",
        title: "Методы кодирования от алкоголя: виды и как выбрать",
        excerpt: "Какие методы кодирования существуют, как работает каждый и как выбрать подходящий именно вам.",
        sections: [
          {
            body: [
              "Кодирование от алкоголя — одна из самых известных форм поддержки при отказе от алкоголя, но мало кто знает, что подходов несколько. В этом гиде мы простыми словами объясняем основные виды, как они работают и как выбрать подходящий метод.",
            ],
          },
          {
            heading: "Коротко: что такое кодирование",
            body: [
              "Кодирование — это процедура, которая укрепляет решение не употреблять алкоголь и работает лучше всего как часть твёрдого решения и, в идеале, с психологической поддержкой. Подробнее — на [нашей странице о кодировании](/ru/servicii/kodirovanie-ot-alkogolya).",
            ],
          },
          {
            heading: "Основные виды кодирования",
            body: [
              "### Медикаментозное кодирование",
              "Основано на веществах, вызывающих неприятную реакцию при употреблении алкоголя, что отбивает желание пить. Проводится только после медицинской оценки и с информированного согласия пациента.",
              "### Психотерапевтическое кодирование",
              "Использует психологические техники, укрепляющие отторжение алкоголя и мотивацию оставаться трезвым. Работает лучше у людей восприимчивых и с чётким решением.",
              "### Комбинированный подход",
              "Многие случаи лучше всего отвечают на сочетание: подготовка (включая детоксикацию при необходимости), кодирование и последующая психологическая поддержка. Так охватывается и физическая, и ментальная сторона.",
            ],
          },
          {
            heading: "Как выбрать подходящий метод",
            body: [
              "Выбор зависит от состояния здоровья, истории употребления и предпочтений пациента. Поэтому предварительная оценка обязательна — универсального метода нет.",
              "Самый важный фактор — личное решение: кодирование помогает, но не заменяет реальное желание бросить.",
            ],
          },
          {
            heading: "Условия и предварительная оценка",
            body: [
              "Перед любым кодированием нужен период трезвости (определяется по случаю) и оценка состояния здоровья, чтобы исключить противопоказания. Если человек приходит после долгого употребления, может сначала понадобиться [лечение после алкоголя](/ru/servicii/lechenie-posle-alkogolya).",
            ],
          },
          {
            heading: "Каких результатов ожидать",
            body: [
              "Кодирование может быть эффективной поддержкой, но долгосрочный результат зависит от вовлечённости человека и поддерживающей среды. Срывы не означают провал — это часть процесса, и помощь остаётся доступной.",
            ],
          },
          {
            heading: "Кодирование на дому",
            body: [
              "В Medline мы предлагаем кодирование на дому в Кишинёве, в безопасных и дискретных условиях, после предварительной оценки. Всё конфиденциально, без осуждения.",
            ],
          },
          {
            heading: "Частые вопросы",
            body: [
              "### Какой метод лучший?",
              "Единого ответа нет — лучший метод тот, что подходит вашему случаю, и определяется после оценки.",
              "### Работает ли кодирование без воли?",
              "Нет. Реальное желание бросить остаётся решающим; кодирование его поддерживает.",
            ],
          },
          {
            heading: "Заключение",
            body: [
              "Методов кодирования несколько, и правильный выбор делается вместе со специалистом, после оценки. Команда Medline сопровождает вас профессионально и деликатно — свяжитесь с нами для оценки.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "codare-sau-tratament-post-alcool",
    date: "2026-06-09",
    readMinutes: 7,
    content: {
      ro: {
        metaTitle: "Codare sau Tratament Post-Alcool? Diferențe și Cum Alegi | Medline.md",
        metaDescription:
          "Codare sau tratament post-alcool? Explicăm diferențele, când se folosește fiecare, ordinea corectă (detoxifiere apoi codare) și cum alegi. La domiciliu, în Chișinău.",
        keywords: "codare sau tratament post-alcool, diferenta codare detoxifiere, ce alegi codare sau perfuzie, codare alcool Chisinau",
        title: "Codare sau tratament post-alcool? Diferențe și cum alegi",
        excerpt: "Care e diferența dintre codare și tratamentul post-alcool și cum alegi ce ai nevoie.",
        sections: [
          {
            body: [
              "Mulți confundă codarea cu tratamentul post-alcool, dar sunt două lucruri diferite care rezolvă probleme diferite. Acest articol îți explică clar diferențele și cum alegi.",
            ],
          },
          {
            heading: "Ce este tratamentul post-alcool",
            body: [
              "[Tratamentul post-alcool](/ro/servicii/tratament-post-alcool) (detoxifierea) ajută organismul să se refacă imediat după consum: perfuzii cu rehidratare și vitamine care reduc greața, tremurăturile și starea de rău. Rezolvă latura fizică.",
            ],
          },
          {
            heading: "Ce este codarea",
            body: [
              "[Codarea](/ro/servicii/codare-anti-alcool) țintește latura comportamentală: întărește decizia de a nu mai consuma alcool pe termen lung. Nu este un detox, ci un pas spre abstinență.",
            ],
          },
          {
            heading: "Diferențele cheie",
            body: [
              "### Scopul",
              "Tratamentul post-alcool = refacere fizică imediată. Codarea = sprijin pentru abstinență pe termen lung.",
              "### Momentul",
              "Detoxifierea se face în/imediat după consum. Codarea se face după o perioadă de abstinență și o evaluare.",
            ],
          },
          {
            heading: "Care e ordinea corectă",
            body: [
              "De obicei, întâi detoxifierea (dacă persoana vine după consum), apoi, după stabilizare și o perioadă fără alcool, codarea. Astfel corpul e pregătit, iar decizia e luată cu mintea limpede.",
            ],
          },
          {
            heading: "Cum alegi",
            body: [
              "Dacă cineva tocmai a băut și se simte rău → tratament post-alcool. Dacă persoana vrea să renunțe definitiv și a trecut prin abstinență → codare. Cel mai bine, lasă un specialist să recomande după o evaluare.",
            ],
          },
          {
            heading: "Întrebări frecvente",
            body: [
              "### Pot face codare imediat după ce am băut?",
              "Nu. Codarea necesită o perioadă de abstinență prealabilă. Întâi se stabilizează organismul.",
              "### Pot face ambele?",
              "Da, adesea sunt complementare: detoxifiere acum, codare ca pas următor.",
            ],
          },
          {
            heading: "Concluzie",
            body: [
              "Tratamentul post-alcool și codarea se completează: unul reface corpul, celălalt susține abstinența. Medline le oferă pe ambele, la domiciliu în Chișinău. Sună-ne și îți recomandăm ce ți se potrivește.",
            ],
          },
        ],
      },
      ru: {
        metaTitle: "Кодирование или Лечение после Алкоголя? Отличия и Выбор | Medline.md",
        metaDescription:
          "Кодирование или лечение после алкоголя? Объясняем отличия, когда что применяется, правильный порядок (детокс, затем кодирование) и как выбрать. На дому в Кишинёве.",
        keywords: "кодирование или лечение после алкоголя, разница кодирование детоксикация, что выбрать кодирование или капельница, кодирование Кишинёв",
        title: "Кодирование или лечение после алкоголя? Отличия и выбор",
        excerpt: "В чём разница между кодированием и лечением после алкоголя и как выбрать то, что нужно.",
        sections: [
          {
            body: [
              "Многие путают кодирование с лечением после алкоголя, но это две разные вещи, решающие разные задачи. Эта статья ясно объясняет отличия и как выбрать.",
            ],
          },
          {
            heading: "Что такое лечение после алкоголя",
            body: [
              "[Лечение после алкоголя](/ru/servicii/lechenie-posle-alkogolya) (детоксикация) помогает организму восстановиться сразу после употребления: капельницы с регидратацией и витаминами, снижающие тошноту, тремор и плохое самочувствие. Решает физическую сторону.",
            ],
          },
          {
            heading: "Что такое кодирование",
            body: [
              "[Кодирование](/ru/servicii/kodirovanie-ot-alkogolya) нацелено на поведенческую сторону: укрепляет решение не употреблять алкоголь надолго. Это не детокс, а шаг к трезвости.",
            ],
          },
          {
            heading: "Ключевые отличия",
            body: [
              "### Цель",
              "Лечение после алкоголя = немедленное физическое восстановление. Кодирование = поддержка трезвости надолго.",
              "### Момент",
              "Детоксикация делается во время/сразу после употребления. Кодирование — после периода трезвости и оценки.",
            ],
          },
          {
            heading: "Какой правильный порядок",
            body: [
              "Обычно сначала детоксикация (если человек приходит после употребления), затем, после стабилизации и периода без алкоголя — кодирование. Так тело подготовлено, а решение принято на трезвую голову.",
            ],
          },
          {
            heading: "Как выбрать",
            body: [
              "Если человек только что выпил и плохо себя чувствует → лечение после алкоголя. Если хочет отказаться навсегда и прошёл период трезвости → кодирование. Лучше всего — пусть специалист порекомендует после оценки.",
            ],
          },
          {
            heading: "Частые вопросы",
            body: [
              "### Можно ли кодироваться сразу после выпивки?",
              "Нет. Кодирование требует предварительного периода трезвости. Сначала стабилизируют организм.",
              "### Можно ли сделать оба?",
              "Да, часто они дополняют друг друга: детокс сейчас, кодирование как следующий шаг.",
            ],
          },
          {
            heading: "Заключение",
            body: [
              "Лечение после алкоголя и кодирование дополняют друг друга: одно восстанавливает тело, другое поддерживает трезвость. Medline предлагает оба, на дому в Кишинёве. Позвоните — порекомендуем, что вам подходит.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "pregatire-codare-anti-alcool",
    date: "2026-06-08",
    readMinutes: 7,
    content: {
      ro: {
        metaTitle: "Pregătirea pentru Codarea Anti-Alcool: Ghid Pas cu Pas | Medline.md",
        metaDescription:
          "Cum te pregătești corect pentru codarea anti-alcool: perioada de abstinență, evaluarea medicală, ce să eviți și ce se întâmplă în ziua procedurii. La domiciliu, Chișinău.",
        keywords: "pregatire codare anti-alcool, ce trebuie inainte de codare, perioada abstinenta codare, codare la domiciliu Chisinau",
        title: "Pregătirea pentru codarea anti-alcool: ghid pas cu pas",
        excerpt: "Tot ce trebuie să faci înainte de codare ca procedura să fie sigură și eficientă.",
        sections: [
          {
            body: [
              "O codare reușită începe cu o pregătire corectă. Acest ghid îți explică pas cu pas ce trebuie să faci înainte, ca procedura să fie sigură și cu șanse mari de rezultat.",
            ],
          },
          {
            heading: "De ce contează pregătirea",
            body: [
              "Pregătirea asigură siguranța (excluderea contraindicațiilor) și crește eficiența codării. Fără ea, procedura nu se poate face corect.",
            ],
          },
          {
            heading: "Pașii de pregătire",
            body: [
              "### 1. Perioada de abstinență",
              "Înainte de codare este obligatorie o perioadă fără alcool, stabilită în funcție de caz. Codarea nu se face dacă persoana este sub influența alcoolului. Dacă vii după o perioadă lungă de consum, poate fi nevoie întâi de [tratament post-alcool](/ro/servicii/tratament-post-alcool).",
              "### 2. Evaluarea medicală",
              "Se verifică starea de sănătate și eventualele contraindicații. De aceea evaluarea prealabilă este obligatorie — siguranța ta este pe primul loc.",
              "### 3. Decizia fermă",
              "Codarea funcționează cel mai bine când vine dintr-o hotărâre personală clară. Discută cu cei apropiați și pregătește-te mental pentru schimbare.",
            ],
          },
          {
            heading: "Ce să eviți înainte",
            body: [
              "Evită consumul de alcool în perioada recomandată înainte de procedură și informează asistenta despre orice medicamente sau afecțiuni. Onestitatea la evaluare este esențială pentru siguranță.",
            ],
          },
          {
            heading: "În ziua procedurii",
            body: [
              "Asigură-te că ești odihnit și hidratat. Procedura se efectuează în condiții sterile, iar tu primești toate informațiile și îți dai acordul informat înainte.",
            ],
          },
          {
            heading: "După codare",
            body: [
              "Sprijinul familiei, evitarea mediilor asociate cu băutul și, ideal, consilierea psihologică ajută la menținerea rezultatului pe termen lung.",
            ],
          },
          {
            heading: "Întrebări frecvente",
            body: [
              "### Cât trebuie să nu beau înainte?",
              "Perioada se stabilește la evaluare, în funcție de caz. Te informăm exact când ne contactezi.",
              "### Se face la domiciliu?",
              "Da, oferim [codare la domiciliu](/ro/servicii/codare-anti-alcool) în Chișinău, discret și în siguranță.",
            ],
          },
          {
            heading: "Concluzie",
            body: [
              "Pregătirea corectă face diferența între o codare sigură și eficientă și una riscantă. Echipa Medline te ghidează la fiecare pas. Contactează-ne pentru o evaluare și îți explicăm exact ce ai de făcut.",
            ],
          },
        ],
      },
      ru: {
        metaTitle: "Подготовка к Кодированию от Алкоголя: Пошаговый Гид | Medline.md",
        metaDescription:
          "Как правильно подготовиться к кодированию от алкоголя: период трезвости, медицинская оценка, чего избегать и что происходит в день процедуры. На дому, Кишинёв.",
        keywords: "подготовка к кодированию, что нужно перед кодированием, период трезвости кодирование, кодирование на дому Кишинёв",
        title: "Подготовка к кодированию от алкоголя: пошаговый гид",
        excerpt: "Всё, что нужно сделать перед кодированием, чтобы процедура была безопасной и эффективной.",
        sections: [
          {
            body: [
              "Успешное кодирование начинается с правильной подготовки. Этот гид пошагово объясняет, что нужно сделать заранее, чтобы процедура была безопасной и с высокими шансами на результат.",
            ],
          },
          {
            heading: "Почему важна подготовка",
            body: [
              "Подготовка обеспечивает безопасность (исключение противопоказаний) и повышает эффективность кодирования. Без неё процедуру нельзя провести правильно.",
            ],
          },
          {
            heading: "Шаги подготовки",
            body: [
              "### 1. Период трезвости",
              "Перед кодированием обязателен период без алкоголя, определяемый по случаю. Кодирование не проводится, если человек под воздействием алкоголя. Если приходите после долгого употребления, может сначала понадобиться [лечение после алкоголя](/ru/servicii/lechenie-posle-alkogolya).",
              "### 2. Медицинская оценка",
              "Проверяется состояние здоровья и возможные противопоказания. Поэтому предварительная оценка обязательна — ваша безопасность на первом месте.",
              "### 3. Твёрдое решение",
              "Кодирование работает лучше всего, когда исходит из ясного личного решения. Поговорите с близкими и подготовьтесь к переменам морально.",
            ],
          },
          {
            heading: "Чего избегать заранее",
            body: [
              "Избегайте алкоголя в рекомендованный период перед процедурой и сообщите медсестре о любых препаратах или заболеваниях. Честность при оценке крайне важна для безопасности.",
            ],
          },
          {
            heading: "В день процедуры",
            body: [
              "Убедитесь, что вы отдохнули и достаточно пьёте воду. Процедура проводится в стерильных условиях, и вы получаете всю информацию и даёте информированное согласие заранее.",
            ],
          },
          {
            heading: "После кодирования",
            body: [
              "Поддержка семьи, избегание мест, связанных с выпивкой, и, в идеале, психологическое консультирование помогают сохранить результат надолго.",
            ],
          },
          {
            heading: "Частые вопросы",
            body: [
              "### Сколько нельзя пить заранее?",
              "Период определяется при оценке, в зависимости от случая. Сообщим точно, когда вы свяжетесь с нами.",
              "### Делается ли на дому?",
              "Да, мы предлагаем [кодирование на дому](/ru/servicii/kodirovanie-ot-alkogolya) в Кишинёве, дискретно и безопасно.",
            ],
          },
          {
            heading: "Заключение",
            body: [
              "Правильная подготовка — это разница между безопасным, эффективным кодированием и рискованным. Команда Medline сопровождает вас на каждом шаге. Свяжитесь с нами для оценки — объясним, что именно нужно сделать.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "ghid-complet-iesire-din-binge",
    date: "2026-06-20",
    readMinutes: 9,
    content: {
      ro: {
        metaTitle: "Ieșirea din Binge (Vivod iz Zapoya): Ghid Complet Pas cu Pas | Medline.md",
        metaDescription:
          "Ghid complet despre ieșirea din binge (beție prelungită) la domiciliu, în siguranță: ce este, de ce e periculos, ce să NU faci, cum decurge detoxifierea și recuperarea. Chișinău, 24/7.",
        keywords: "iesire din binge, vivod iz zapoya Chisinau, betie prelungita ce fac, detoxifiere alcool la domiciliu, sevraj alcoolic",
        title: "Ieșirea din binge: ghid complet pas cu pas",
        excerpt: "Tot ce trebuie să știi despre ieșirea din binge la domiciliu, în siguranță — de la primele semne până la recuperare.",
        sections: [
          {
            body: [
              "O beție prelungită (binge sau „запой”) este o perioadă de consum continuu de alcool, de la câteva zile până la săptămâni, în care persoana nu mai poate să se oprească singură. Ieșirea din această stare necesită răbdare, sprijin și, de cele mai multe ori, ajutor medical. Acest ghid complet îți explică pas cu pas ce se întâmplă și cum poți ajuta — în siguranță și cu respect.",
            ],
          },
          {
            heading: "Ce este o beție prelungită (binge)",
            body: [
              "Spre deosebire de o seară cu exces de alcool, binge-ul este un consum repetat, zilnic, care se autoîntreține: persoana bea ca să evite simptomele neplăcute care apar când se oprește. Astfel se intră într-un cerc vicios greu de spart fără ajutor.",
              "Recunoașterea problemei este primul pas. Nu este o chestiune de „voință slabă”, ci o stare medicală care răspunde la tratament corect.",
            ],
          },
          {
            heading: "De ce este periculos",
            body: [
              "### Sindromul de sevraj",
              "Când organismul s-a obișnuit cu alcoolul, oprirea bruscă declanșează sevrajul: tremurături, transpirații, anxietate, greață, insomnie, tahicardie. În cazurile severe pot apărea halucinații sau convulsii (delirium tremens), care sunt urgențe medicale.",
              "### Riscuri pentru sănătate",
              "Deshidratarea, dezechilibrele electrolitice și epuizarea vitaminelor (mai ales B1) pot afecta inima, ficatul și creierul. De aceea, ieșirea din binge nu trebuie făcută oricum, ci cu sprijin medical.",
            ],
          },
          {
            heading: "Ce să NU faci niciodată",
            body: [
              "Nu forța persoana să se oprească brusc, fără supraveghere — sevrajul necontrolat e periculos. Nu o certa și nu o umili: rușinea adâncește problema. Nu-i da „încă un pahar ca să-i treacă” — doar prelungește binge-ul. Și nu ignora semnele grave (confuzie, convulsii, vărsături cu sânge) — sună imediat la 112.",
            ],
          },
          {
            heading: "Cum decurge ieșirea din binge la domiciliu",
            body: [
              "### 1. Evaluarea",
              "Asistenta medicală evaluează starea generală, măsoară tensiunea, pulsul și întreabă despre durata și cantitatea consumului. Astfel stabilește tratamentul potrivit și depistează eventualele riscuri.",
              "### 2. Perfuzia de detoxifiere",
              "Se administrează o perfuzie cu soluții de rehidratare, vitamine (în special grupul B) și substanțe care reduc greața, tremurăturile și anxietatea. Organismul începe să se refacă, iar simptomele se ameliorează vizibil.",
              "### 3. Monitorizarea",
              "Pe durata procedurii, asistenta rămâne alături și urmărește reacția pacientului. La nevoie, ajustează tratamentul sau recomandă un consult suplimentar.",
            ],
          },
          {
            heading: "După detoxifiere: recuperarea",
            body: [
              "Refacerea continuă și după perfuzie: hidratare, somn, mese ușoare și evitarea efortului. Primele 24–48 de ore sunt cele mai importante pentru stabilizare.",
              "Sprijinul emoțional al familiei, fără reproșuri, crește mult șansele de recuperare. Pentru mulți pacienți, acesta este momentul potrivit pentru a discuta despre pașii pe termen lung.",
            ],
          },
          {
            heading: "Codarea — pasul spre abstinență",
            body: [
              "Detoxifierea rezolvă starea fizică imediată, dar nu și dependența. Pentru cei care vor să rămână fără alcool, [codarea](/ro/servicii/codare-anti-alcool) (după o evaluare și o perioadă de abstinență) poate fi un pas eficient, mai ales împreună cu sprijin psihologic.",
            ],
          },
          {
            heading: "Întrebări frecvente",
            body: [
              "### Cât durează ieșirea din binge?",
              "Ameliorarea simptomelor începe de obicei în câteva ore de la perfuzie, dar refacerea completă poate dura câteva zile, în funcție de durata consumului.",
              "### Este confidențial?",
              "Da, complet. Toate vizitele sunt discrete, la domiciliu, fără judecăți și fără divulgarea informațiilor.",
              "### Pot face asta singur acasă, fără medic?",
              "Nu este recomandat. Sevrajul necontrolat poate fi periculos. Supravegherea unei asistente medicale face procesul sigur și mult mai blând.",
            ],
          },
          {
            heading: "Concluzie",
            body: [
              "Ieșirea din binge este posibilă și sigură atunci când este făcută corect, cu sprijin medical și fără judecăți. Echipa Medline vine la domiciliu, în Chișinău, discret și 24/7. Dacă tu sau cineva drag are nevoie de ajutor, sună-ne — facem primul pas împreună.",
            ],
          },
        ],
      },
      ru: {
        metaTitle: "Вывод из Запоя: Полный Гид Шаг за Шагом | Medline.md",
        metaDescription:
          "Полный гид по выводу из запоя на дому, безопасно: что это, чем опасно, чего НЕ делать, как проходит детоксикация и восстановление. Кишинёв, 24/7.",
        keywords: "вывод из запоя, вывод из запоя Кишинёв, запой что делать, детоксикация на дому, алкогольная абстиненция",
        title: "Вывод из запоя: полный гид шаг за шагом",
        excerpt: "Всё, что нужно знать о выводе из запоя на дому безопасно — от первых признаков до восстановления.",
        sections: [
          {
            body: [
              "Запой — это период непрерывного употребления алкоголя, от нескольких дней до недель, когда человек уже не может остановиться сам. Выход из этого состояния требует терпения, поддержки и чаще всего — медицинской помощи. Этот полный гид шаг за шагом объясняет, что происходит и как помочь — безопасно и с уважением.",
            ],
          },
          {
            heading: "Что такое запой",
            body: [
              "В отличие от вечера с избытком алкоголя, запой — это повторяющееся, ежедневное употребление, которое само себя поддерживает: человек пьёт, чтобы избежать неприятных симптомов, возникающих при остановке. Так возникает порочный круг, который трудно разорвать без помощи.",
              "Признание проблемы — первый шаг. Это не вопрос «слабой воли», а медицинское состояние, поддающееся правильному лечению.",
            ],
          },
          {
            heading: "Чем это опасно",
            body: [
              "### Абстинентный синдром",
              "Когда организм привык к алкоголю, резкая остановка вызывает абстиненцию: тремор, потливость, тревогу, тошноту, бессонницу, тахикардию. В тяжёлых случаях возможны галлюцинации или судороги (белая горячка) — это неотложные состояния.",
              "### Риски для здоровья",
              "Обезвоживание, нарушение электролитов и истощение витаминов (особенно B1) могут навредить сердцу, печени и мозгу. Поэтому выход из запоя нельзя делать как попало — нужна медицинская поддержка.",
            ],
          },
          {
            heading: "Чего НЕЛЬЗЯ делать",
            body: [
              "Не заставляйте человека резко бросать без наблюдения — неконтролируемая абстиненция опасна. Не ругайте и не унижайте: стыд усугубляет проблему. Не давайте «ещё рюмку, чтобы полегчало» — это лишь продлевает запой. И не игнорируйте тяжёлые признаки (спутанность, судороги, рвота с кровью) — сразу звоните 112.",
            ],
          },
          {
            heading: "Как проходит вывод из запоя на дому",
            body: [
              "### 1. Оценка",
              "Медсестра оценивает общее состояние, измеряет давление, пульс и расспрашивает о длительности и количестве употребления. Так подбирается подходящее лечение и выявляются риски.",
              "### 2. Детокс-капельница",
              "Ставится капельница с растворами для регидратации, витаминами (особенно группы B) и веществами, снижающими тошноту, тремор и тревогу. Организм начинает восстанавливаться, симптомы заметно облегчаются.",
              "### 3. Наблюдение",
              "Во время процедуры медсестра остаётся рядом и следит за реакцией пациента. При необходимости корректирует лечение или рекомендует доп. консультацию.",
            ],
          },
          {
            heading: "После детокса: восстановление",
            body: [
              "Восстановление продолжается и после капельницы: вода, сон, лёгкая еда и отказ от нагрузок. Первые 24–48 часов важнее всего для стабилизации.",
              "Эмоциональная поддержка семьи, без упрёков, сильно повышает шансы на восстановление. Для многих это подходящий момент обсудить долгосрочные шаги.",
            ],
          },
          {
            heading: "Кодирование — шаг к трезвости",
            body: [
              "Детоксикация решает непосредственное физическое состояние, но не зависимость. Для тех, кто хочет остаться без алкоголя, [кодирование](/ru/servicii/kodirovanie-ot-alkogolya) (после оценки и периода трезвости) может быть эффективным шагом, особенно вместе с психологической поддержкой.",
            ],
          },
          {
            heading: "Частые вопросы",
            body: [
              "### Сколько длится вывод из запоя?",
              "Облегчение симптомов обычно начинается через несколько часов после капельницы, но полное восстановление может занять несколько дней — в зависимости от длительности употребления.",
              "### Это конфиденциально?",
              "Да, полностью. Все визиты дискретны, на дому, без осуждения и без разглашения информации.",
              "### Можно ли сделать это самому дома, без врача?",
              "Не рекомендуется. Неконтролируемая абстиненция может быть опасной. Наблюдение медсестры делает процесс безопасным и гораздо мягче.",
            ],
          },
          {
            heading: "Заключение",
            body: [
              "Вывод из запоя возможен и безопасен, когда сделан правильно, с медицинской поддержкой и без осуждения. Команда Medline приезжает на дом в Кишинёве, анонимно и 24/7. Если вам или близкому нужна помощь — позвоните, сделаем первый шаг вместе.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "ghid-complet-codare-anti-alcool",
    date: "2026-06-10",
    readMinutes: 8,
    content: {
      ro: {
        metaTitle: "Codarea Anti-Alcool: Ghid Complet — Cum Funcționează | Medline.md",
        metaDescription:
          "Ghid complet despre codarea anti-alcool: ce este, cum funcționează, ce condiții trebuie îndeplinite, mituri și cum menții rezultatul. La domiciliu, în Chișinău.",
        keywords: "codare anti-alcool, codare alcool Chisinau, kodirovka ot alkogolya, cum functioneaza codarea, codare la domiciliu",
        title: "Codarea anti-alcool: ghid complet",
        excerpt: "Cum funcționează codarea, ce condiții sunt necesare, mituri frecvente și cum menții rezultatul pe termen lung.",
        sections: [
          {
            body: [
              "Codarea este una dintre cele mai cunoscute metode de sprijin în lupta cu dependența de alcool. În jurul ei există însă multe neclarități și mituri. Acest ghid îți explică, pe înțelesul tuturor, ce este codarea, cum funcționează și ce trebuie să știi înainte de a o face.",
            ],
          },
          {
            heading: "Ce este codarea",
            body: [
              "Codarea este o procedură care urmărește să întărească decizia persoanei de a nu mai consuma alcool. Funcționează cel mai bine ca parte a unei hotărâri personale ferme și, ideal, însoțită de sprijin psihologic.",
              "Important: codarea nu este o „vrajă” și nu înlocuiește dorința reală de a renunța. Este un instrument care ajută, nu un substitut al voinței.",
            ],
          },
          {
            heading: "Cum funcționează",
            body: [
              "Codarea creează o asociere puternică între consumul de alcool și consecințe neplăcute, întărind astfel abținerea. Efectul psihologic este adesea la fel de important ca cel fizic.",
              "Procedura se efectuează numai după o evaluare medicală și cu acordul informat al pacientului, în condiții sterile și sigure.",
            ],
          },
          {
            heading: "Condiții înainte de codare",
            body: [
              "### Perioada de abstinență",
              "Înainte de codare este necesară o perioadă fără alcool (durata se stabilește în funcție de caz). Codarea nu se face dacă persoana este sub influența alcoolului.",
              "### Evaluarea stării de sănătate",
              "Se verifică dacă există contraindicații. De aceea evaluarea prealabilă este obligatorie — siguranța pacientului este pe primul loc.",
            ],
          },
          {
            heading: "Mituri frecvente despre codare",
            body: [
              "„Codarea vindecă singură dependența” — fals: este un sprijin, nu un leac magic. „O dată codat, gata pe viață” — depinde de metodă și de implicarea persoanei. „Funcționează și fără voință” — nu: dorința de a renunța rămâne esențială.",
            ],
          },
          {
            heading: "Codarea vs alte abordări",
            body: [
              "Codarea este un pas, nu întreaga soluție. Cele mai bune rezultate apar când este combinată cu detoxifiere prealabilă (dacă e cazul), sprijin psihologic și un mediu familial care încurajează.",
            ],
          },
          {
            heading: "După codare: cum menții rezultatul",
            body: [
              "Evită mediile și situațiile asociate cu băutul, sprijină-te pe familie și prieteni, și ia în calcul consilierea psihologică. Recăderile nu înseamnă eșec — sunt parte din proces, iar ajutorul rămâne disponibil.",
            ],
          },
          {
            heading: "Întrebări frecvente",
            body: [
              "### Cât trebuie să nu beau înainte?",
              "Perioada de abstinență se stabilește la evaluare, în funcție de caz. Te informăm exact când ne contactezi.",
              "### Se poate face la domiciliu?",
              "Da, oferim codare la domiciliu, în Chișinău, discret și în condiții sigure, după evaluarea prealabilă.",
            ],
          },
          {
            heading: "Concluzie",
            body: [
              "Codarea poate fi un pas eficient spre o viață fără alcool, atunci când este făcută corect și însoțită de o decizie fermă. Echipa Medline te ghidează cu profesionalism și discreție. Contactează-ne pentru o evaluare și îți explicăm toți pașii.",
            ],
          },
        ],
      },
      ru: {
        metaTitle: "Кодирование от Алкоголя: Полный Гид — Как Работает | Medline.md",
        metaDescription:
          "Полный гид по кодированию от алкоголя: что это, как работает, какие условия нужны, мифы и как сохранить результат. На дому, в Кишинёве.",
        keywords: "кодирование от алкоголя, кодировка от алкоголя Кишинёв, как работает кодирование, кодирование на дому",
        title: "Кодирование от алкоголя: полный гид",
        excerpt: "Как работает кодирование, какие условия нужны, частые мифы и как сохранить результат надолго.",
        sections: [
          {
            body: [
              "Кодирование — один из самых известных методов поддержки в борьбе с алкогольной зависимостью. Вокруг него много неясностей и мифов. Этот гид простыми словами объясняет, что такое кодирование, как оно работает и что нужно знать перед процедурой.",
            ],
          },
          {
            heading: "Что такое кодирование",
            body: [
              "Кодирование — это процедура, которая укрепляет решение человека больше не употреблять алкоголь. Лучше всего работает как часть твёрдого личного решения и, в идеале, вместе с психологической поддержкой.",
              "Важно: кодирование — не «заговор» и не заменяет реальное желание бросить. Это инструмент, который помогает, а не замена воли.",
            ],
          },
          {
            heading: "Как работает",
            body: [
              "Кодирование создаёт сильную связь между употреблением алкоголя и неприятными последствиями, тем самым укрепляя воздержание. Психологический эффект часто так же важен, как и физический.",
              "Процедура проводится только после медицинской оценки и с информированного согласия пациента, в стерильных и безопасных условиях.",
            ],
          },
          {
            heading: "Условия перед кодированием",
            body: [
              "### Период трезвости",
              "Перед кодированием нужен период без алкоголя (срок зависит от случая). Кодирование не проводится, если человек под воздействием алкоголя.",
              "### Оценка состояния здоровья",
              "Проверяется наличие противопоказаний. Поэтому предварительная оценка обязательна — безопасность пациента на первом месте.",
            ],
          },
          {
            heading: "Частые мифы о кодировании",
            body: [
              "«Кодирование само лечит зависимость» — неправда: это поддержка, а не волшебное лекарство. «Закодировался — и всё, на всю жизнь» — зависит от метода и вовлечённости человека. «Работает и без воли» — нет: желание бросить остаётся ключевым.",
            ],
          },
          {
            heading: "Кодирование и другие подходы",
            body: [
              "Кодирование — это шаг, а не всё решение. Лучшие результаты — когда оно сочетается с предварительной детоксикацией (если нужно), психологической поддержкой и поддерживающей семейной средой.",
            ],
          },
          {
            heading: "После кодирования: как сохранить результат",
            body: [
              "Избегайте мест и ситуаций, связанных с выпивкой, опирайтесь на семью и друзей и рассмотрите психологическое консультирование. Срывы не означают провал — это часть процесса, и помощь остаётся доступной.",
            ],
          },
          {
            heading: "Частые вопросы",
            body: [
              "### Сколько нельзя пить перед процедурой?",
              "Период трезвости определяется при оценке, в зависимости от случая. Мы сообщим точно, когда вы свяжетесь с нами.",
              "### Можно ли сделать на дому?",
              "Да, мы предлагаем кодирование на дому в Кишинёве, анонимно и в безопасных условиях, после предварительной оценки.",
            ],
          },
          {
            heading: "Заключение",
            body: [
              "Кодирование может быть эффективным шагом к жизни без алкоголя, когда сделано правильно и подкреплено твёрдым решением. Команда Medline сопровождает вас профессионально и деликатно. Свяжитесь с нами для оценки — объясним все шаги.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "ce-sa-faci-daca-cineva-a-baut-prea-mult",
    date: "2026-06-20",
    readMinutes: 5,
    content: {
      ro: {
        metaTitle: "Ce să Faci Dacă Cineva a Băut Prea Mult Alcool | Ghid — Medline.md",
        metaDescription:
          "Ce să faci dacă cineva a băut prea mult: semne de alarmă, primul ajutor acasă și când să chemi urgența. Plus cum ajută o perfuzie de detoxifiere la domiciliu în Chișinău.",
        keywords: "ce sa fac daca cineva a baut prea mult, intoxicatie cu alcool ce fac, primul ajutor betie, perfuzie dupa alcool Chisinau",
        title: "Ce să faci dacă cineva a băut prea mult alcool",
        excerpt: "Semne de alarmă, primul ajutor la domiciliu și când e nevoie de ajutor medical urgent.",
        sections: [
          {
            body: [
              "Când cineva drag a băut prea mult, e greu să știi cum să reacționezi. Acest ghid te ajută să recunoști semnele periculoase și să acționezi corect — calm și rapid.",
            ],
          },
          {
            heading: "Semne de alarmă — sună imediat la 112",
            body: [
              "Cheamă urgent ajutorul medical (112) dacă persoana: este inconștientă și nu poate fi trezită, respiră neregulat sau rar, are pielea rece/vânătă, vomită în timp ce e adormită, are convulsii sau confuzie severă.",
              "Aceste semne pot indica o intoxicație alcoolică gravă, care pune viața în pericol. Nu aștepta să „treacă de la sine”.",
            ],
          },
          {
            heading: "Primul ajutor acasă",
            body: [
              "Dacă persoana este conștientă: așaz-o pe o parte (poziția de siguranță) ca să nu se înece dacă vomită, ține-o la căldură, oferă-i apă în înghițituri mici și rămâi lângă ea.",
              "Nu-i da cafea, nu o pune sub duș rece și nu o forța să mai bea alcool — acestea sunt mituri periculoase.",
            ],
          },
          {
            heading: "Cum ajută o perfuzie de detoxifiere la domiciliu",
            body: [
              "După ce pericolul imediat a trecut, o [perfuzie de detoxifiere](/ro/detoxifiere) ajută organismul să se refacă mai repede: rehidratare, vitamine și substanțe care reduc greața, tremurăturile și durerile de cap.",
              "Echipa Medline vine la domiciliu, în Chișinău, discret și 24/7. Sună-ne și te ajutăm să-ți revii în siguranță.",
            ],
          },
        ],
      },
      ru: {
        metaTitle: "Что Делать, Если Человек Перепил Алкоголя | Гид — Medline.md",
        metaDescription:
          "Что делать, если человек перепил: тревожные признаки, первая помощь дома и когда вызывать скорую. Плюс как помогает капельница на дому в Кишинёве.",
        keywords: "что делать если человек перепил, алкогольное отравление что делать, первая помощь при опьянении, капельница после алкоголя Кишинёв",
        title: "Что делать, если человек перепил алкоголя",
        excerpt: "Тревожные признаки, первая помощь дома и когда нужна срочная медицинская помощь.",
        sections: [
          {
            body: [
              "Когда близкий человек перепил, трудно понять, как реагировать. Этот гид поможет распознать опасные признаки и действовать правильно — спокойно и быстро.",
            ],
          },
          {
            heading: "Тревожные признаки — сразу звоните 112",
            body: [
              "Срочно вызывайте скорую (112), если человек: без сознания и не просыпается, дышит редко или неровно, кожа холодная/синюшная, рвота во сне, судороги или сильная спутанность.",
              "Эти признаки могут означать тяжёлое алкогольное отравление, опасное для жизни. Не ждите, что «само пройдёт».",
            ],
          },
          {
            heading: "Первая помощь дома",
            body: [
              "Если человек в сознании: положите его на бок (безопасное положение), чтобы он не захлебнулся при рвоте, согрейте, давайте воду небольшими глотками и будьте рядом.",
              "Не давайте кофе, не ставьте под холодный душ и не заставляйте пить ещё — это опасные мифы.",
            ],
          },
          {
            heading: "Как помогает капельница на дому",
            body: [
              "Когда непосредственная опасность миновала, [детокс-капельница](/ru/detoxifiere) помогает организму быстрее восстановиться: регидратация, витамины и вещества, снижающие тошноту, тремор и головную боль.",
              "Команда Medline приезжает на дом в Кишинёве, анонимно и 24/7. Позвоните — поможем восстановиться безопасно.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "cum-ajuti-pe-cineva-sa-iasa-din-binge",
    date: "2026-06-13",
    readMinutes: 5,
    content: {
      ro: {
        metaTitle: "Cum Ajuți pe Cineva să Iasă dintr-o Beție Prelungită (Binge) | Medline.md",
        metaDescription:
          "Cum ajuți pe cineva să iasă dintr-un binge / beție prelungită, în siguranță. De ce e riscant să oprești brusc și cum ajută detoxifierea la domiciliu în Chișinău.",
        keywords: "cum ajut pe cineva sa iasa din betie, iesire din binge, vivod iz zapoya Chisinau, detoxifiere alcool la domiciliu",
        title: "Cum ajuți pe cineva să iasă dintr-o beție prelungită",
        excerpt: "Pași siguri pentru a ajuta o persoană dragă să iasă dintr-un binge, cu sprijin medical.",
        sections: [
          {
            body: [
              "O beție prelungită (binge, „запой”) nu se rezolvă cu mustrări sau forțare. Persoana are nevoie de sprijin și, de multe ori, de ajutor medical. Iată cum poți ajuta corect.",
            ],
          },
          {
            heading: "De ce e riscant să oprești brusc, singur",
            body: [
              "Oprirea bruscă a alcoolului după o perioadă lungă de consum poate provoca simptome severe (sevraj): tremurături, anxietate, transpirații, în cazuri grave chiar convulsii. De aceea e mai sigur cu supraveghere medicală.",
            ],
          },
          {
            heading: "Cum ajutăm noi — detoxifiere la domiciliu",
            body: [
              "Asistenta Medline vine la domiciliu, evaluează starea și administrează o perfuzie de detoxifiere care ameliorează simptomele și ajută organismul să se refacă, discret și în siguranță.",
              "Totul este confidențial, fără judecăți — un prim pas blând spre recuperare.",
            ],
          },
          {
            heading: "Pasul următor: codarea",
            body: [
              "Pentru cei care vor să rămână fără alcool pe termen lung, oferim și serviciul de codare, după o evaluare prealabilă. Contactează-ne ca să-ți explicăm pașii.",
            ],
          },
        ],
      },
      ru: {
        metaTitle: "Как Помочь Человеку Выйти из Запоя | Гид — Medline.md",
        metaDescription:
          "Как безопасно помочь человеку выйти из запоя. Почему опасно резко бросать самому и как помогает детоксикация на дому в Кишинёве.",
        keywords: "как помочь выйти из запоя, вывод из запоя на дому, вывод из запоя Кишинёв, детоксикация на дому",
        title: "Как помочь человеку выйти из запоя",
        excerpt: "Безопасные шаги, чтобы помочь близкому выйти из запоя при медицинской поддержке.",
        sections: [
          {
            body: [
              "Запой не решается упрёками или принуждением. Человеку нужна поддержка и часто — медицинская помощь. Вот как помочь правильно.",
            ],
          },
          {
            heading: "Почему опасно резко бросать самому",
            body: [
              "Резкая отмена алкоголя последлительного употребления может вызвать тяжёлые симптомы (абстиненция): тремор, тревогу, потливость, в тяжёлых случаях даже судороги. Поэтому безопаснее под медицинским наблюдением.",
            ],
          },
          {
            heading: "Как помогаем мы — детокс на дому",
            body: [
              "Медсестра Medline приезжает на дом, оценивает состояние и ставит детокс-капельницу, которая облегчает симптомы и помогает организму восстановиться — анонимно и безопасно.",
              "Всё конфиденциально, без осуждения — мягкий первый шаг к восстановлению.",
            ],
          },
          {
            heading: "Следующий шаг: кодирование",
            body: [
              "Для тех, кто хочет надолго остаться без алкоголя, мы также предлагаем кодирование — после предварительной оценки. Свяжитесь с нами, и мы объясним шаги.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "mahmureala-severa-ce-sa-faci",
    date: "2026-06-12",
    readMinutes: 4,
    content: {
      ro: {
        metaTitle: "Mahmureală Severă: Ce să Faci ca să-ți Revii Rapid | Medline.md",
        metaDescription:
          "Mahmureală severă: ce ajută cu adevărat (hidratare, vitamine, perfuzii) și ce sunt doar mituri. Cum îți revii rapid cu o perfuzie la domiciliu în Chișinău.",
        keywords: "mahmureala severa ce sa fac, cum trece mahmureala repede, perfuzie mahmureala, perfuzie dupa alcool Chisinau",
        title: "Mahmureală severă: ce să faci ca să-ți revii rapid",
        excerpt: "Ce ajută cu adevărat după o noapte grea — și ce e doar mit.",
        sections: [
          {
            body: [
              "Mahmureala apare din deshidratare, pierderea de vitamine și efectul toxinelor. Vestea bună: îți poți reveni mai repede dacă faci lucrurile potrivite.",
            ],
          },
          {
            heading: "Ce ajută cu adevărat",
            body: [
              "Hidratarea (apă, soluții cu electroliți), odihna, o masă ușoară și timpul. Pentru o refacere rapidă, o perfuzie cu rehidratare și vitamine ameliorează simptomele în scurt timp.",
            ],
          },
          {
            heading: "Mituri de evitat",
            body: [
              "„Încă un pahar” (nu ajută, amână problema), cafeaua în exces (deshidratează), dușul rece. Acestea nu vindecă mahmureala.",
            ],
          },
          {
            heading: "Când e mai mult decât o mahmureală",
            body: [
              "Dacă apar vărsături persistente, confuzie, tremurături puternice sau simptomele țin foarte mult, e nevoie de ajutor medical. Medline vine la domiciliu în Chișinău cu o perfuzie de refacere — sună-ne.",
            ],
          },
        ],
      },
      ru: {
        metaTitle: "Тяжёлое Похмелье: Что Делать, Чтобы Быстро Прийти в Себя | Medline.md",
        metaDescription:
          "Тяжёлое похмелье: что действительно помогает (вода, витамины, капельницы) и что лишь миф. Как быстро прийти в себя с капельницей на дому в Кишинёве.",
        keywords: "тяжёлое похмелье что делать, как быстро снять похмелье, капельница от похмелья, капельница после алкоголя Кишинёв",
        title: "Тяжёлое похмелье: что делать, чтобы быстро прийти в себя",
        excerpt: "Что действительно помогает после тяжёлой ночи — и что лишь миф.",
        sections: [
          {
            body: [
              "Похмелье возникает из-за обезвоживания, потери витаминов и действия токсинов. Хорошая новость: можно прийти в себя быстрее, если делать правильные вещи.",
            ],
          },
          {
            heading: "Что действительно помогает",
            body: [
              "Гидратация (вода, растворы с электролитами), отдых, лёгкая еда и время. Для быстрого восстановления капельница с регидратацией и витаминами облегчает симптомы за короткое время.",
            ],
          },
          {
            heading: "Мифы, которых стоит избегать",
            body: [
              "«Ещё рюмка» (не помогает, откладывает проблему), избыток кофе (обезвоживает), холодный душ. Это не лечит похмелье.",
            ],
          },
          {
            heading: "Когда это больше, чем похмелье",
            body: [
              "Если есть постоянная рвота, спутанность, сильный тремор или симптомыдержатся очень долго — нужна медицинская помощь. Medline приезжает на дом в Кишинёве с восстановительной капельницей — звоните.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "semne-ca-ai-nevoie-de-perfuzie-detoxifiere",
    date: "2026-06-11",
    readMinutes: 4,
    content: {
      ro: {
        metaTitle: "Semne că Ai Nevoie de o Perfuzie de Detoxifiere după Alcool | Medline.md",
        metaDescription:
          "Cum îți dai seama că ai nevoie de o perfuzie de detoxifiere după alcool: simptome, beneficii și cum programezi o vizită la domiciliu în Chișinău.",
        keywords: "semne ca ai nevoie de perfuzie, cand e nevoie de detoxifiere alcool, perfuzie detoxifiere domiciliu, detoxifiere post-alcool Chisinau",
        title: "Semne că ai nevoie de o perfuzie de detoxifiere după alcool",
        excerpt: "Simptomele care îți spun că o perfuzie de detoxifiere te-ar ajuta să-ți revii.",
        sections: [
          {
            body: [
              "Nu orice mahmureală necesită o perfuzie, dar există situații în care detoxifierea îți accelerează semnificativ refacerea. Iată semnele.",
            ],
          },
          {
            heading: "Simptome care indică nevoia de detoxifiere",
            body: [
              "Greață și vărsături care nu trec, deshidratare puternică, tremurături, dureri de cap intense, slăbiciune marcată sau o perioadă mai lungă de consum în spate.",
            ],
          },
          {
            heading: "Cum ajută perfuzia",
            body: [
              "Perfuzia rehidratează rapid, completează vitaminele pierdute și ajută eliminarea toxinelor, reducând simptomele neplăcute mult mai repede decât doar prin odihnă.",
            ],
          },
          {
            heading: "Cum programezi",
            body: [
              "Ne suni sau ne scrii, iar asistenta Medline ajunge la domiciliu, în Chișinău, discret și 24/7. Evaluează starea și administrează perfuzia potrivită pentru tine.",
            ],
          },
        ],
      },
      ru: {
        metaTitle: "Признаки, что Нужна Капельница после Алкоголя | Medline.md",
        metaDescription:
          "Как понять, что нужна детокс-капельница после алкоголя: симптомы, польза и как записаться на визит на дом в Кишинёве.",
        keywords: "признаки что нужна капельница, когда нужна детоксикация алкоголь, капельница на дому, детоксикация после алкоголя Кишинёв",
        title: "Признаки, что нужна капельница после алкоголя",
        excerpt: "Симптомы, которые говорят, что детокс-капельница поможет вам восстановиться.",
        sections: [
          {
            body: [
              "Не каждое похмелье требует капельницы, но есть ситуации, когда детоксикация значительно ускоряет восстановление. Вот признаки.",
            ],
          },
          {
            heading: "Симптомы, указывающие на необходимость детокса",
            body: [
              "Тошнота и рвота, которые не проходят, сильное обезвоживание, тремор, интенсивная головная боль, выраженная слабость илидлительный период употребления.",
            ],
          },
          {
            heading: "Как помогает капельница",
            body: [
              "Капельница быстро восполняет жидкость, возвращает потерянные витамины и помогает выводить токсины, снижая неприятные симптомы гораздо быстрее, чем просто отдых.",
            ],
          },
          {
            heading: "Как записаться",
            body: [
              "Позвоните или напишите — медсестра Medline приедет на дом в Кишинёве, анонимно и 24/7. Оценит состояние и поставит подходящую капельницу.",
            ],
          },
        ],
      },
    },
  },
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
  { ro: "Consult medical la domiciliu", ru: "Медицинский осмотр на дому" },
  { ro: "Îngrijirea bolnavilor la domiciliu", ru: "Уход за больными на дому" },
];

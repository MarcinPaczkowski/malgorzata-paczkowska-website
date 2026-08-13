// ──────────────────────────────────────────────────────────────────────────
// Jednorodne, typowane źródło danych strony (zawartość z mockupu UI).
// Edytuj treści tutaj; komponenty i strony czytają z tego pliku.
// TODO(content): zastąp przykładowe dane prawdziwymi przed deployem.
// ──────────────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Service {
  num: string; // numer porządkowy w siatce oferty (01, 02, …)
  title: string;
  description: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface EducationItem {
  title: string;
  detail: string;
}

export interface ContactInfo {
  phone: string;        // wersja do wyświetlenia, np. „601 234 567"
  phoneHref: string;    // wersja tel:, np. „+48601234567"
  email: string;
  address: string;
  hours: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  title: string;        // domyślny <title> SEO
  description: string;  // domyślny meta description
  nav: NavItem[];

  home: {
    kicker: string;
    h1: string;
    lead: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    heroImageLabel: string;
    stats: Stat[];
    aboutTeaser: { h2: string; body: string; link: { label: string; href: string } };
    offerSectionTitle: string;
    offerSeeAll: { label: string; href: string };
    homeServices: Service[]; // 4 skrócone usługi na homepage
    blogSectionTitle: string;
    blogSeeAll: { label: string; href: string };
    banner: { h2: string; lead: string };
  };

  about: {
    kicker: string;
    h1: string;
    lead: string;
    heroImageLabel: string;
    body: string[];
    bodyMuted: string;
    educationTitle: string;
    education: EducationItem[];
    ctaTitle: string;
    ctaBody: string;
    ctaButton: { label: string; href: string };
  };

  offer: {
    kicker: string;
    h1: string;
    lead: string;
    services: Service[]; // pełna lista (8)
    firstVisitTitle: string;
    faq: FaqItem[];
    bannerTitle: string;
  };

  blog: {
    kicker: string;
    h1: string;
    lead: string;
  };

  contact: {
    kicker: string;
    h1: string;
    lead: string;
    info: ContactInfo;
    formNote: string;
    mapLabel: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'Małgorzata Paczkowska',
  role: 'Psycholog · Psychoterapeuta CBT',
  title: 'Małgorzata Paczkowska — psycholog, psychoterapeuta CBT',
  description:
    'Psycholog i psychoterapeutka CBT w Warszawie i online. Pracuję z osobami dorosłymi, parami i młodzieżą nad lękiem, nastrojem i relacjami.',
  nav: [
    { label: 'Start', href: '/' },
    { label: 'O mnie', href: '/o-mnie' },
    { label: 'Oferta', href: '/oferta' },
    { label: 'Blog', href: '/blog' },
    { label: 'Kontakt', href: '/kontakt' },
  ],

  home: {
    kicker: 'Psycholog · Psychoterapeuta CBT',
    h1: 'Przestrzeń, w której można odetchnąć',
    lead: 'Pracuję w nurcie poznawczo-behawioralnym z osobami dorosłymi, parami i młodzieżą. Spotykamy się w gabinecie w Warszawie albo online — tak, jak Ci wygodniej.',
    primaryCta: { label: 'Umów pierwszą wizytę', href: '/kontakt' },
    secondaryCta: { label: 'Poznaj ofertę', href: '/oferta' },
    heroImageLabel: 'Portret — zdjęcie psychologa',
    stats: [
      { value: '12 lat', label: 'praktyki klinicznej' },
      { value: 'CBT', label: 'terapia poznawczo-behawioralna' },
      { value: 'Online', label: 'i stacjonarnie w Warszawie' },
    ],
    aboutTeaser: {
      h2: 'Nie musisz mieć gotowej odpowiedzi, żeby przyjść',
      body: 'Od dwunastu lat towarzyszę osobom, które mierzą się z lękiem, obniżonym nastrojem, kryzysem w związku albo wyczerpaniem po latach pracy ponad siły.',
      link: { label: 'Poznaj moje podejście →', href: '/o-mnie' },
    },
    offerSectionTitle: 'Oferta',
    offerSeeAll: { label: 'Zobacz wszystko →', href: '/oferta' },
    homeServices: [
      { num: '01', title: 'Konsultacja indywidualna', description: 'Pierwsze spotkanie i ustalenie kierunku pracy.' },
      { num: '02', title: 'Terapia par', description: 'Komunikacja, konflikt i bliskość — dla obojga.' },
      { num: '03', title: 'Terapia młodzieży', description: 'Wsparcie dla nastolatków od 13 roku życia.' },
      { num: '04', title: 'Terapia online', description: 'Te same warunki co w gabinecie, wideo.' },
    ],
    blogSectionTitle: 'Z bloga',
    blogSeeAll: { label: 'Wszystkie wpisy →', href: '/blog' },
    banner: {
      h2: 'Napisz albo zadzwoń',
      lead: 'Odpowiadam w ciągu jednego dnia roboczego.',
    },
  },

  about: {
    kicker: 'O mnie',
    h1: 'Psycholożka i psychoterapeutka CBT',
    lead: 'Nazywam się Małgorzata Paczkowska. Od dwunastu lat towarzyszę osobom dorosłym, parom i młodzieży w trudnych momentach — lęku, obniżonym nastroju, kryzysie w relacji i wypaleniu.',
    heroImageLabel: 'Portret w gabinecie',
    body: [
      'W gabinecie stawiam na konkret i na ciepło jednocześnie. Wspólnie nazywamy to, co się dzieje, a potem szukamy narzędzi, które realnie działają w Twoim życiu — nie w podręczniku.',
    ],
    bodyMuted:
      'Pracuję w nurcie poznawczo-behawioralnym, ponieważ pozwala on szybko przejść od rozmowy do zmiany — bez tracenia z oczu tego, co dla Ciebie ważne.',
    educationTitle: 'Wykształcenie i praktyka',
    education: [
      { title: 'Uniwersytet SWPS', detail: 'Psychologia kliniczna, mgr' },
      { title: 'Szkoła Terapii Poznawczo-Behawioralnej', detail: 'Certyfikat psychoterapeuty CBT' },
      { title: 'PTTPB', detail: 'Członkini towarzystwa' },
      { title: 'Superwizja', detail: 'Stała, u superwizora PTTPB' },
    ],
    ctaTitle: 'Chcesz zacząć?',
    ctaBody: 'Pierwsza rozmowa nie zobowiązuje do niczego więcej.',
    ctaButton: { label: 'Umów wizytę', href: '/kontakt' },
  },

  offer: {
    kicker: 'Oferta',
    h1: 'Formy pracy dopasowane do sytuacji',
    lead: 'Sesja trwa 50 minut, stacjonarnie w Warszawie lub online. Ceny konsultacji ustalam indywidualnie na pierwszym spotkaniu.',
    services: [
      { num: '01', title: 'Konsultacja indywidualna', description: 'Pierwsze spotkanie, na którym ustalamy, czego potrzebujesz i jak możemy pracować dalej.' },
      { num: '02', title: 'Terapia par', description: 'Praca nad komunikacją, konfliktem i bliskością — dla obojga partnerów.' },
      { num: '03', title: 'Terapia młodzieży', description: 'Wsparcie dla nastolatków od 13 roku życia, z udziałem rodziców w ustalonym zakresie.' },
      { num: '04', title: 'Terapia online', description: 'Te same warunki co w gabinecie, w bezpiecznym połączeniu wideo.' },
      { num: '05', title: 'Diagnoza psychologiczna', description: 'Badanie z opisem i zaleceniami, zwykle w trzech spotkaniach.' },
      { num: '06', title: 'Interwencja kryzysowa', description: 'Krótka, intensywna pomoc w nagłej, trudnej sytuacji życiowej.' },
      { num: '07', title: 'Wsparcie w wypaleniu zawodowym', description: 'Dla osób, które od dawna funkcjonują na rezerwie i chcą to zmienić.' },
      { num: '08', title: 'Grupy wsparcia', description: 'Spotkania w małej grupie, prowadzone cyklicznie przez osiem tygodni.' },
    ],
    firstVisitTitle: 'Pierwsza wizyta — jak to wygląda',
    faq: [
      { q: 'Ile trwa spotkanie?', a: 'Pięćdziesiąt minut. Pierwsze spotkanie jest konsultacją.' },
      { q: 'Czy muszę wiedzieć, o czym mówić?', a: 'Nie. Wystarczy, że przyjdziesz — pytania z mojej strony poprowadzą rozmowę.' },
      { q: 'Ile trwa terapia?', a: 'Zwykle od kilkunastu do kilkudziesięciu spotkań — plan ustalamy wspólnie.' },
    ],
    bannerTitle: 'Umów pierwszą konsultację',
  },

  blog: {
    kicker: 'Blog',
    h1: 'Krótkie teksty o psychologii codzienności',
    lead: 'Piszę o lęku, relacjach i pracy — bez żargonu, na podstawie tego, co widzę w gabinecie.',
  },

  contact: {
    kicker: 'Kontakt',
    h1: 'Napisz albo zadzwoń',
    lead: 'Odpowiadam w ciągu jednego dnia roboczego. Jeśli nie odbieram, jestem na sesji — oddzwonię.',
    info: {
      phone: '601 234 567',          // TODO(content)
      phoneHref: '+48601234567',
      email: 'kontakt@paczkowska-psycholog.pl', // TODO(content)
      address: 'ul. Hoża 42 lok. 7, 00-516 Warszawa',
      hours: 'wtorki i czwartki 10:00–19:00',
    },
    formNote: 'Formularz nie jest dostępny — proszę o kontakt telefoniczny lub mailowy',
    mapLabel: 'Mapa / zdjęcie okolicy gabinetu',
  },
};

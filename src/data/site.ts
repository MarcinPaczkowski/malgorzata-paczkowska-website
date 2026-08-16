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
    title: string;
    lead: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
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
    kicker: 'Psycholog Małgorzata Paczkowska Poznań',
    title: 'Przestrzeń, w której można odetchnąć',
    lead: 'Psycholożka, pedagożka, edukatorka rodzicielska Pozytywnej Dyscypliny, trenerka TUS, psycholożka w trakcie szkolenia psychoterapeutycznego w nurcie CBT',
    primaryCta: { label: 'Umów pierwszą wizytę', href: '/kontakt' },
    secondaryCta: { label: 'Poznaj ofertę', href: '/oferta' },
    stats: [
      { value: 'Wykształcenie', label: 'Psycholożka o specjalności klinicznej dzieci i dorosłych\nPedagożka o specjalności interwencja kryzysowa oraz poradnictwo i pomoc psychopedagogiczna\nFilozofka o specjalności komunikacja społeczna' },
      { value: 'Szkoła Psychoterapii', label: 'w trakcie całościowego szkolenia psychoterapeutycznego w nurcie poznawczo-behawioralnym (CBT) rekomendowanego przez PTTPB' },
      { value: 'Certyfikaty i Kursy', label: 'Racjonalna Terapia Zachowań\nTerapia Skoncentrowana na Rozwiązaniach – kurs podstawowy\nPraktyk metody Kids’ Skills: Dam radę oraz I’m Proud of you\nTrener TUS I i II stopień (dla dzieci, dorosłych i osób w spektrum autyzmu)\nCertyfikat Edukatora Rodzicielskiego Pozytywnej Dyscypliny\nProfesjonalne wsparcie w żałobie' },
    ],
    aboutTeaser: {
      h2: 'W pracy kieruję się Kodeksem Etyczno-Zawodowym Psychologa Polskiego Towarzystwa Psychologicznego oraz zasadami Evidence-Based Practice (EBP)',
      body: 'Pomoc psychologiczna, której udzielam, opiera się na aktualnej wiedzy naukowej, standardach etycznych i rzetelności zawodowej. Zapewniam poufność oraz jasne i przejrzyste zasady współpracy.',
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
    h1: 'Nazywam się Małgorzata Paczkowska',
    lead: 'W pracy spotykam się z osobami, które doświadczają lęku, obniżonego nastroju, przeciążenia, kryzysów czy trudności w relacjach. W zależności od potrzeb korzystam z Terapii Skoncentrowanej na Rozwiązaniach, Racjonalnej Terapii Zachowania oraz z podejścia poznawczo-behawioralnego. Nie zakładam z góry jednego sposobu pracy. Najważniejsze jest dla mnie poznanie Twojej sytuacji i wspólne znalezienie tego, co może realnie pomóc.',
    body: [
      'W gabinecie ważne jest dla mnie, żeby oprócz zrozumienia tego, co się z Tobą dzieje, pojawiła się też realna zmiana. Nie zakładam, że istnieje jedno rozwiązanie dobre dla każdego. Wspólnie przyglądamy się Twojej sytuacji, szukamy tego, co podtrzymuje trudności. Dobieramy sposoby pracy, które mają sens właśnie dla Ciebie. Korzystam z podejścia poznawczo-behawioralnego, Racjonalnej Terapii Zachowania i Terapii Skoncentrowanej na Rozwiązaniach, ale przede wszystkim zależy mi na tym, żeby wiedza psychologiczna przekładała się na codzienne życie.',
    ],
    bodyMuted:
      'A prywatnie? Jestem miłośniczką gór i podróży samochodowych. W niespełna rok zdobyłam Koronę Gór Polski, a podczas licznych podróży odwiedziłam 36 krajów Europy. Jestem również wielką miłośniczką kotów. Życie poza gabinetem jest dla mnie równie ważne. To właśnie tam odpoczywam, nabieram perspektywy i czerpię energię do pracy z drugim człowiekiem.',
    educationTitle: 'Wykształcenie i praktyka',
    education: [
      { title: 'Wykształcenie', detail: 'Psycholożka o specjalności klinicznej dzieci i dorosłych\nPedagożka o specjalności interwencja kryzysowa oraz poradnictwo i pomoc psychopedagogiczna\nFilozofka o specjalności komunikacja społeczna' },
      { title: 'Szkoła Psychoterapii', detail: 'w trakcie całościowego szkolenia psychoterapeutycznego w nurcie poznawczo-behawioralnym (CBT), rekomendowanego przez PTTPB' },
      { title: 'Członkini', detail: 'Polskiego Towarzystwa Terapii Poznawczej i Behawioralnej (PTTPB)' },
      { title: 'Doświadczenie', detail: 'Doświadczenie zawodowe zdobywałam w:\n Centrum Psychoterapii Sumus\nCentrum Zdrowia Psychicznego HCP w Poznaniu\nSzkołe Podstawowej nr 2 we Wrześni\nZespóle Szkół nr 1 we Wrześni ' },
    ],
    ctaTitle: 'Chcesz zacząć?',
    ctaBody: 'Pierwsza rozmowa nie zobowiązuje Cię do niczego więcej. To spokojny moment, żeby opowiedzieć z czym przychodzisz, zadać pytania i sprawdzić, czy ta forma pomocy jest dla Ciebie odpowiednia. Nie musisz mieć wszystkiego poukładanego ani wiedzieć dokładnie, czego potrzebujesz. Wystarczy, że czujesz, że chcesz coś zmienić albo po prostu potrzebujesz z kimś o tym porozmawiać. Napisz lub umów pierwszą rozmowę. Zobaczymy, od czego warto zacząć.',
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
      { q: 'Z czym można zgłosić się do psychologa?', a: 'Nie trzeba mieć konkretnej diagnozy ani jasno określonego problemu. Możesz zgłosić się z trudnościami emocjonalnymi, lękiem, obniżonym nastrojem, problemami w relacjach, kryzysem, trudnościami wychowawczymi lub po prostu z poczuciem, że trudno poradzić sobie z tym, co dzieje się w Twoim życiu.' },
      { q: 'Czy na pierwsze spotkanie z psychologiem trzeba się jakoś przygotować?', a: 'Nie. Pierwsze spotkanie służy przede wszystkim poznaniu sytuacji i ustaleniu, czego potrzebujesz. Nie musisz wiedzieć, co dokładnie powiedzieć ani mieć gotowej historii swojego problemu.' },
      { q: 'Ile trwa spotkanie?', a: 'Standardowa konsultacja trwa 50 minut. W przypadku pracy z dzieckiem forma i długość spotkania mogą być ustalane indywidualnie, zależnie od wieku i potrzeb.' },
      { q: 'Czy jedna konsultacja wystarczy?', a: 'Czasem tak. Jedno spotkanie może wystarczyć, aby uporządkować sytuację lub ustalić dalsze kroki. Jeśli potrzebna jest dłuższa współpraca, wspólnie ustalamy jej formę i częstotliwość.' },
      { q: 'Czy psycholog zachowuje poufność?', a: 'Tak. Poufność jest podstawą pracy psychologa. Jej granice wynikają z przepisów prawa oraz zasad etyki zawodowej. W przypadku pracy z osobami niepełnoletnimi zasady dotyczące przekazywania informacji rodzicom omawiam na początku współpracy.' },
      { q: 'Jak umówić pierwsze spotkanie?', a: 'Napisz lub zadzwoń, korzystając z danych kontaktowych dostępnych na stronie. Ustalimy dogodny termin i krótko porozmawiamy o tym, z czym się zgłaszasz.' }
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
    lead: 'Jeśli zastanawiasz się czy to dobry moment, żeby poprosić o wsparcie, możesz po prostu się odezwać. Nie musisz od razu wiedzieć, czego potrzebujesz ani dokładnie opisywać swojej sytuacji. Wystarczy krótka wiadomość lub telefon. Na wiadomości odpowiadam w ciągu jednego dnia roboczego. Jeśli dzwonisz i nie odbieram, najprawdopodobniej jestem właśnie na spotkaniu z drugą osobą. Oddzwonię, gdy tylko będę mogła spokojnie porozmawiać. Możesz napisać, zadzwonić lub skorzystać z formularza kontaktowego. Wspólnie ustalimy dogodny termin pierwszej konsultacji.',
    info: {
      phone: '515 286 790',
      phoneHref: '+48515286790',
      email: 'gosiapaczkowska@outlook.com',
      address: 'Poznań',
      hours: 'Sobota: 10:00–14:00',
    },
    formNote: 'Formularz nie jest dostępny — proszę o kontakt telefoniczny lub mailowy',
    mapLabel: 'Mapa / zdjęcie okolicy gabinetu',
  },
};

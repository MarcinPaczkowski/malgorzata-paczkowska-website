# Strona psychologa — plan implementacji

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Zbudować i wdrożyć statyczną stronę psychologa (rdzeń podstron + blog) na Astro, z deployem na Cloudflare Pages.

**Architecture:** Astro (static output) + Markdown/MDX w Content Collections jako źródło treści bloga + dane biznesowe w typowanym module `src/data/site.ts`. Tailwind CSS v4 przez plugin Vite. Strona buduje się do statycznego HTML i jest serwowana przez Cloudflare Pages.

**Tech Stack:** Astro 7.2, TypeScript (strict), Tailwind CSS v4.3 (`@tailwindcss/vite`), `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/rss`, Vitest (dla logiki). Node 20+ LTS, npm.

## Global Constraints

- **Node:** 20.x LTS lub nowszy.
- **Astro:** `^7.2`. **Tailwind:** `^4.3` (instalowany wyłącznie przez `@tailwindcss/vite`, NIE stary `@astrojs/tailwind`).
- **Weryfikacja narzędzi:** przed użyciem API frameworka zawsze potwierdzaj aktualną wersję/składnię przez Context7 (`/withastro/docs`, `/tailwindlabs/tailwindcss.com`). Wersje powyżej zweryfikowano 2026-08-13.
- **Język UI:** polski. Identyfikatory/klucze w kodzie po angielsku; teksty widoczne po polsku.
- **Package manager:** npm.
- **Domena (placeholder do zastąpienia):** `https://www.gosia-psycholog.pl` — używana w `site` w `astro.config.mjs` i w `src/data/site.ts`. Zastąp prawdziwą domeną przed deployem.
- **Konwencja treści:** kod jest kompletny i buduje się od razu. Miejsca wymagające prawdziwych danych klienta (teksty, zdjęcia) oznaczone komentarzem `<!-- TODO(content): ... -->` i wypełnione realistycznym tekstem przykładowym. To NIE są placeholdery implementacji — strona działa end-to-end; klient podmienia copy.
- **Commity:** częste, po każdym zadaniu. Konwencja Conventional Commits (np. `feat:`, `chore:`, `docs:`).

## Strategia weryfikacji (zamiast klasycznego TDD dla UI)

Strona to statyczny content — componenty `.astro` nie podlegają unit-testom. Dlatego:
- **Bramka automatyczna w każdym zadaniu:** `npx astro check` (0 błędów typów/diagnostyki) **oraz** `npm run build` (sukces, pliki w `dist/`).
- **Logika czysta** (funkcje pomocnicze) — prawdziwy cykl TDD z Vitest: najpierw test, który failuje, potem implementacja, aż przejdzie.
- **Weryfikacja wizualna:** uruchomienie `npm run dev` i rzut oka, odnotowane jako krok tam, gdzie to istotne.

---

## File Structure (docelowa)

```
Gosia Psycholog/
├── astro.config.mjs              # konfiguracja Astro: site URL, integracje (mdx, sitemap), plugin Tailwind
├── tsconfig.json
├── package.json
├── vitest.config.ts              # konfiguracja Vitest
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   └── images/og-default.png     # domyślny obraz Open Graph (placeholder)
├── src/
│   ├── env.d.ts
│   ├── content.config.ts         # kolekcja `blog` (glob loader + zod schema)
│   ├── content/
│   │   └── blog/
│   │       ├── witaj-na-moim-blogu.mdx
│   │       └── jak-wybrac-psychologa.mdx
│   ├── data/
│   │   └── site.ts               # jednorodne, typowane źródło danych biznesowych (psycholog, nav, usługi, kontakt)
│   ├── utils/
│   │   └── posts.ts              # getSortedPosts (logika czysta → Vitest)
│   ├── styles/
│   │   └── global.css            # @import "tailwindcss"; + style bazowe
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── SEO.astro
│   │   ├── ServiceCard.astro
│   │   ├── ArticleCard.astro
│   │   └── Callout.astro         # komponent do MDX (ramka "wskazówka")
│   ├── layouts/
│   │   ├── BaseLayout.astro      # shell HTML + SEO + Header/Footer
│   │   └── ArticleLayout.astro
│   └── pages/
│       ├── index.astro
│       ├── o-mnie.astro
│       ├── oferta.astro
│       ├── kontakt.astro
│       ├── 404.astro
│       ├── blog/
│       │   ├── index.astro
│       │   └── [...slug].astro
│       └── rss.xml.ts
└── docs/superpowers/{specs,plans}/...
```

**Odpowiedzialności plików:** `data/site.ts` = jedyne źródło danych biznesowych (psycholog, nawigacja, usługi, kontakt) — czytane przez strony i komponenty; `content/blog/` = artykuły (Markdown/MDX) przez Content Collections; `utils/posts.ts` = czysta logika sortowania; `components/*` = izolowane, reużywalne UI z określonymi propsami; `layouts/*` = szkielet stron; `pages/*` = mapowanie URL.

---

### Task 1: Scaffolding i tooling

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/env.d.ts`, `.gitignore`, `src/styles/global.css`, `vitest.config.ts`
- Test: `src/utils/example.test.ts` (smoke test instalacji Vitest)

**Interfaces:**
- Produces: działający projekt Astro (dev server, `astro check`, `build`), Tailwind aktywny, Vitest gotowy do użycia.

- [ ] **Step 1: Utwórz projekt Astro (minimal, bez szablonu)**

W katalogu `C:\Priv\Git\Gosia Psycholog` uruchom (Git Bash):
```bash
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict --skip-houston
```
Jeśli kreator zapyta o istniejące pliki w katalogu (jest tam `docs/`), wybierz kontynuację bez ich nadpisywania.

- [ ] **Step 2: Zainstaluj zależności bazowe**

```bash
npm install
```

- [ ] **Step 3: Dodaj Tailwind CSS v4 (przez plugin Vite)**

```bash
npx astro add tailwind --yes
```
To zainstaluje `@tailwindcss/vite` i dopisze plugin do `astro.config.mjs`. NIE instaluj starego `@astrojs/tailwind`.

- [ ] **Step 4: Dodaj integracje MDX i sitemap + pakiet RSS i Vitest**

```bash
npx astro add mdx sitemap --yes
npm install @astrojs/rss
npm install -D vitest
```

- [ ] **Step 5: Ustaw `global.css`**

Zastąp zawartość `src/styles/global.css` (jeśli nie istnieje, utwórz):
```css
@import "tailwindcss";

/* Paleta: dominujący szałwiowy zielony (tokeny generują utility: bg-sage, text-sage-dark itd.) */
@theme {
  --color-sage-light: #c8d3c0;  /* jasna szałwia */
  --color-sage: #9caf88;        /* klasyczna szałwia — kolor wiodły */
  --color-sage-medium: #8a9a7b; /* średnia szałwia */
  --color-sage-dark: #6b7a5e;   /* ciemna szałwia */
}

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-stone-50 text-stone-800 antialiased;
}

/* Wyśrodkowany kontener treści (podstrony); hero na homepage jest pełnoekranowy */
.container-page {
  @apply mx-auto w-full max-w-4xl px-4 py-10;
}
```

- [ ] **Step 6: Skonfiguruj `astro.config.mjs`**

Zastąp zawartość `astro.config.mjs`:
```js
// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// TODO(content): zastąp prawdziwą domeną przed deployem
export default defineConfig({
  site: 'https://www.gosia-psycholog.pl',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 7: Skonfiguruj Vitest (`vitest.config.ts`)**

Utwórz `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.ts'],
  },
});
```

Dodaj skrypt testowy w `package.json` (`scripts`):
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 8: Utwórz smoke test Vitest**

Utwórz `src/utils/example.test.ts`:
```ts
import { describe, it, expect } from 'vitest';

describe('vitest smoke', () => {
  it('uruchamia się poprawnie', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 9: Ustaw `.gitignore`**

Zapewnij, że `.gitignore` zawiera:
```
node_modules/
dist/
.astro/
.DS_Store
*.log
.env
.env.*
```

- [ ] **Step 10: Weryfikacja — bramka automatyczna**

```bash
npx astro check
npm run build
npm test
```
Oczekiwane: `astro check` → 0 errors; `build` → katalog `dist/` z plikami; `test` → 1 passed.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro + Tailwind v4 + Vitest"
```

---

### Task 2: Model danych — `site.ts` + Content Collections

**Files:**
- Create: `src/data/site.ts`, `src/content.config.ts`, `src/utils/posts.ts`, `src/utils/posts.test.ts`, `src/content/blog/witaj-na-moim-blogu.mdx`, `src/content/blog/jak-wybrac-psychologa.mdx`

**Interfaces:**
- Produces:
  - `siteConfig` (z `src/data/site.ts`) — kształt opisany w kodzie Tasku (pola: `name`, `title`, `description`, `tagline`, `nav`, `services`, `contact`, `social`).
  - kolekcja `blog` (z `src/content.config.ts`) — wpisy typu `CollectionEntry<'blog'>` z polami frontmatter: `title`, `description`, `pubDate`, `updatedDate?`, `tags`, `heroImage?`.
  - `getSortedPosts(posts: CollectionEntry<'blog'>[]): CollectionEntry<'blog'>[]` (z `src/utils/posts.ts`).

- [ ] **Step 1: Zdefiniuj `src/data/site.ts`**

Utwórz `src/data/site.ts`:
```ts
export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  title: string;
  description: string;
  icon?: string; // nazwa emoji/symbolu (proste rozwiązanie bez biblioteki ikon)
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  city: string;
  hours: string;
  mapUrl: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
}

export interface SiteConfig {
  name: string;        // imię i nazwisko psychologa
  title: string;       // tytuł SEO domyślny
  description: string; // domyślny meta description
  tagline: string;     // hasło pod hero
  nav: NavItem[];
  services: Service[];
  contact: ContactInfo;
  social: SocialLinks;
}

// TODO(content): wstaw prawdziwe dane psychologa (Gosia) przed deployem.
export const siteConfig: SiteConfig = {
  name: 'Małgorzata Kowalska',
  title: 'Małgorzata Kowalska — psycholog',
  description:
    'Psycholog oferujący wsparcie w kryzysach emocjonalnych, terapię dla dorosłych oraz wsparcie w relacjach. Odbierz bezpłatną konsultację.',
  tagline: 'Bezpieczna przestrzeń, by znów poczuć się sobą.',
  nav: [
    { label: 'O mnie', href: '/o-mnie' },
    { label: 'Oferta', href: '/oferta' },
    { label: 'Blog', href: '/blog' },
    { label: 'Kontakt', href: '/kontakt' },
  ],
  services: [
    {
      title: 'Wsparcie w kryzysie',
      description:
        'Pomogę przejść przez trudny moment — utrata, wypalenie, nagła zmiana. Stabilność i narzędzia na tu i teraz.',
    },
    {
      title: 'Terapia dla dorosłych',
      description:
        'Praca nad lękiem, niską samooceną, depresyjnym nastrojem. Regularne spotkania ułożone pod Twoje tempo.',
    },
    {
      title: 'Wsparcie w relacjach',
      description:
        'Sesje dla par i osób budujących relacje. Lepsza komunikacja, granice, porozumienie.',
    },
  ],
  contact: {
    email: 'kontakt@gosia-psycholog.pl', // TODO(content)
    phone: '+48 600 000 000',            // TODO(content)
    address: 'ul. Przykładowa 1/2',
    city: '00-001 Warszawa',
    hours: 'Pon.–Pt. 9:00–18:00',
    mapUrl: 'https://maps.google.com/?q=Warszawa',
  },
  social: {
    instagram: undefined,
    facebook: undefined,
    linkedin: undefined,
  },
};
```

- [ ] **Step 2: Zdefiniuj `src/content.config.ts`**

Utwórz `src/content.config.ts`:
```ts
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog };
```

- [ ] **Step 3: Napisz najpierw test (TDD) dla `getSortedPosts`**

Utwórz `src/utils/posts.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { getSortedPosts } from './posts';
import type { CollectionEntry } from 'astro:content';

function makePost(id: string, iso: string): CollectionEntry<'blog'> {
  return {
    id,
    data: {
      title: id,
      description: '',
      pubDate: new Date(iso),
      tags: [],
    },
    body: '',
    collection: 'blog',
    rendered: {} as never,
  } as unknown as CollectionEntry<'blog'>;
}

describe('getSortedPosts', () => {
  it('zwraca posty od najnowszego do najstarszego', () => {
    const posts = [
      makePost('stary', '2024-01-01'),
      makePost('nowy', '2025-06-01'),
      makePost('srodek', '2024-12-01'),
    ];
    const sorted = getSortedPosts(posts);
    expect(sorted.map((p) => p.id)).toEqual(['nowy', 'srodek', 'stary']);
  });

  it('nie mutuje oryginalnej tablicy', () => {
    const posts = [makePost('a', '2024-01-01'), makePost('b', '2025-01-01')];
    const snapshot = posts.map((p) => p.id);
    getSortedPosts(posts);
    expect(posts.map((p) => p.id)).toEqual(snapshot);
  });
});
```

- [ ] **Step 4: Uruchom test — ma NIE przejść (funkcja nie istnieje)**

```bash
npm test
```
Oczekiwane: FAIL — `Cannot find module './posts'` lub błąd importu.

- [ ] **Step 5: Zaimplementuj `src/utils/posts.ts`**

Utwórz `src/utils/posts.ts`:
```ts
import type { CollectionEntry } from 'astro:content';

export function getSortedPosts(
  posts: CollectionEntry<'blog'>[],
): CollectionEntry<'blog'>[] {
  return [...posts].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}
```

- [ ] **Step 6: Uruchom test — ma przejść**

```bash
npm test
```
Oczekiwane: PASS (2 passed).

- [ ] **Step 7: Utwórz 2 przykładowe artykuły**

Utwórz `src/content/blog/witaj-na-moim-blogu.mdx` (zwykły Markdown, bez komponentów MDX — te dodamy w Task 6):
```md
---
title: 'Witaj na moim blogu'
description: 'Kilka słów o tym, po co ten blog i co znajdziesz w kolejnych wpisach.'
pubDate: 2025-09-01
tags: ['o-blogu']
---

Cześć! Na tym blogu będę dzielić się wiedzą o emocjach, relacjach i dbaniu o siebie — przystępnie i bez oceny.
```

Utwórz `src/content/blog/jak-wybrac-psychologa.mdx`:
```md
---
title: 'Jak wybrać psychologa?'
description: 'Na co zwrócić uwagę, szukając specjalisty, żeby decyzja była bezpieczna.'
pubDate: 2025-10-15
tags: ['porady', 'pierwsza-wizyta']
---

Wybór psychologa to ważna decyzja. Oto kilka kierunków: sprawdź wykształcenie, pytaj o podejście, a przede wszystkim — zaufaj intuicji po pierwszej sesji.
```

- [ ] **Step 8: Bramka automatyczna**

```bash
npx astro check
npm run build
```
Oczekiwane: 0 errors; `dist/` zawiera wygenerowane strony (na tym etapie jeszcze domyślny `index` Astro).

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat(data): dodaj site config i kolekcję blog z logiką sortowania"
```

---

### Task 3: SEO, BaseLayout, Header, Footer

**Files:**
- Create: `src/components/SEO.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/layouts/BaseLayout.astro`

**Interfaces:**
- Consumes: `siteConfig` z `src/data/site.ts`.
- Produces:
  - `<SEO title description image type />` (props: `title: string`, `description?: string`, `image?: string`, `type?: 'website' | 'article'`).
  - `<BaseLayout title description image type>...children</BaseLayout>` — opakowuje stronę w shell HTML i renderuje SEO/Header/Footer.
  - `<Header />` i `<Footer />` bez propsów (czytają `siteConfig`).

- [ ] **Step 1: Utwórz `src/components/SEO.astro`**

```astro
---
import { siteConfig } from '../data/site';

interface Props {
  title: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

const { title, description = siteConfig.description, image, type = 'website' } = Astro.props;

const canonical = new URL(Astro.url.pathname, Astro.site);
const ogImage = image ? new URL(image, Astro.site) : new URL('/images/og-default.png', Astro.site);

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Psychologist',
  name: siteConfig.name,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.contact.address,
    addressLocality: siteConfig.contact.city,
  },
};
---
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
<meta property="og:type" content={type} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImage} />
<meta property="og:url" content={canonical} />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<script type="application/ld+json" set:html={JSON.stringify(personSchema)} />
```

- [ ] **Step 2: Utwórz `src/components/Header.astro`**

```astro
---
import { siteConfig } from '../data/site';
const path = Astro.url.pathname;
---
<header class="border-b border-stone-200 bg-white/80 backdrop-blur sticky top-0 z-10">
  <div class="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
    <a href="/" class="text-lg font-semibold text-stone-900">{siteConfig.name}</a>
    <nav aria-label="Główna nawigacja">
      <ul class="flex gap-5 text-sm">
        {siteConfig.nav.map((item) => (
          <li>
            <a
              href={item.href}
              aria-current={path === item.href ? 'page' : undefined}
              class={`hover:text-stone-900 ${path === item.href ? 'text-stone-900 font-medium' : 'text-stone-600'}`}
            >{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  </div>
</header>
```

- [ ] **Step 3: Utwórz `src/components/Footer.astro`**

```astro
---
import { siteConfig } from '../data/site';
const year = new Date().getFullYear();
---
<footer class="mt-16 border-t border-stone-200 bg-white">
  <div class="mx-auto flex max-w-4xl flex-col gap-2 px-4 py-8 text-sm text-stone-600 sm:flex-row sm:justify-between">
    <p>© {year} {siteConfig.name}</p>
    <p>{siteConfig.contact.email} · {siteConfig.contact.phone}</p>
  </div>
</footer>
```

- [ ] **Step 4: Utwórz `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/global.css';
import { siteConfig } from '../data/site';
import SEO from '../components/SEO.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}
const { title, description, image, type } = Astro.props;
---
<!doctype html>
<html lang="pl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <SEO title={title} description={description} image={image} type={type} />
  </head>
  <body class="flex min-h-screen flex-col">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 5: Utwórz tymczasowy `favicon.svg` w `public/`**

Utwórz `public/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#6b7f8c"/><text x="16" y="22" font-size="18" text-anchor="middle" fill="#fff" font-family="sans-serif">M</text></svg>
```

- [ ] **Step 6: Bramka automatyczna**

```bash
npx astro check
npm run build
```
Oczekiwane: 0 errors; build OK.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(layout): dodaj BaseLayout, SEO, Header i Footer"
```

---

### Task 4: Strona główna

**Files:**
- Create: `src/components/ServiceCard.astro`, `src/components/ArticleCard.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `siteConfig`, `getCollection('blog')`, `getSortedPosts`.
- Produces: `<ServiceCard service={Service} />`, `<ArticleCard post={CollectionEntry<'blog'>} />`.

- [ ] **Step 1: Utwórz `src/components/ServiceCard.astro`**

```astro
---
import type { Service } from '../data/site';
interface Props { service: Service; }
const { service } = Astro.props;
---
<article class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
  <h3 class="text-lg font-semibold text-stone-900">{service.title}</h3>
  <p class="mt-2 text-sm text-stone-600">{service.description}</p>
</article>
```

- [ ] **Step 2: Utwórz `src/components/ArticleCard.astro`**

```astro
---
import type { CollectionEntry } from 'astro:content';
interface Props { post: CollectionEntry<'blog'>; }
const { post } = Astro.props;
const date = post.data.pubDate.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
---
<a href={`/blog/${post.id}/`} class="block rounded-xl border border-stone-200 bg-white p-6 shadow-sm hover:shadow-md transition">
  <time class="text-xs uppercase tracking-wide text-stone-500">{date}</time>
  <h3 class="mt-1 text-lg font-semibold text-stone-900">{post.data.title}</h3>
  <p class="mt-2 text-sm text-stone-600">{post.data.description}</p>
</a>
```

- [ ] **Step 3: Zastąp `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ServiceCard from '../components/ServiceCard.astro';
import ArticleCard from '../components/ArticleCard.astro';
import { siteConfig } from '../data/site';
import { getCollection } from 'astro:content';
import { getSortedPosts } from '../utils/posts';

const latest = getSortedPosts(await getCollection('blog')).slice(0, 3);
---
<BaseLayout title={siteConfig.title}>
  <!-- Hero: pełny viewport (100vh), 2 kolumny — lewa: opis, prawa: zdjęcie -->
  <section class="grid min-h-screen grid-cols-1 md:grid-cols-2">
    <div class="flex flex-col justify-center bg-sage-light px-8 py-16 md:px-16">
      <p class="text-sm font-medium uppercase tracking-wide text-sage-dark">Psycholog</p>
      <h1 class="mt-2 text-4xl font-bold text-stone-900 sm:text-5xl">{siteConfig.name}</h1>
      <p class="mt-4 max-w-md text-lg text-sage-dark">{siteConfig.tagline}</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="/kontakt" class="rounded-lg bg-sage-dark px-5 py-2.5 text-sm font-medium text-white hover:bg-sage-medium">Umów konsultację</a>
        <a href="/oferta" class="rounded-lg border border-sage-dark px-5 py-2.5 text-sm font-medium text-sage-dark hover:bg-sage-light/40">Zobacz ofertę</a>
      </div>
    </div>
    <div class="min-h-[40vh] bg-sage-medium md:min-h-0">
      <!-- TODO(content): wstaw prawdziwe zdjęcie psychologa; do tego czasu placeholder -->
      <img src="/images/psycholog-placeholder.svg" alt={siteConfig.name} class="h-full w-full object-cover" />
    </div>
  </section>

  <!-- Reszta treści po przewinięciu -->
  <div class="container-page">
    <section class="py-8">
      <h2 class="mb-6 text-2xl font-semibold text-stone-900">W czym mogę pomóc</h2>
      <div class="grid gap-4 sm:grid-cols-3">
        {siteConfig.services.map((s) => <ServiceCard service={s} />)}
      </div>
    </section>

    <section class="py-8">
      <div class="mb-6 flex items-baseline justify-between">
        <h2 class="text-2xl font-semibold text-stone-900">Najnowsze wpisy</h2>
        <a href="/blog" class="text-sm text-stone-600 hover:text-stone-900">Wszystkie →</a>
      </div>
      <div class="grid gap-4 sm:grid-cols-3">
        {latest.map((p) => <ArticleCard post={p} />)}
      </div>
    </section>
  </div>
</BaseLayout>
```

Utwórz `public/images/psycholog-placeholder.svg` (placeholder do czasu dostarczenia prawdziwego zdjęcia):
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <rect width="800" height="1000" fill="#8a9a7b"/>
  <circle cx="400" cy="380" r="120" fill="#c8d3c0"/>
  <rect x="250" y="540" width="300" height="320" rx="40" fill="#c8d3c0"/>
  <text x="400" y="930" font-size="34" text-anchor="middle" fill="#ffffff" font-family="sans-serif">Zdjęcie psychologa</text>
</svg>
```

- [ ] **Step 4: Weryfikacja wizualna + automatyczna**

```bash
npm run dev
```
Otwórz `http://localhost:4321/` — hero zajmuje pełny viewport (100vh), podzielony na 2 kolumny (lewa: imię + slogan na tle szałwii, prawa: placeholder zdjęcia); po przewinięciu 3 usługi i 3 najnowsze wpisy.

```bash
npx astro check && npm run build
```
Oczekiwane: 0 errors, build OK.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(home): zbuduj stronę główną z usługami i najnowszymi wpisami"
```

---

### Task 5: Podstrony statyczne: O mnie, Oferta, Kontakt

**Files:**
- Create: `src/pages/o-mnie.astro`, `src/pages/oferta.astro`, `src/pages/kontakt.astro`

**Interfaces:**
- Consumes: `BaseLayout`, `siteConfig`, `ServiceCard`.

- [ ] **Step 1: Utwórz `src/pages/o-mnie.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { siteConfig } from '../data/site';
// TODO(content): umieść prawdziwe zdjęcie w src/assets/portret.jpg
// i zaimportuj/use <Image /> z 'astro:assets' (patrz Task 8).
---
<BaseLayout title={`O mnie — ${siteConfig.name}`} description={`Poznaj ${siteConfig.name}, psychologa.`}>
  <div class="container-page">
    <article class="prose prose-stone max-w-none">
      <h1>O mnie</h1>
      <p>
        <!-- TODO(content): wstaw prawdziwy biogram psychologa -->
        Jestem psychologiem z wieloletnią praktyką. W swojej pracy stawiam na bezpieczną,
        pozbawioną oceny relację, w której możesz poczuć się naprawdę wysłuchany.
      </p>
      <h2>Wykształcenie i doświadczenie</h2>
      <ul>
        <li><!-- TODO(content) -->Magister psychologii, Uniwersytet Warszawski</li>
        <li><!-- TODO(content) -->Kilka lat pracy w poradni i praktyce prywatnej</li>
      </ul>
    </article>
  </div>
</BaseLayout>
```

- [ ] **Step 2: Utwórz `src/pages/oferta.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ServiceCard from '../components/ServiceCard.astro';
import { siteConfig } from '../data/site';
---
<BaseLayout title={`Oferta — ${siteConfig.name}`} description="Zakres wsparcia i formy współpracy.">
  <div class="container-page">
    <h1 class="mb-8 text-3xl font-bold text-stone-900">Oferta</h1>
    <div class="grid gap-4 sm:grid-cols-2">
      {siteConfig.services.map((s) => <ServiceCard service={s} />)}
    </div>
    <div class="mt-10 rounded-xl bg-stone-100 p-6">
      <h2 class="text-xl font-semibold text-stone-900">Jak wygląda pierwsza sesja?</h2>
      <p class="mt-2 text-sm text-stone-600">
        <!-- TODO(content) -->
        Pierwsze spotkanie to poznanie siebie i ustalenie, w czym mogę pomóc. Trwa 50 minut.
        Koszt i zasady omawiamy mailowo przed spotkaniem.
      </p>
    </div>
  </div>
</BaseLayout>
```

- [ ] **Step 3: Utwórz `src/pages/kontakt.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { siteConfig } from '../data/site';
const c = siteConfig.contact;
---
<BaseLayout title={`Kontakt — ${siteConfig.name}`} description="Dane kontaktowe i godziny przyjęć.">
  <div class="container-page">
    <h1 class="mb-8 text-3xl font-bold text-stone-900">Kontakt</h1>
    <div class="grid gap-8 sm:grid-cols-2">
      <div class="space-y-3 text-stone-700">
        <p><span class="block text-xs uppercase text-stone-500">Email</span><a href={`mailto:${c.email}`} class="hover:underline">{c.email}</a></p>
        <p><span class="block text-xs uppercase text-stone-500">Telefon</span><a href={`tel:${c.phone.replace(/\s+/g, '')}`} class="hover:underline">{c.phone}</a></p>
        <p><span class="block text-xs uppercase text-stone-500">Adres</span>{c.address}, {c.city}</p>
        <p><span class="block text-xs uppercase text-stone-500">Godziny</span>{c.hours}</p>
      </div>
      <div class="rounded-xl border border-stone-200 bg-white p-6">
        <p class="text-sm text-stone-600">
          <!-- TODO(content) -->
          Najlepiej kontaktować się mailowo — odpowiadam w ciągu 1–2 dni roboczych.
          W wiadomości podaj krótko, w jakiej sprawie piszesz oraz preferowane terminy.
        </p>
      </div>
    </div>
    <!-- TODO(content): gdy pojawi się formularz → Formspree/Netlify Forms (bez backendu) -->
  </div>
</BaseLayout>
```

- [ ] **Step 4: Weryfikacja wizualna + automatyczna**

```bash
npm run dev
```
Sprawdź `/o-mnie`, `/oferta`, `/kontakt`.

```bash
npx astro check && npm run build
```
Oczekiwane: 0 errors, build OK.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(pages): dodaj O mnie, Ofertę i Kontakt"
```

---

### Task 6: Blog — lista i artykuł (MDX)

**Files:**
- Create: `src/components/Callout.astro`, `src/layouts/ArticleLayout.astro`, `src/pages/blog/index.astro`, `src/pages/blog/[...slug].astro`

**Interfaces:**
- Consumes: `getCollection('blog')`, `render(post)` z `astro:content`, `getSortedPosts`, `BaseLayout`.
- Produces:
  - `<Callout type="tip" | "note" | "warning" />` (slot: treść).
  - `<ArticleLayout post={CollectionEntry<'blog'>} />` (slot: wyrenderowany MDX).

- [ ] **Step 1: Utwórz `src/components/Callout.astro`**

```astro
---
interface Props { type?: 'tip' | 'note' | 'warning'; }
const { type = 'note' } = Astro.props;
const styles: Record<string, string> = {
  tip: 'border-emerald-300 bg-emerald-50 text-emerald-900',
  note: 'border-sky-300 bg-sky-50 text-sky-900',
  warning: 'border-amber-300 bg-amber-50 text-amber-900',
};
---
<aside class={`my-6 rounded-lg border p-4 text-sm ${styles[type]}`}>
  <slot />
</aside>
```

- [ ] **Step 2: Zademonstruj użycie `Callout` w artykule MDX**

Edytuj `src/content/blog/witaj-na-moim-blogu.mdx`, dodając import i ramkę na górze treści:
```md
---
title: 'Witaj na moim blogu'
description: 'Kilka słów o tym, po co ten blog i co znajdziesz w kolejnych wpisach.'
pubDate: 2025-09-01
tags: ['o-blogu']
---

import Callout from '../../components/Callout.astro';

<Callout type="tip">
  To jest przykładowa ramka. Artykuły mogą używać komponentów MDX.
</Callout>

Cześć! Na tym blogu będę dzielić się wiedzą o emocjach, relacjach i dbaniu o siebie — przystępnie i bez oceny.
```

- [ ] **Step 3: Utwórz `src/layouts/ArticleLayout.astro`**

```astro
---
import BaseLayout from './BaseLayout.astro';
import type { CollectionEntry } from 'astro:content';
interface Props { post: CollectionEntry<'blog'>; }
const { post } = Astro.props;
const date = post.data.pubDate.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
---
<BaseLayout title={`${post.data.title} — blog`} description={post.data.description} type="article">
  <div class="container-page">
    <article class="prose prose-stone max-w-none">
      <p><a href="/blog" class="text-sm text-stone-500 hover:text-stone-800">← Wróć do bloga</a></p>
      <h1>{post.data.title}</h1>
      <time class="text-sm text-stone-500">{date}</time>
      <slot />
    </article>
  </div>
</BaseLayout>
```

- [ ] **Step 4: Utwórz `src/pages/blog/index.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import ArticleCard from '../../components/ArticleCard.astro';
import { getCollection } from 'astro:content';
import { getSortedPosts } from '../../utils/posts';
const posts = getSortedPosts(await getCollection('blog'));
---
<BaseLayout title="Blog" description="Artykuły o emocjach, relacjach i dbaniu o siebie.">
  <div class="container-page">
    <h1 class="mb-8 text-3xl font-bold text-stone-900">Blog</h1>
    <div class="grid gap-4">
      {posts.map((p) => <ArticleCard post={p} />)}
    </div>
  </div>
</BaseLayout>
```

- [ ] **Step 5: Utwórz `src/pages/blog/[...slug].astro`**

```astro
---
import { getCollection, render } from 'astro:content';
import ArticleLayout from '../../layouts/ArticleLayout.astro';
import Callout from '../../components/Callout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---
<ArticleLayout post={post}>
  <Content components={{ Callout }} />
</ArticleLayout>
```

- [ ] **Step 6: Weryfikacja wizualna + automatyczna**

```bash
npm run dev
```
Sprawdź `/blog` oraz kliknij w oba wpisy. W artykule „Witaj na moim blogu" ramka `Callout` renderuje się poprawnie.

```bash
npx astro check && npm run build
```
Oczekiwane: 0 errors; `dist/blog/` zawiera strony wpisów.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(blog): lista wpisów, strona artykułu MDX i komponent Callout"
```

---

### Task 7: Sitemap, robots.txt, RSS, 404

**Files:**
- Create: `src/pages/rss.xml.ts`, `src/pages/404.astro`, `public/robots.txt`
- Modify: brak (sitemap jest już podpięty w `astro.config.mjs`)

**Interfaces:**
- Consumes: integracja `@astrojs/sitemap` (już aktywna), `getCollection('blog')`, `siteConfig`, `@astrojs/rss`.

- [ ] **Step 1: Utwórz `src/pages/rss.xml.ts`**

```ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { siteConfig } from '../data/site';
import { getSortedPosts } from '../utils/posts';

export async function GET(context: APIContext) {
  const posts = getSortedPosts(await getCollection('blog'));
  return rss({
    title: `${siteConfig.name} — blog`,
    description: siteConfig.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
    })),
  });
}
```

- [ ] **Step 2: Utwórz `public/robots.txt`**

```txt
User-agent: *
Allow: /

Sitemap: https://www.gosia-psycholog.pl/sitemap-index.xml
```
<!-- TODO(content): zastąp domenę prawdziwą -->

- [ ] **Step 3: Utwórz `src/pages/404.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Nie znaleziono strony">
  <div class="py-20 text-center">
    <h1 class="text-3xl font-bold text-stone-900">404 — nie znaleziono strony</h1>
    <p class="mt-3 text-stone-600">Wygląda na to, że ten adres nie istnieje.</p>
    <a href="/" class="mt-6 inline-block rounded-lg bg-stone-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-900">Wróć na stronę główną</a>
  </div>
</BaseLayout>
```

- [ ] **Step 4: Bramka automatyczna**

```bash
npx astro check && npm run build
```
Oczekiwane: 0 errors; `dist/` zawiera `rss.xml`, `sitemap-index.xml`, `404.html`, `robots.txt`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(seo): dodaj RSS, robots.txt, sitemap i stronę 404"
```

---

### Task 8: Open Graph image + weryfikacja obrazów

**Files:**
- Create: `public/images/og-default.png` (placeholder)
- Modify: `src/pages/o-mnie.astro` (opcjonalne użycie `<Image />` po dodaniu `src/assets/portret.jpg`)

**Interfaces:** brak nowych interfejsów — uzupełnianie zasobów.

- [ ] **Step 1: Utwórz domyślny obraz OG (placeholder)**

Wygeneruj lub umieść w `public/images/og-default.png` obraz 1200×630 px (np. tło w kolorze akcentu z imieniem psychologa). Do zadania deweloperskiego wystarczy dowolny obraz 1200×630; klient podmieni projekt graficzny.

Jeśli brak narzędzia graficznego, utwórz tymczasowy SVG i przekonwertuj:
```bash
# opcjonalnie, jeśli zainstalowany ImageMagick:
magick -size 1200x630 '#6b7f8c' -gravity center -fill white -pointsize 64 -annotate +0+0 'Psycholog' public/images/og-default.png
```
W razie braku ImageMagick — umieść dowolny plik PNG 1200×630. To zasób klienta (TODO(content)).

- [ ] **Step 2: Bramka automatyczna**

```bash
npx astro check && npm run build
```
Oczekiwane: 0 errors; `og-default.png` jest kopiowany do `dist/images/`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore(assets): dodaj domyślny obraz Open Graph"
```

---

### Task 9: Deploy na Cloudflare Pages

**Files:**
- Create: `README.md` (instrukcja deployu), ewentualnie plik konfiguracyjny w UI Cloudflare.

**Interfaces:** brak — konfiguracja zewnętrznego hostingu.

- [ ] **Step 1: Upewnij się, że projekt buduje się czysto lokalnie**

```bash
npm run build
```
Oczekiwane: sukces, katalog `dist/` z pełną stroną (index, podstrony, blog, rss, sitemap).

- [ ] **Step 2: Wypchnij repozytorium na GitHub**

Utwórz repozytorium na GitHub (prywatne) i wypchnij:
```bash
git remote add origin https://github.com/<USER>/gosia-psycholog.git
git branch -M main
git push -u origin main
```

- [ ] **Step 3: Utwórz projekt w Cloudflare Pages**

W panelu Cloudflare → **Workers & Pages → Create → Pages → Connect to Git**:
1. Wybierz repozytorium `gosia-psycholog`.
2. Ustaw:
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version** (Environment variables): `NODE_VERSION = 20`
3. **Save and Deploy.**

- [ ] **Step 4: Zweryfikuj podgląd (deploy preview)**

Po zbudowaniu otwórz udostępniony URL `*.pages.dev`:
- strona główna ładuje się ze stylami,
- nawigacja prowadzi do wszystkich podstron,
- `/blog` i wpisy renderują się,
- `/rss.xml` i `/sitemap-index.xml` zwracają XML.

- [ ] **Step 5: Podłącz własną domenę**

W Cloudflare Pages → **Custom domains → Set up a domain**:
1. Dodaj domenę (np. `gosia-psycholog.pl` i `www.gosia-psycholog.pl`).
2. Cloudflare skonfiguruje rekordy CNAME i certyfikat SSL automatycznie (jeśli domena jest w Cloudflare) — lub postępuj wg instrukcji dla zewnętrznego rejestratora.

- [ ] **Step 6: Zaktualizuj `site` prawdziwą domeną i `robots.txt`**

W `astro.config.mjs` zmień `site` na prawdziwą domenę oraz popraw URL sitemap w `public/robots.txt`.
```bash
npm run build
git add -A
git commit -m "chore(config): ustaw produkcyjną domenę"
git push
```
Cloudflare przebuduje stronę automatycznie (auto-deploy po `git push`).

- [ ] **Step 7: Utwórz `README.md` z instrukcją**

Utwórz `README.md`:
````markdown
# Strona psychologa (Astro)

## Rozwój
```bash
npm install
npm run dev      # http://localhost:4321
```

## Build i weryfikacja
```bash
npx astro check  # typy/diagnostyka
npm run build    # build statyczny do dist/
npm test         # testy Vitest
```

## Deploy
Automatyczny przez Cloudflare Pages po `git push` na `main`.
- Build command: `npm run build`
- Output: `dist/`

## Treść
- Dane psychologa/usług/kontaktu: `src/data/site.ts`
- Artykuły: `src/content/blog/*.mdx`
- Docelowo: panel CMS (TinaCMS lub Sanity) — patrz `docs/superpowers/specs/2026-08-13-tech-stack-design.md`
````

- [ ] **Step 8: Końcowy commit**

```bash
git add -A
git commit -m "docs: dodaj README z instrukcją deployu"
git push
```

---

## Definition of Done

- [ ] Wszystkie podstrony (`/`, `/o-mnie`, `/oferta`, `/kontakt`, `/blog`, `/blog/[slug]`, `/404`) renderują się i są w `dist/`.
- [ ] `npx astro check` → 0 błędów; `npm run build` → sukces; `npm test` → zielono.
- [ ] SEO: unikalne title/description per strona, canonical, Open Graph, structured data `Psychologist`.
- [ ] `rss.xml`, `sitemap-index.xml`, `robots.txt` obecne w `dist/`.
- [ ] Strona wdrożona na Cloudflare Pages pod własną domeną z SSL; auto-deploy po `git push`.
- [ ] Miejsca `TODO(content)` udokumentowane do uzupełnienia przez klienta.

# Strona psychologa (Astro)

Statyczna strona wizytówki psychologa zbudowana w **Astro 7.2** + **Tailwind CSS 4.3**, przeznaczona do hostingu na **Cloudflare Pages**.

## Rozwój

```bash
npm install
npm run dev      # http://localhost:4321
```

Wymagany Node w wersji zgodnej z `engines` w `package.json` (`>=20.19.0`).

## Build i weryfikacja

```bash
npx astro check  # typy/diagnostyka (oczekiwane 0 błędów)
npm run build    # build statyczny do dist/
npm test         # testy Vitest
```

## Deploy (Cloudflare Pages)

### 1. Wypchnij repozytorium na GitHub

Utwórz prywatne repozytorium na GitHub, a następnie:

```bash
git remote add origin https://github.com/<USER>/gosia-psycholog.git
git branch -M main
git push -u origin main
```

### 2. Utwórz projekt w Cloudflare Pages

W panelu Cloudflare → **Workers & Pages → Create → Pages → Connect to Git**:

1. Wybierz repozytorium `gosia-psycholog`.
2. Ustaw:
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variables:** `NODE_VERSION = 20` (zgodne z `engines` w `package.json`)
3. **Save and Deploy.**

Po każdym `git push` na `main` Cloudflare automatycznie przebuduje stronę.

### 3. Zweryfikuj podgląd (`*.pages.dev`)

- strona główna ładuje się ze stylami,
- nawigacja prowadzi do wszystkich podstron,
- `/blog` i wpisy renderują się,
- `/rss.xml` i `/sitemap-index.xml` zwracają XML.

### 4. Podłącz własną domenę

W Cloudflare Pages → **Custom domains → Set up a domain**:

1. Dodaj domenę (np. `gosia-psycholog.pl` i `www.gosia-psycholog.pl`).
2. Jeśli domena jest zarządzana w Cloudflare — rekordy CNAME i certyfikat SSL konfigurowane są automatycznie; w przeciwnym razie postępuj wg instrukcji dla zewnętrznego rejestratora.

### 5. Ustaw prawdziwą domenę przed produkcją

Placeholder `https://www.gosia-psycholog.pl` (oznaczony `TODO(content)` w `astro.config.mjs` oraz `public/robots.txt`) **musi zostać zastąpiony** prawdziwą domeną klienta. Po zmianie:

```bash
npm run build
git add -A
git commit -m "chore(config): ustaw produkcyjną domenę"
git push
```

## Treść

- Dane psychologa / usług / kontaktu: `src/data/site.ts`
- Artykuły: `src/content/blog/*.mdx`
- Docelowo: panel CMS (TinaCMS lub Sanity) — patrz `docs/superpowers/specs/2026-08-13-tech-stack-design.md`

## Struktura

```text
/
├── public/              # pliki statyczne (favicon, robots.txt, obrazy OG/placeholder)
├── src/
│   ├── components/      # komponenty Astro (SEO, Callout, Card itp.)
│   ├── content/blog/    # artykuły MDX
│   ├── data/site.ts     # dane psychologa, usług, kontaktu, nawigacji
│   ├── layouts/         # BaseLayout
│   ├── pages/           # trasy (/, /o-mnie, /oferta, /kontakt, /blog, /blog/[slug], /404, /rss.xml)
│   └── utils/           # helpery + testy Vitest
├── astro.config.mjs
└── package.json
```

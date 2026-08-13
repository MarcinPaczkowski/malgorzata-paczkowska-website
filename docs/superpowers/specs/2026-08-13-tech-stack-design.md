# Wybór technologii — strona psychologa

**Data:** 2026-08-13
**Status:** zatwierdzony
**Etapy:** wybór stacku technologicznego (przed implementacją)

## 1. Kontekst i cel

Budujemy stronę internetową dla psychologa (Gosia) — witrynę prezentacyjną z blogiem. Strona ma być prosta w utrzymaniu, szybka, dobrze pozycjonowana w Google (lokalny biznes) i darmowa w hostingu.

### Wymagania (potwierdzone z klientem)

1. **Podstrony:** strona główna, O mnie, Oferta, Kontakt oraz **blog/artykuły**.
2. **Brak** formularza kontaktowego i **brak** modułu rezerwacji wizyt na start.
3. **Treść na start** zaszyta w kodzie (Markdown), edytowana przez dewelopera.
4. **Docelowo** panel CMS do edycji treści przez nietechniczną osobę (psychologa) — migracja.
5. **Tylko frontend**, bez ciężkiego backendu.
6. **Darmowy, prosty deploy**; własna domena `.pl`.
7. **Strona tylko po polsku** na start (z otwartą drogą do i18n później).

### Kluczowa decyzja architektoniczna

Treść zaczyna jako Markdown w repo, a docelowo ma być edytowana przez psychologa. Dlatego framework musi **abstrahować źródło treści**, by podmiana Markdown → CMS nie wymagała przepisywania komponentów.

## 2. Wybrany stack

| Warstwa | Wybór | Uzasadnienie |
|---|---|---|
| Framework | **Astro** | Stworzony pod strony contentowe; Content Collections pozwalają zacząć od Markdowna i podmienić źródło na CMS bez zmiany komponentów. Zero JS domyślnie → najszybsza, najlepsze SEO. |
| Treść (start) | **Markdown / MDX + Content Collections** | Typowane, walidowana schema frontmatteru; wersjonowane w git. |
| Treść (docelowo) | **TinaCMS** (preferowany) lub **Sanity / Storyblok** — decyzja odroczona | Patrz sekcja 3. |
| Język | **TypeScript** | Bezpieczeństwo typów + walidacja schema kolekcji. |
| Stylowanie | **Tailwind CSS** | Szybkie budowanie spójnego designu, brak narzutu CSS. |
| SEO | meta-tagi + `sitemap` + `robots.txt` + **structured data** | Schema `Person`, `HealthAndBeautyBusiness`/`LocalBusiness`, `FAQPage`. |
| RSS | kanał RSS do bloga | Subskrypcja czytelników. |
| Obrazy | wbudowany `<Image />` (Astro) | WebP/AVIF, lazy-load. |
| Deploy | **Cloudflare Pages** (darmowy) | Nielimitowany bandwidth, globalny CDN, własna domena + SSL gratis, auto-deploy po `git push`. |
| Domena | własna `.pl` u rejestratora | Osobna opłata u rejestratora (Cloudflare/Nazwa/OVH), ok. kilkanaście zł/rok. |

### Odrzucone alternatywy

- **Next.js (static export)** — zasadny tylko przy skomplikowanej interaktywności; dla strony contentowej wysyła zbyt dużo JS i wprowadza zbędny boilerplate.
- **Hugo / Eleventy** — szybkie, ale gorszy DX, mniej przyjazne szablony (Hugo) i brak czystej warstwy abstrakcji treści → trudniejsza późniejsza podmiana na CMS.
- **Vercel / Netlify / GitHub Pages** — wszystkie działają z Astro; Cloudflare wybrany dla najlepszych darmowych limitów i wydajności. Netlify pozostaje realną alternatywą (szczególnie gdyby kiedyś pojawił się formularz — Netlify Forms bez backendu).

## 3. Strategia treści i droga do CMS

Dwie możliwe ścieżki, decyzję podejmujemy przy migracji (nie dzisiaj):

### Ścieżka A (preferowana): git-based CMS — **brak migracji**
- Markdown w repo pozostaje jedynym źródłem prawdy na stałe.
- Docelowo dokładamy **TinaCMS** (lub Decap CMS) — panel, który edytuje te same pliki `.md` i commituje do gita.
- Psycholog loguje się do panelu, pisze artykuł, „zapisz" → commit → auto-deploy. Nie widzi kodu.
- Deweloper: treść nadal w git, wersjonowana. Zero przepisywania.
- **Ograniczenie:** git-based CMS-y są świetne do artykułów/prostych treści, słabsze przy bardzo złożonych, relacyjnych modelach treści. Dla strony psychologa wystarcza.

### Ścieżka B: API-based CMS — klasyczna migracja
- Docelowo **Sanity** lub **Storyblok**; zmiana źródła danych w Content Collections (komponenty te same), ale treści trzeba „przeprowadzić" z plików do CMS.
- Uzasadniona, gdyby pojawiła się potrzeba złożonego modelowania treści lub visual editingu na dużą skalę.

**Wniosek:** architektura Astro + Content Collections obsługuje obie ścieżki, więc wybór konkretnego CMS-u pozostaje otwarty i nie blokuje dzisiejszej implementacji.

## 4. Architektura i podział na jednostki

Strona statyczna generowana w build time. Każda podstrona to własny route Astro, komponenty UI w izolowanych plikach, treść w kolekcjach.

### Planowane podstrony
- `/` — strona główna (hero, krótko o mnie, wyróżnione usługi, najnowsze artykuły, CTA kontakt).
- `/o-mnie` — biogram, wykształcenie, podejście, zdjęcie.
- `/oferta` — lista usług (np. konsultacje dla dorosłych, terapia par, wsparcie kryzysowe).
- `/kontakt` — dane kontaktowe, godziny, lokalizacja, RODO/komunikat o danych (brak formularza na start).
- `/blog` — lista artykułów (paginacja/filtr tagów opcjonalnie później).
- `/blog/[slug]` — pojedynczy artykuł (MDX).

### Warstwy
1. **Treść** — Content Collections (`src/content/`): kolekcja `blog` (artykuły) oraz dane stron statycznych (np. `site` config: dane psychologa, usługi, dane kontaktowe).
2. **Komponenty UI** (`src/components/`) — reużywalne, izolowane: `Header`, `Footer`, `ServiceCard`, `ArticleCard`, `SEO`, `Callout` (do MDX) itd.
3. **Layouty** (`src/layouts/`) — `BaseLayout` (HTML shell, SEO, header/footer), `ArticleLayout`.
4. **Strony** (`src/pages/`) — mapowanie URL → komponenty.
5. **Stylowanie** — Tailwind (config + globalny CSS w `src/styles/`).
6. **SEO/infra** — `astro:config` (integracje: `@astrojs/sitemap`, `@astrojs/rss`, `@astrojs/mdx`, Tailwind), `public/robots.txt`, structured data.

### Przepływ danych
- Build: Astro czyta Content Collections (Markdown/MDX) → generuje statyczne HTML dla każdego route'u → wynik trafia na Cloudflare Pages.
- Edycja treści: dev (teraz) lub psycholog przez CMS (docelowo) modyfikuje pliki w `src/content/` → commit → Cloudflare odbudowuje stronę.

## Paleta kolorów i układ hero (decyzja projektowa)

### Paleta — dominujący szałwiowy zielony
Tokeny Tailwind v4 definiowane w bloku `@theme` w `src/styles/global.css` (generują utility typu `bg-sage`, `text-sage-dark`):

| Etykieta (PL) | Token | Hex | Przeznaczenie |
|---|---|---|---|
| jasna szałwia | `--color-sage-light` | `#C8D3C0` | tła sekcji, powierzchnie, delikatne akcenty |
| klasyczna szałwia | `--color-sage` | `#9CAF88` | kolor wiodły/brand, ikony, obramowania |
| średnia szałwia | `--color-sage-medium` | `#8A9A7B` | stany hover, elementy drugoplanowe |
| ciemna szałwia | `--color-sage-dark` | `#6B7A5E` | tekst akcentowy, przyciski (CTA) |

Neutralne `stone` (z Tailwind) dla tekstu bazowego i powierzchni. **Szałwia jest kolorem dominującym** (tła hero, przyciski, akcenty); `stone` zapewnia czytelność tekstu.

### Układ homepage — hero full-viewport
1. Pierwsza sekcja zajmuje **100% wysokości viewportu** (`min-h-screen`).
2. Podział na **dwie kolumny** (grid `md:grid-cols-2`; na mobile układ kolumnowy, tekst nad zdjęciem).
3. **Prawa kolumna:** zdjęcie psychologa (`object-cover`, pełna wysokość) — dostarczone później; do tego czasu placeholder SVG.
4. **Lewa kolumna:** tło `sage-light`, treść wyśrodkowana pionowo — imię i nazwisko, slogan (`tagline`), rola oraz CTA („Umów konsultację", „Zobacz ofertę").
5. Po przewinięciu w dół — reszta treści (usługi, najnowsze wpisy) w kontenerze `.container-page`.

### Kontener treści
`BaseLayout` nie narzuca szerokości (`<main class="flex-1">`). Strony używają klasy `.container-page` (`mx-auto max-w-4xl px-4 py-10`) dla wyśrodkowanej treści. Hero na homepage jest pełnoekranowy (poza kontenerem).

## 5. Obsługa błędów i jakości

- **Walidacja treści:** schema Zod w Content Collections odrzuca błędny frontmatter już w buildzie.
- **Linki:** sprawdzanie niedziałających linków (np. `linkinator` lub Astro `astro check`).
- **Dostępność (a11y):** semantyczny HTML, kontrast, `alt` obrazów — istotne także dla SEO i zgodności.
- **RODO/prywatność:** strona psychologa przetwarza wrażliwe dane wizerunku/kontaktu — minimalizacja: brak formularza na start, komunikat o prywatności, ew. polityka prywatności; brak ciężkich skryptów śledzących.

## 6. Poza zakresem (na start)

- Formularz kontaktowy (gdy potrzebny → Formspree / Netlify Forms, bez backendu).
- Rezerwacja wizyt online (gdy potrzebna → integracja z Calendly/Booksy).
- Wielojęzyczność (droga otwarta przez i18n Astro).
- Headless CMS (decyzja odroczona — patrz sekcja 3).

## 7. Kolejne kroki

1. Plan implementacji (przez skill `writing-plans`).
2. Inicjalizacja projektu Astro + Tailwind + TypeScript.
3. Struktura katalogów, BaseLayout, dane strony w kolekcji `site`.
4. Podstrony statyczne + blog (lista + artykuł MDX).
5. SEO (meta, sitemap, robots, structured data, RSS).
6. Konfiguracja deployu na Cloudflare Pages + własna domena.

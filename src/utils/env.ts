// ──────────────────────────────────────────────────────────────────────────
// Wykrywanie środowiska builda. Indeksowanie przez wyszukiwarki włączamy
// wyłącznie dla gałęzi produkcyjnej — preview, branch deploye i buildy lokalne
// mają zostać poza indeksem.
// ──────────────────────────────────────────────────────────────────────────

export const PRODUCTION_BRANCH = 'main';

/** Zmienne z nazwą gałęzi, w kolejności pierwszeństwa. */
const BRANCH_ENV_VARS = [
  'SITE_BRANCH', // ręczne nadpisanie — działa na każdym hostingu
  'BRANCH', // Netlify
  'VERCEL_GIT_COMMIT_REF', // Vercel
  'CF_PAGES_BRANCH', // Cloudflare Pages
  'GITHUB_REF_NAME', // GitHub Actions
] as const;

type Env = Record<string, string | undefined>;

export function detectBranch(env: Env): string | undefined {
  for (const key of BRANCH_ENV_VARS) {
    const value = env[key]?.trim();
    if (value) return value;
  }
  return undefined;
}

/**
 * Fail-safe: gdy gałęzi nie da się ustalić, traktujemy build jako nieprodukcyjny.
 * Przypadkowe zaindeksowanie preview jest trudniejsze do cofnięcia niż
 * dołożenie brakującej zmiennej środowiskowej.
 */
export function isIndexable(env: Env): boolean {
  return detectBranch(env) === PRODUCTION_BRANCH;
}

/**
 * Komunikat ostrzegawczy, gdy środowiska nie da się rozpoznać. Zwracany zamiast
 * wypisywany, żeby integracja mogła go wyemitować raz, przez logger Astro.
 */
export function missingBranchWarning(env: Env): string | undefined {
  if (detectBranch(env) !== undefined) return undefined;
  return (
    `Nie wykryto gałęzi (${BRANCH_ENV_VARS.join(', ')}) — build oznaczony jako nieprodukcyjny (noindex). ` +
    `Na produkcji ustaw SITE_BRANCH=${PRODUCTION_BRANCH}.`
  );
}

export const INDEXABLE = isIndexable(process.env);

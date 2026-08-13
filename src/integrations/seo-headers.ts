import { appendFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import type { AstroIntegration } from 'astro';
import { detectBranch, INDEXABLE, missingBranchWarning } from '../utils/env';

// Blok reguł w składni `_headers` Cloudflare Pages: nagłówek dla wszystkich ścieżek.
const NOINDEX_RULE = '/*\n  X-Robots-Tag: noindex, nofollow\n';

/**
 * Poza gałęzią produkcyjną dokłada do builda `_headers` z `X-Robots-Tag`.
 * To zabezpieczenie ostatniej szansy: działa nawet wtedy, gdy adres preview
 * trafi do zewnętrznego linku i robot pominie robots.txt.
 */
export function seoHeaders(): AstroIntegration {
  return {
    name: 'seo-headers',
    hooks: {
      'astro:config:setup': ({ logger }) => {
        const warning = missingBranchWarning(process.env);
        if (warning) {
          logger.warn(warning);
          return;
        }
        // Decyzja o indeksowaniu zapada cicho, więc wypisujemy ją do logu builda.
        logger.info(
          `Gałąź: ${detectBranch(process.env)} — ${INDEXABLE ? 'indeksowanie włączone' : 'noindex'}.`,
        );
      },

      'astro:build:done': async ({ dir, logger }) => {
        if (INDEXABLE) return;

        const file = new URL('_headers', dir);

        // `public/_headers` trafia do builda wcześniej — dopisujemy się do niego,
        // zamiast nadpisywać cudze reguły.
        if (existsSync(file)) {
          await appendFile(file, `\n${NOINDEX_RULE}`, 'utf8');
        } else {
          await writeFile(file, NOINDEX_RULE, 'utf8');
        }

        logger.info('Build nieprodukcyjny — dopisano X-Robots-Tag: noindex do _headers.');
      },
    },
  };
}

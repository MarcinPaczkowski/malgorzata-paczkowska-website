// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { seoHeaders } from './src/integrations/seo-headers.ts';

const BLOG_DIR = new URL('./src/content/blog/', import.meta.url);

/**
 * Data ostatniej modyfikacji wpisu (updatedDate, a w razie braku pubDate),
 * odczytana wprost z frontmattera — pliki konfiguracyjne nie mają dostępu
 * do `astro:content`.
 * @returns {Map<string, string>} slug -> ISO date
 */
function readPostDates() {
  const dates = new Map();
  for (const file of readdirSync(BLOG_DIR)) {
    if (!/\.mdx?$/.test(file)) continue;
    const raw = readFileSync(new URL(file, BLOG_DIR), 'utf8');
    const frontmatter = raw.split(/^---\s*$/m)[1] ?? '';
    const pubDate = frontmatter.match(/^pubDate:\s*'?"?([\d-]+)/m)?.[1];
    const updatedDate = frontmatter.match(/^updatedDate:\s*'?"?([\d-]+)/m)?.[1];
    const date = updatedDate ?? pubDate;
    if (date) dates.set(file.replace(/\.mdx?$/, ''), new Date(date).toISOString());
  }
  return dates;
}

const postDates = readPostDates();

// TODO(content): zastąp prawdziwą domeną przed deployem
export default defineConfig({
  site: 'https://www.malgorzatapaczkowska.pl',
  integrations: [
    mdx(),
    seoHeaders(),
    sitemap({
      // 404 jest pomijane automatycznie; tu odsiewamy zasoby niebędące stronami.
      filter: (page) => !page.includes('/rss.xml'),
      serialize(item) {
        const path = new URL(item.url).pathname;

        if (path === '/') {
          return { ...item, changefreq: 'monthly', priority: 1.0 };
        }

        const postSlug = path.match(/^\/blog\/(.+)\/$/)?.[1];
        if (postSlug) {
          return {
            ...item,
            changefreq: 'yearly',
            priority: 0.6,
            lastmod: postDates.get(postSlug),
          };
        }

        if (path === '/blog/') {
          return { ...item, changefreq: 'weekly', priority: 0.7 };
        }

        return { ...item, changefreq: 'monthly', priority: 0.8 };
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

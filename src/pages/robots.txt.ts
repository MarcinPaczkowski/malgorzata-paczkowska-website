import type { APIContext } from 'astro';
import { INDEXABLE } from '../utils/env';

// robots.txt generowany z `site` w astro.config.mjs — jedno źródło prawdy dla
// domeny, wspólne z canonicalami, RSS-em i sitemapą.
export function GET(context: APIContext) {
  if (!INDEXABLE) {
    return textResponse('User-agent: *\nDisallow: /\n');
  }

  const sitemapUrl = new URL('sitemap-index.xml', context.site);

  return textResponse(`User-agent: *
Allow: /

Sitemap: ${sitemapUrl.href}
`);
}

function textResponse(body: string) {
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

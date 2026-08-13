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

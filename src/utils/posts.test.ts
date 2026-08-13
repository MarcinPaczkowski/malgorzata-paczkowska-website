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

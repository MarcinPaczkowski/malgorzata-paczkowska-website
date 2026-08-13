import { describe, expect, it } from 'vitest';
import { detectBranch, isIndexable, missingBranchWarning, PRODUCTION_BRANCH } from './env';

describe('detectBranch', () => {
  it('zwraca undefined, gdy żadna zmienna nie jest ustawiona', () => {
    expect(detectBranch({})).toBeUndefined();
  });

  it('pomija puste wartości', () => {
    expect(detectBranch({ BRANCH: '  ', VERCEL_GIT_COMMIT_REF: 'develop' })).toBe('develop');
  });

  it('daje pierwszeństwo ręcznemu nadpisaniu', () => {
    expect(detectBranch({ SITE_BRANCH: 'main', BRANCH: 'develop' })).toBe('main');
  });
});

describe('isIndexable', () => {
  it('indeksuje wyłącznie gałąź produkcyjną', () => {
    expect(isIndexable({ BRANCH: PRODUCTION_BRANCH })).toBe(true);
  });

  it('blokuje gałęzie nieprodukcyjne', () => {
    expect(isIndexable({ BRANCH: 'develop' })).toBe(false);
    expect(isIndexable({ BRANCH: 'feat/nowa-oferta' })).toBe(false);
  });

  it('blokuje build bez rozpoznanego środowiska', () => {
    expect(isIndexable({})).toBe(false);
  });
});

describe('missingBranchWarning', () => {
  it('milczy, gdy gałąź jest znana', () => {
    expect(missingBranchWarning({ CF_PAGES_BRANCH: 'develop' })).toBeUndefined();
  });

  it('ostrzega, gdy środowiska nie da się rozpoznać', () => {
    expect(missingBranchWarning({})).toContain('SITE_BRANCH');
  });
});

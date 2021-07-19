import { FrontMatter } from './post-data-service';

export function initFrontMatter(): FrontMatter {
  return {
    title: '',
    description: '',
    thumbnail: '',
    publishedOn: '',
    isPublished: false,
    layout: '',
  };
}

export function assertFrontMatter(data: any): asserts data is FrontMatter {
  if (!isFrontMatter(data)) throw new Error('Invalid FrontMatter');
}

export function isFrontMatter(data: any): data is FrontMatter {
  if (typeof data !== 'object') return false;
  if (!data) return false;

  const frontMatter = initFrontMatter();
  for (const [key, value] of Object.entries(frontMatter)) {
    if (typeof data[key] !== typeof value) return false;
  }

  return true;
}

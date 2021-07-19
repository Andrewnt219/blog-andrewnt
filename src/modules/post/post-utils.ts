import { isNullOrUndefined } from '@utils/validate-js-utils';

// #region validations
const frontMatterKeys = [
  'title',
  'description',
  'thumbnail',
  'publishedOn',
  'layout',
  'isPublished',
] as const;
type FrontMatterKeys = typeof frontMatterKeys[number];
export type FrontMatter = Record<
  Exclude<FrontMatterKeys, 'isPublished'>,
  string
> & { isPublished: boolean };
export function assertFrontMatter(data: any): asserts data is FrontMatter {
  if (!data) throw new Error('data is empty');
  if (typeof data !== 'object') throw new Error('data is not FrontMatter');

  const hasNullOrUndefinedValue = frontMatterKeys.some(isNullOrUndefined);

  if (hasNullOrUndefinedValue) throw new Error('data is not FrontMatter');
}
// #endregion

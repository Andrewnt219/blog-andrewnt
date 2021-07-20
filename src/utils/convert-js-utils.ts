import { JustFields } from '$common';

/* -------------------------------------------------------------------------- */
/*                                    PARSE                                   */
/* -------------------------------------------------------------------------- */
export function tryParseNumber(num: unknown): number | null {
  if (typeof num === 'number' && !isNaN(num)) return num;
  if (typeof num === 'string' && !isNaN(+num)) return +num;

  return null;
}
/* -------------------------------------------------------------------------- */
/*                                    MISC                                    */
/* -------------------------------------------------------------------------- */
export function removeMethodsFromInstance<T>(instance: T) {
  const object = Object.assign({}, instance);

  for (const key in object) {
    if (typeof object[key] === 'function') delete object[key];
  }

  return object as JustFields<T>;
}

export function slugify(str: string, separator = ' ') {
  return str.toLowerCase().split(separator).join('-');
}

/* -------------------------------------------------------------------------- */
/*                                 PAGINATION                                 */
/* -------------------------------------------------------------------------- */
export type PaginateResult<T> = {
  items: T[];
  next_page: number | null;
  prev_page: number | null;
  total: number;
  next_page_total: number;
  current_page: number;
};
export function getPaginateResult<T>(
  items: T[],
  _perPage: number | string | undefined,
  _page: number | string | undefined
): PaginateResult<T> {
  const perPage = tryParseNumber(_perPage) ?? Number.MAX_SAFE_INTEGER;
  const page = tryParseNumber(_page) ?? 1;

  const total = items.length;
  const paginatedItems = paginate(items, perPage, page);

  const itemsLeft = total - page * perPage;
  const next_page_total = itemsLeft < 0 ? 0 : Math.min(itemsLeft, perPage);

  return {
    items: paginatedItems,
    total,
    current_page: page,
    next_page_total,
    next_page: next_page_total > 0 ? page + 1 : null,
    prev_page: page > 1 ? page - 1 : null,
  };
}
export function paginate<T>(items: T[], perPage: number, page: number): T[] {
  if (page < 0 || perPage < 0) return [];

  const start = (page - 1) * perPage;
  const end = start + perPage;

  return items.slice(start, end);
}

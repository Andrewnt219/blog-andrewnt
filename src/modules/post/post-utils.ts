import { Order } from '$common';
import { getPaginationResult } from '@utils/convert-js-utils';
import { sortByDateString } from '@utils/sort-js-utils';
import dayjs from 'dayjs';
import { FrontMatter, PostData, PostMatter } from './post-data-service';

export function initFrontMatter(): FrontMatter {
  return {
    title: '',
    description: '',
    thumbnail: {
      height: -1,
      width: -1,
      url: '',
    },
    publishedOn: '',
    isArchived: false,
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

export function getLinkToPost(postSlug: string) {
  return `/post/${postSlug}`;
}

export function filterPostNotArchived(postMatter: PostMatter) {
  return !postMatter.isArchived;
}

export function filterPostPublishOn(fromDate: Date, toDate: Date) {
  return function (postMatter: PostMatter) {
    const publishDate = dayjs(postMatter.publishedOn);
    return publishDate.isAfter(fromDate) && publishDate.isBefore(toDate);
  };
}

/**
 * @description this method MUTATE the array
 */
export function sortPostByPublishedOn(posts: PostMatter[]) {
  return posts.sort((a, b) => sortByDateString(a.publishedOn, b.publishedOn));
}

/**
 * @description this method MUTATE the array
 */
export function sortPostByViewCount(posts: PostData[]) {
  return posts.sort((a, b) => a.view_count - b.view_count);
}

/**
 * @description this method MUTATE the array
 */
export function sortPostByLikeCount(posts: PostData[]) {
  return posts.sort((a, b) => a.like_count - b.like_count);
}

export type PostFilterOptions = {
  mode?: 'latest' | 'popular';
  order?: Order;
  page?: string | number;
  perPage?: string | number;
};

/**
 * @description this method MUTATE the array
 */
export function filterPostData(
  postData: PostData[],
  options: PostFilterOptions = {}
) {
  if (options.mode === 'latest') sortPostByPublishedOn(postData);
  if (options.mode === 'popular') sortPostByViewCount(postData);

  if (options.order === 'desc') postData.reverse();

  return getPaginationResult(postData, options.perPage, options.page);
}

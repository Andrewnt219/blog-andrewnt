import { QueryPostsIndex_Get } from '@api/posts';
import { PostData } from '@modules/post/post-data-service';
import { queryAllPostData } from '@modules/post/post-query-client';
import { PaginateResult } from '@utils/convert-js-utils';
import { useQuery } from 'react-query';

export const popularPostsQuery: QueryPostsIndex_Get = {
  mode: 'popular',
  order: 'desc',
  page: 1,
  perPage: 3,
};

export const useQueryPopularPosts = (
  placeholderData?: PaginateResult<PostData>
) => {
  return useQuery(
    'query-popular-posts',
    () => queryAllPostData(popularPostsQuery),
    {
      placeholderData,
      staleTime: 30 * 1000,
    }
  );
};

import { QueryPostsIndex_Get } from '@api/posts';
import { QueryPostsPinned_Get } from '@api/posts/pinned';
import { PostData } from '@modules/post/post-data-service';
import { queryPinnedPosts } from '@modules/post/post-query-client';
import { PaginateResult } from '@utils/convert-js-utils';
import { useQuery } from 'react-query';

export const pinnedPostsQuery: QueryPostsPinned_Get = {
  mode: 'latest',
  order: 'desc',
  page: 1,
  perPage: 3,
};

export const useQueryPinnedPosts = (
  placeholderData?: PaginateResult<PostData>
) => {
  return useQuery(
    'query-pinned-posts',
    () => queryPinnedPosts(pinnedPostsQuery),
    {
      placeholderData,
      staleTime: 30 * 1000,
    }
  );
};

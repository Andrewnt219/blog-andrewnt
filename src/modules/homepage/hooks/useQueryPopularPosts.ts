import { QueryPostsIndex_Get } from '@api/posts';
import { useQueryAllPostData } from '@modules/post/hooks/useQueryAllPostData';
import { PostData } from '@modules/post/post-data-service';
import { PaginateResult } from '@utils/convert-js-utils';

export const popularPostsQuery: QueryPostsIndex_Get = {
  mode: 'popular',
  order: 'desc',
  page: 1,
  perPage: 3,
};

export const useQueryPopularPosts = (
  placeholderData?: PaginateResult<PostData>
) => {
  return useQueryAllPostData(
    {
      placeholderData,
      keepPreviousData: true,
    },
    {
      perPage: popularPostsQuery.perPage,
      mode: popularPostsQuery.mode,
      order: popularPostsQuery.order,
    }
  );
};

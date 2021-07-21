import { QueryPostsIndex_Get } from '@api/posts';
import { useQueryAllPostData } from '@modules/post/hooks/useQueryAllPostData';
import { PostData } from '@modules/post/post-data-service';
import { PaginateResult } from '@utils/convert-js-utils';

export const latestPostsQuery: QueryPostsIndex_Get = {
  mode: 'latest',
  order: 'desc',
  page: 1,
  perPage: 10,
};
export const useQueryLatestPosts = (
  page: number,
  placeholderData?: PaginateResult<PostData>
) => {
  return useQueryAllPostData(
    {
      placeholderData,
      keepPreviousData: true,
    },
    {
      page,
      perPage: latestPostsQuery.perPage,
      mode: latestPostsQuery.mode,
      order: latestPostsQuery.order,
    }
  );
};

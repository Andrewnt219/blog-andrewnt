import { QueryPostsIndex_Get } from '@api/posts';
import { PostData } from '@modules/post/post-data-service';
import { queryAllPostData } from '@modules/post/post-query-client';
import { PaginateResult } from '@utils/convert-js-utils';
import { useQuery } from 'react-query';

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
  const query = { ...latestPostsQuery, page };
  return useQuery(['query-latest-posts', page], () => queryAllPostData(query), {
    placeholderData,
    keepPreviousData: true,
  });
};

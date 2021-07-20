import { QueryPostsIndex_Get, ResultPostsIndex_Get } from '@api/posts';
import { useQuery, UseQueryOptions } from 'react-query';
import { queryAllPostData } from '../post-query-client';

type Data = ResultPostsIndex_Get['data'];
export const useQueryAllPostData = (
  options: UseQueryOptions<Data>,
  query?: QueryPostsIndex_Get
) => {
  return useQuery(
    ['query-all-posts', query?.page],
    () => queryAllPostData(query),
    options
  );
};

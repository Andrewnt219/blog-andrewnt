import { ResultPostsIndex_Get } from '@api/posts';
import { useQuery, UseQueryOptions } from 'react-query';
import { queryAllPostData } from '../post-query-client';

type Data = ResultPostsIndex_Get['data'];
export const useQueryAllPostData = (options: UseQueryOptions<Data>) => {
  return useQuery('query-all-posts', queryAllPostData, options);
};

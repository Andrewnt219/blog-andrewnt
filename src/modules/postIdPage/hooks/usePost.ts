import { PostData } from '@modules/post/post-data-service';
import { queryPostData } from '@modules/post/post-query-client';
import { isNullOrUndefined } from '@utils/validate-js-utils';
import { useQuery } from 'react-query';

export const usePost = (placeholderData: PostData | null) => {
  const postSlug = placeholderData?.slug;

  return useQuery({
    queryKey: ['post', postSlug],
    //NOTE postSlug should always be defined because of options.enabled
    queryFn: ({ queryKey }) => queryPostData(queryKey[1]!),
    placeholderData,
    enabled: !isNullOrUndefined(postSlug),
    staleTime: process.env.NODE_ENV === 'production' ? 30 * 1000 : 0,
  });
};

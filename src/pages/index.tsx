import { Result } from '$common';
import { WithDefaultLayout } from '@layouts/DefaultLayout/DefaultLayout';
import WithDataFetching from '@layouts/WithDataFetching/WithDataFetching';
import {
  createStaticProps,
  getFirstErrorMessage,
  handleStaticPropsError,
} from '@modules/api/api-utils';
import PostPreviewCard from '@modules/homepage/components/PostPreviewCard/PostPreviewCard';
import {
  latestPostsQuery,
  useQueryLatestPosts,
} from '@modules/homepage/hooks/useQueryLatestPosts';
import {
  popularPostsQuery,
  useQueryPopularPosts,
} from '@modules/homepage/hooks/useQueryPopularPosts';
import {
  getAllPublishedPostData,
  PostData,
} from '@modules/post/post-data-service';
import { filterPostData } from '@modules/post/post-utils';
import { PaginateResult } from '@utils/convert-js-utils';
import cloneDeep from 'lodash/cloneDeep';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useState } from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;
export default function Home({ data: initialData, error: serverError }: Props) {
  const [page, setPage] = useState<number>(1);

  const latestPostsQuery = useQueryLatestPosts(
    page,
    initialData?.latestPostsResult
  );
  const popularPostsQuery = useQueryPopularPosts(
    initialData?.popularPostsResult
  );

  return (
    <>
      <WithDataFetching
        error={getFirstErrorMessage([serverError, popularPostsQuery.error])}
        data={popularPostsQuery.data}
      >
        {(data) => (
          <>
            <h1 tw="font-black text-hero">Latest</h1>
            <ul tw="divide-y-2 divide-bordercolor">
              {data.items.map((post) => (
                <li key={post.post_id}>
                  <PostPreviewCard tw="py-xl md:py-3xl" post={post} />
                </li>
              ))}
            </ul>
          </>
        )}
      </WithDataFetching>

      <WithDataFetching
        error={getFirstErrorMessage([serverError, latestPostsQuery.error])}
        data={latestPostsQuery.data}
      >
        {(data) => (
          <>
            <h1 tw="font-black text-hero">Latest</h1>
            <ul tw="divide-y-2 divide-bordercolor">
              {data.items.map((post) => (
                <li key={post.post_id}>
                  <PostPreviewCard tw="py-xl md:py-3xl" post={post} />
                </li>
              ))}
            </ul>
            {latestPostsQuery.isFetching && <h1 tw="text-lg">Fetching...</h1>}

            <button
              tw="disabled:text-textmuted"
              disabled={data.next_page === null}
              onClick={() => setPage((prev) => ++prev)}
            >
              Next
            </button>
            <button
              tw="ml-md disabled:text-textmuted"
              disabled={data.prev_page === null}
              onClick={() => setPage((prev) => --prev)}
            >
              Previous
            </button>
          </>
        )}
      </WithDataFetching>
    </>
  );
}

type StaticProps = Result<{
  latestPostsResult: PaginateResult<PostData>;
  popularPostsResult: PaginateResult<PostData>;
}>;

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  try {
    const allPostData = await getAllPublishedPostData();

    const latestPostsResult = filterPostData(
      cloneDeep(allPostData),
      latestPostsQuery
    );
    const popularPostsResult = filterPostData(
      cloneDeep(allPostData),
      popularPostsQuery
    );

    return createStaticProps({
      latestPostsResult,
      popularPostsResult,
    });
  } catch (error) {
    return handleStaticPropsError(error);
  }
};

Home.WithLayout = WithDefaultLayout;

import { Result } from '$common';
import { WithDefaultLayout } from '@layouts/DefaultLayout/DefaultLayout';
import WithDataFetching from '@layouts/WithDataFetching/WithDataFetching';
import {
  createStaticProps,
  getFirstErrorMessage,
  handleStaticPropsError,
} from '@modules/api/api-utils';
import PostPreviewCardList from '@modules/homepage/components/PostPreviewCardList/PostPreviewCardList';
import SectionHeader from '@modules/homepage/components/SectionHeader/SectionHeader';
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
import generateRss from '@modules/rss/generate-rss';
import LoadingIndicator from '@ui/LoadingIndicator/LoadingIndicator';
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
          <section aria-label="Popular posts">
            <SectionHeader title="Popular" subTitle="Trending articles" />

            <PostPreviewCardList posts={data.items} />
          </section>
        )}
      </WithDataFetching>

      <WithDataFetching
        error={getFirstErrorMessage([serverError, latestPostsQuery.error])}
        data={latestPostsQuery.data}
      >
        {(data) => (
          <section aria-label="latest posts">
            <SectionHeader
              title="Latest"
              subTitle="All the web articles I have written"
            />

            <PostPreviewCardList posts={data.items} />

            <LoadingIndicator isLoading={latestPostsQuery.isFetching} />
            {/* <LoadingIndicator /> */}

            <button
              tw="disabled:text-textmuted mt-md"
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
          </section>
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
  } finally {
    process.env.NODE_ENV === 'production' && generateRss();
  }
};

Home.WithLayout = WithDefaultLayout;

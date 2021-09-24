import { Result } from '$common';
import DefaultLayout from '@layouts/DefaultLayout/DefaultLayout';
import HeaderMeta from '@layouts/Meta/HeaderMeta';
import WithDataFetching from '@layouts/WithDataFetching/WithDataFetching';
import {
  createResultSuccess,
  getFirstErrorMessage,
  handleStaticPropsError,
} from '@modules/api/api-utils';
import PostPreviewCardList from '@modules/homepage/components/PostPreviewCardList/PostPreviewCardList';
import SectionHeader from '@modules/homepage/components/SectionHeader/SectionHeader';
import {
  latestPostsQuery,
  useQueryLatestPosts,
} from '@modules/homepage/hooks/useQueryLatestPosts';
import { popularPostsQuery } from '@modules/homepage/hooks/useQueryPopularPosts';
import {
  getAllPublishedPostData,
  PostData,
} from '@modules/post/post-data-service';
import { filterPostData } from '@modules/post/post-utils';
import generateRss from '@modules/rss/generate-rss';
import LoadingIndicator from '@ui/LoadingIndicator/LoadingIndicator';
import Pagination from '@ui/Pagination/Pagination';
import { PaginateResult } from '@utils/convert-js-utils';
import cloneDeep from 'lodash/cloneDeep';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/dist/client/router';
import { ReactNode, useState } from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;
export default function Home({ data: initialData, error: serverError }: Props) {
  console.log(initialData);

  const [page, setPage] = useState<number>(1);
  const router = useRouter();

  const latestPostsQuery = useQueryLatestPosts(
    page,
    initialData?.latestPostsResult
  );
  // const popularPostsQuery = useQueryPopularPosts(
  //   initialData?.popularPostsResult
  // );

  function onPageChange(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    currentPage: number
  ) {
    setPage(currentPage);
    router.push({
      hash: 'latest-articles',
    });
  }

  return (
    <>
      {/* <WithDataFetching
        error={getFirstErrorMessage([serverError, popularPostsQuery.error])}
        data={popularPostsQuery.data}
      >
        {(data) => (
          <section aria-label="Popular posts">
            <SectionHeader title="Popular" subTitle="Trending articles" />

            <PostPreviewCardList posts={data.items} />
          </section>
        )}
      </WithDataFetching> */}

      <WithDataFetching
        error={getFirstErrorMessage([serverError, latestPostsQuery.error])}
        data={latestPostsQuery.data}
      >
        {(data) => (
          <section aria-label="latest posts" tw="mt-2xl">
            <SectionHeader
              id="latest-articles"
              title="Latest"
              subTitle={
                <span tw="inline-flex gap-sm">
                  All the web articles I have written
                  <LoadingIndicator isLoading={latestPostsQuery.isFetching} />
                </span>
              }
            />

            <PostPreviewCardList posts={data.items} />

            <footer tw="ml-auto flex gap-sm justify-end">
              Go to page:
              <Pagination
                onItemClicked={onPageChange}
                total={data.total}
                perPage={data.perPage}
              />
            </footer>
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

    return {
      revalidate: 60,
      props: createResultSuccess({
        latestPostsResult,
        popularPostsResult,
      }),
    };
  } catch (error) {
    return handleStaticPropsError(error);
  } finally {
    process.env.NODE_ENV === 'production' && generateRss();
  }
};

Home.getLayout = (page: ReactNode) => (
  <DefaultLayout>
    <HeaderMeta />

    {page}
  </DefaultLayout>
);

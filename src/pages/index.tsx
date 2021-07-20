import { Result } from '$common';
import { QueryPostsIndex_Get } from '@api/posts';
import { WithDefaultLayout } from '@layouts/DefaultLayout/DefaultLayout';
import WithDataFetching from '@layouts/WithDataFetching/WithDataFetching';
import {
  createStaticProps,
  handleStaticPropsError,
} from '@modules/api/api-utils';
import PostPreviewCard from '@modules/homepage/components/PostPreviewCard/PostPreviewCard';
import { useQueryAllPostData } from '@modules/post/hooks/useQueryAllPostData';
import { getAllPostData, PostData } from '@modules/post/post-data-service';
import { filterPostData } from '@modules/post/post-utils';
import { getPaginateResult, PaginateResult } from '@utils/convert-js-utils';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useState } from 'react';

const queryOptions: QueryPostsIndex_Get = {
  mode: 'popular',
  order: 'desc',
  page: 1,
  perPage: 10,
};
type Props = InferGetStaticPropsType<typeof getStaticProps>;
export default function Home({ data: initialData, error: serverError }: Props) {
  const [page, setPage] = useState<number>(1);

  const { isFetching, data, error } = useQueryAllPostData(
    {
      placeholderData: initialData ?? undefined,
      keepPreviousData: true,
    },
    {
      page,
      perPage: queryOptions.perPage,
      mode: queryOptions.mode,
      order: queryOptions.order,
    }
  );

  return (
    <WithDataFetching error={serverError ?? error} data={data}>
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
          {isFetching && <h1 tw="text-lg">Fetching...</h1>}

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
  );
}

type StaticProps = Result<PaginateResult<PostData>>;

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  try {
    const allPostData = await getAllPostData();

    filterPostData(allPostData, queryOptions);

    const paginateResult = getPaginateResult(
      allPostData,
      queryOptions.perPage,
      queryOptions.page
    );

    return createStaticProps(paginateResult);
  } catch (error) {
    return handleStaticPropsError(error);
  }
};

Home.WithLayout = WithDefaultLayout;

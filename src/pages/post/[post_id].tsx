import { Result } from '$common';
import DefaultLayout from '@layouts/DefaultLayout/DefaultLayout';
import WithDataFetching from '@layouts/WithDataFetching/WithDataFetching';
import {
  createStaticProps,
  createStaticPropsError,
} from '@modules/api/api-utils';
import {
  getAllPublishedPostMatter,
  getPostDataFromSlug,
  PostData,
} from '@modules/post/post-data-service';
import Post from '@modules/postIdPage/components/Post/Post';
import { usePost } from '@modules/postIdPage/hooks/usePost';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ReactNode } from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function PostIdPage({
  data: placeholderData,
  error: serverError,
}: Props) {
  const { data, error } = usePost(placeholderData);

  return (
    <WithDataFetching error={serverError ?? error} data={data}>
      {(data) => <Post post={data} />}
    </WithDataFetching>
  );
}
/* -------------------------------------------------------------------------- */
type StaticProps = Result<PostData>;

type Params = {
  post_id: string;
};

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
  params,
}) => {
  if (!params) return createStaticPropsError('Invalid params');

  const postData = await getPostDataFromSlug(params.post_id);

  return createStaticProps({ ...postData });
};

/* -------------------------------------------------------------------------- */
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const postMatters = await getAllPublishedPostMatter();
  const paths = postMatters.map((matter) => ({
    params: { post_id: matter.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

PostIdPage.getLayout = (page: ReactNode) => (
  <DefaultLayout>{page}</DefaultLayout>
);

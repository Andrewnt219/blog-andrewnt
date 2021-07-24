import { Result } from '$common';
import { WithDefaultLayout } from '@layouts/DefaultLayout/DefaultLayout';
import WithDataFetching from '@layouts/WithDataFetching/WithDataFetching';
import {
  createStaticProps,
  createStaticPropsError,
} from '@modules/api/api-utils';
import Post from '@modules/post/components/Post/Post';
import {
  getAllPostSlugs,
  getPostDataFromSlug,
  PostData,
} from '@modules/post/post-data-service';
import { usePost } from '@modules/postIdPage/hooks/usePost';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

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
  const postNames = getAllPostSlugs();
  const paths = postNames.map((name) => ({
    params: { post_id: name.replace('.mdx', '') },
  }));
  return {
    paths,
    fallback: false,
  };
};
PostIdPage.WithLayout = WithDefaultLayout;

import { Result } from '$common';
import { WithDefaultLayout } from '@layouts/DefaultLayout/DefaultLayout';
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
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

type Props = InferGetStaticPropsType<typeof getStaticProps> & {
  className?: string;
};
export default function PostIdPage({ className, data, error }: Props) {
  if (error) return <h1>Fail to load post</h1>;
  if (!data) return <h1>Loading</h1>;

  return (
    <div className={className} tw="">
      <Post post={data} />
    </div>
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

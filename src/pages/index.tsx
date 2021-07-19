import { Result } from '$common';
import { WithDefaultLayout } from '@layouts/DefaultLayout/DefaultLayout';
import {
  createStaticProps,
  handleStaticPropsError,
} from '@modules/api/api-utils';
import { getAllPostMatter, PostMatter } from '@modules/post/post-data-service';
import { getLinkToPost } from '@modules/post/post-utils';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import NextLink from 'next/link';
type Props = InferGetStaticPropsType<typeof getStaticProps>;
export default function Home({ data, error }: Props) {
  if (error) return <h1>{error.message}</h1>;
  if (!data) return <h1>Loading</h1>;

  return (
    <>
      <h1 tw="font-black text-hero">Latest</h1>
      {data.postMatters.map((post) => (
        <h2 key={post.title}>
          <NextLink href={getLinkToPost(post.slug)}>
            <a>{post.title}</a>
          </NextLink>
        </h2>
      ))}
    </>
  );
}

type StaticProps = Result<{ postMatters: PostMatter[] }>;

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  try {
    const postMatters = await getAllPostMatter();

    return createStaticProps({ postMatters });
  } catch (error) {
    return handleStaticPropsError(error);
  }
};

Home.WithLayout = WithDefaultLayout;

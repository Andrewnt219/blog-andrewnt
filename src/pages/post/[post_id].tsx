import { FrontMatter, MdxSource } from '$common';
import { getAllPosts, getPostbySlug } from '@modules/mdx/mdx-utils';
import Post from '@modules/post/Post/Post';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { VFC } from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps> & {
  className?: string;
};
const PostIdPage: VFC<Props> = ({ className, mdxSource, frontMatter }) => {
  if (!mdxSource) return <h1>Loading</h1>;

  return (
    <div className={className} tw="">
      <Post mdxSource={mdxSource} />
    </div>
  );
};
/* -------------------------------------------------------------------------- */
type StaticProps = {
  mdxSource: MdxSource;
  frontMatter: FrontMatter;
};

type Params = {
  post_id: string;
};

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
  params,
}) => {
  const { mdxSource, frontMatter } = await getPostbySlug(params!.post_id);

  return {
    props: {
      mdxSource,
      frontMatter,
    },
  };
};

/* -------------------------------------------------------------------------- */
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({
    params: { post_id: post.replace('.mdx', '') },
  }));
  return {
    paths,
    fallback: false,
  };
};

export default PostIdPage;

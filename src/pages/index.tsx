import { Result } from '$common';
import { WithDefaultLayout } from '@layouts/DefaultLayout/DefaultLayout';
import {
  createStaticProps,
  getErrorMessage,
  handleStaticPropsError,
} from '@modules/api/api-utils';
import { useQueryAllPostData } from '@modules/post/hooks/useQueryAllPostData';
import { getAllPostData, PostData } from '@modules/post/post-data-service';
import { getLinkToPost } from '@modules/post/post-utils';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import NextLink from 'next/link';

type Props = InferGetStaticPropsType<typeof getStaticProps>;
export default function Home({ data: initialData, error: serverError }: Props) {
  const { data, error } = useQueryAllPostData({
    placeholderData: initialData?.postData,
  });

  if (serverError) return <h1>{serverError.message}</h1>;
  if (error) return <h1>{getErrorMessage(error)}</h1>;
  if (!data) return <h1>Loading</h1>;

  return (
    <>
      <h1 tw="font-black text-hero">Latest</h1>
      {data.map((post) => (
        <h2 key={post.title}>
          <NextLink href={getLinkToPost(post.slug)}>
            <a>{post.title}</a>
          </NextLink>
          <p>{post.view_count}</p>
        </h2>
      ))}
    </>
  );
}

type StaticProps = Result<{ postData: PostData[] }>;

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  try {
    const postData = await getAllPostData();

    return createStaticProps({ postData });
  } catch (error) {
    return handleStaticPropsError(error);
  }
};

Home.WithLayout = WithDefaultLayout;

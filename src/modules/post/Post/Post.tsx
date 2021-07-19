import { getErrorMessage } from '@modules/api/api-utils';
import MdxComponents from '@modules/mdx/MdxComponents/MdxComponents';
import { ApiPostIncreaseViewCountResult } from '@pages/api/post/increaseViewCount';
import axios from 'axios';
import { MDXRemote } from 'next-mdx-remote';
import * as React from 'react';
import { useEffect } from 'react';
import { PostData } from '../post-data-service';

type Props = {
  post: PostData;
};
const Post: React.VFC<Props> = ({ post }) => {
  const { post_id } = post;

  useEffect(() => {
    // TODO #2 add error modal and loading state
    axios
      .patch<ApiPostIncreaseViewCountResult>('/api/post/increaseViewCount', {
        post_id,
      })
      .then((res) => console.log(res.data.data.view_count))
      .catch((err) => console.error(getErrorMessage(err)));
  }, [post_id]);

  return (
    <>
      <header>{post.view_count}</header>
      <main>
        <MDXRemote {...post.content} components={MdxComponents} />
      </main>
    </>
  );
};

export default Post;

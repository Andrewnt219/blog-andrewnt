import { MdxSource } from '$common';
import { getErrorMessage } from '@modules/api/api-utils';
import MdxComponents from '@modules/mdx/MdxComponents/MdxComponents';
import { MDXRemote } from 'next-mdx-remote';
import * as React from 'react';
import { useEffect } from 'react';
import { PostService } from '../PostService';

type Props = {
  mdxSource: MdxSource;
};
const Post: React.VFC<Props> = ({ mdxSource }) => {
  useEffect(() => {
    // TODO #2 add error modal and loading state
    PostService.increaseViewCount('hello-world')
      .then((data) => console.log(data.data))
      .catch((err) => console.error(getErrorMessage(err)));
  }, []);

  return (
    <>
      <header></header>
      <main>
        <MDXRemote {...mdxSource} components={MdxComponents} />
      </main>
    </>
  );
};

export default Post;

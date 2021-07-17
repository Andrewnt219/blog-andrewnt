import { MdxSource } from '$common';
import MdxComponents from '@modules/mdx/MdxComponents/MdxComponents';
import { MDXRemote } from 'next-mdx-remote';
import * as React from 'react';

type Props = {
  mdxSource: MdxSource;
};
const Post: React.VFC<Props> = ({ mdxSource }) => {
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

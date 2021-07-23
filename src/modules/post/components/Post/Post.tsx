import { getErrorMessage } from '@modules/api/api-utils';
import MdxComponents from '@modules/mdx/components/MdxComponents/MdxComponents';
import MdxImage from '@modules/mdx/components/MdxImage/MdxImage';
import { ApiPostIncreaseViewCountResult } from '@pages/api/post/increaseViewCount';
import axios from 'axios';
import { MDXRemote } from 'next-mdx-remote';
import * as React from 'react';
import { useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { PostData } from '../../post-data-service';

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
    <section tw="">
      <header>
        <h1 tw="text-h1 text-center font-bold">{post.title}</h1>
        <div tw="w-full mt-xl">
          <MdxImage
            src={post.thumbnail.url}
            alt="lorem ipsum demat"
            layout="responsive"
            width={post.thumbnail.width}
            height={post.thumbnail.height}
            priority
          />
        </div>
      </header>

      {/* TODO (or not) width: min(350px, 100%), max-width page 70rem */}
      <StyledWrapper>
        <MDXRemote {...post.content} components={MdxComponents} />
      </StyledWrapper>
    </section>
  );
};

const StyledWrapper = styled.div`
  ${tw`mt-2xl grid grid-cols-[1fr min(100%, 65ch) 1fr]`}

  & > * {
    grid-column: 2/3;
  }
`;
{
  /* <div tw="mt-2xl flex gap-3xl flex-row-reverse items-start"></div> */
}
//  <aside tw="sticky mt-4xl top-[10rem] space-y-2xl border shadow-sm p-xl pb-2xl">
//    <header>
//      <h3 tw="font-bold">Published on</h3>
//      <time tw="text-textmuted" dateTime={post.publishedOn}>
//        {dayjs(post.publishedOn).format('MMMM DD, YYYY')}
//      </time>
//    </header>

//    <div>
//      <h3 tw="font-bold">Reading time</h3>
//      <p tw="text-textmuted">3 minutes</p>
//    </div>

//    <div>
//      <h3 tw="font-bold">Tags</h3>
//      <ul tw="text-textmuted flex gap-sm flex-wrap">
//        <li>#react-js</li>
//        <li>#next-js</li>
//        <li>#javascript</li>
//      </ul>
//    </div>

//    <div tw="flex flex-col gap-sm">
//      <Button variant="contained" size="md">
//        Share on Facebook
//      </Button>
//      <Button variant="contained" size="md">
//        Share on Twitter
//      </Button>
//      <Button variant="contained" size="md">
//        Share on LinkedIn
//      </Button>

//      <ButtonPrimary
//        tw="text-center"
//        as="a"
//        href="https://www.buymeacoffee.com/andrewnt219"
//        target="_blank"
//        rel="noopener"
//        size="md"
//      >
//        Buy me a coffee
//      </ButtonPrimary>
//    </div>
//  </aside>;

export default Post;

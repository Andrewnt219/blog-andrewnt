import { getErrorMessage } from '@modules/api/api-utils';
import MdxComponents from '@modules/mdx/components/MdxComponents/MdxComponents';
import MdxImage from '@modules/mdx/components/MdxImage/MdxImage';
import { ApiPostIncreaseViewCountResult } from '@pages/api/post/increaseViewCount';
import { Button, ButtonLink } from '@ui/Button/Button';
import Logo from '@ui/Logo/Logo';
import axios from 'axios';
import dayjs from 'dayjs';
import { MDXRemote } from 'next-mdx-remote';
import * as React from 'react';
import { useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
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
      <header tw="text-center">
        <h1 tw="text-h1 font-bold">{post.title}</h1>
        <p tw="text-textmuted">by Andrew N.T.</p>

        <div aria-hidden tw="mt-sm md:mt-2xl pointer-events-none">
          <Logo tw="w-8  animate-pulse md:w-10" />
        </div>

        <div tw="w-full mt-xl md:mt-3xl">
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

      <StyledWrapper>
        <MDXRemote {...post.content} components={MdxComponents} />

        <footer tw="mt-3xl space-y-xl">
          <div tw="">
            <h3 tw="font-bold">Was this article helpful?</h3>

            <ButtonLink as="button" tw="inline-flex gap-sm items-center">
              <FaHeart /> {post.like_count}
            </ButtonLink>
          </div>

          <div>
            <h3 tw="font-bold">Last updated</h3>

            <time tw="text-textmuted" dateTime={post.publishedOn}>
              {dayjs(post.publishedOn).format('MMMM DD, YYYY')}
            </time>
          </div>

          <div>
            <h3 tw="font-bold">Share this article</h3>

            <div tw="mt-sm flex flex-col gap-sm md:flex-row">
              <Button variant="contained" size="sm">
                Facebook
              </Button>
              <Button variant="contained" size="sm">
                Twitter
              </Button>
              <Button variant="contained" size="sm">
                LinkedIn
              </Button>
            </div>
          </div>
        </footer>
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

export default Post;

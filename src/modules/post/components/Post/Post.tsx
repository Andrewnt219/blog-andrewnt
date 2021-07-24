import { getErrorMessage } from '@modules/api/api-utils';
import MdxComponents from '@modules/mdx/components/MdxComponents/MdxComponents';
import MdxImage from '@modules/mdx/components/MdxImage/MdxImage';
import { ApiPatchIncreaseViewCountResult } from '@pages/api/post/increaseViewCount';
import { useCurrentLocation } from '@root/src/hooks/useCurrentLocation';
import { Button } from '@ui/Button/Button';
import Logo from '@ui/Logo/Logo';
import {
  createFaccebookShareLink,
  createLinkedInShareLink,
  createTwitterShareLink,
  ShareLink,
} from '@utils/create-js-utils';
import axios from 'axios';
import dayjs from 'dayjs';
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
  const currentLocation = useCurrentLocation();
  const shareLink: ShareLink = {
    url: currentLocation,
    summary: post.description,
    title: post.title,
  };

  useEffect(() => {
    // TODO #2 add error modal and loading state
    axios
      .patch<ApiPatchIncreaseViewCountResult>('/api/post/increaseViewCount', {
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
          <div>
            <h3 tw="font-bold">Last updated</h3>

            <time tw="text-textmuted" dateTime={post.publishedOn}>
              {dayjs(post.publishedOn).format('MMMM DD, YYYY')}
            </time>
          </div>

          <div>
            <h3 tw="font-bold">Share this article</h3>

            <div tw="mt-sm flex flex-col gap-sm md:flex-row">
              <Button
                as="a"
                href={createFaccebookShareLink(shareLink)}
                target="_blank"
                rel="noopener"
                variant="contained"
                size="sm"
                tw="text-center"
              >
                Facebook
              </Button>
              <Button
                as="a"
                href={createTwitterShareLink(shareLink)}
                target="_blank"
                rel="noopener"
                variant="contained"
                size="sm"
                tw="text-center"
              >
                Twitter
              </Button>
              <Button
                as="a"
                href={createLinkedInShareLink(shareLink)}
                target="_blank"
                rel="noopener"
                variant="contained"
                size="sm"
                tw="text-center"
              >
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

import { PostData } from '@modules/post/post-data-service';
import { getLinkToPost } from '@modules/post/post-utils';
import { ButtonLink } from '@ui/Button/Button';
import dayjs from 'dayjs';
type Props = {
  className?: string;
  post: PostData;
};
function PostPreviewCard({ className, post }: Props) {
  return (
    <article
      className={className}
      tw="grid gap-sm items-baseline md:grid-cols-4 "
    >
      <div tw="flex gap-sm md:(flex-col col-span-1)">
        <time dateTime={dayjs(post.publishedOn).toISOString()}>
          {dayjs(post.publishedOn).format('MMMM DD, YYYY')}
        </time>

        <span tw="text-textmuted">{post.view_count} views</span>
      </div>

      <div tw="md:col-span-3">
        <h3 tw="text-h2 font-bold">{post.title}</h3>
        <p tw="text-textmuted mt-lg">{post.description}</p>

        <ButtonLink href={getLinkToPost(post.post_id)} tw="inline-block mt-xs">
          Read more
        </ButtonLink>
      </div>
    </article>
  );
}

export default PostPreviewCard;

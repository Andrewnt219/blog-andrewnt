import { PostData } from '@modules/post/post-data-service';
import PostPreviewCard from '../PostPreviewCard/PostPreviewCard';

type Props = {
  className?: string;
  posts: PostData[];
};
function PostPreviewCardList({ className, posts }: Props) {
  return (
    <ul className={className} tw="divide-y-2 divide-bordercolor">
      {posts.map((post) => (
        <li key={post.post_id}>
          <PostPreviewCard tw="py-xl md:py-3xl" post={post} />
        </li>
      ))}
    </ul>
  );
}

export default PostPreviewCardList;

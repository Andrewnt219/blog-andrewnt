import { Result, ResultError, ResultSuccess } from '@modules/api/api-results';
import { withHttpMethodHandler } from '@modules/api/api-utils';
import { PostMeta } from '@modules/post/PostMeta';
import { PostService } from '@modules/post/PostService';
import { NextApiHandler } from 'next';

type Data = Pick<PostMeta, 'view_count'>;
export type ApiPostIncreaseViewCountResult = ResultSuccess<Data>;
const patch: NextApiHandler<Result<Data>> = async (req, res) => {
  const { post_id } = req.body;

  if (!post_id || typeof post_id !== 'string')
    return res.status(422).json(new ResultError('Invalid post_id'));

  const postMeta = await PostService.getPostMeta(post_id);

  if (!postMeta) {
    const postMeta = new PostMeta(post_id);
    await PostService.addPostMeta(postMeta);

    return res
      .status(201)
      .json(new ResultSuccess({ view_count: postMeta.view_count }));
  }

  postMeta.increaseViewCount();
  await PostService.updatePostMeta(postMeta);

  return res
    .status(200)
    .json(new ResultSuccess({ view_count: postMeta.view_count }));
};

export default withHttpMethodHandler({ patch });

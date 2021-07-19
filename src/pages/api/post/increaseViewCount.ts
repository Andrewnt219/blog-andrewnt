import { Result, ResultSuccess } from '$common';
import {
  createResultError,
  createResultSuccess,
  withHttpMethodHandler,
} from '@modules/api/api-utils';
import {
  addPostMeta,
  getPostMeta,
  initPostMeta,
  PostMeta,
  updatePostMeta,
} from '@modules/post/post-meta-service';
import { NextApiHandler } from 'next';

type Data = Pick<PostMeta, 'view_count'>;
export type ApiPostIncreaseViewCountResult = ResultSuccess<Data>;
const patch: NextApiHandler<Result<Data>> = async (req, res) => {
  const { post_id } = req.body;

  if (!post_id || typeof post_id !== 'string')
    return res.status(422).json(createResultError('Invalid post_id'));

  const postMeta = await getPostMeta(post_id);

  if (!postMeta) {
    const postMeta = initPostMeta(post_id);
    await addPostMeta(postMeta);

    return res
      .status(201)
      .json(createResultSuccess({ view_count: postMeta.view_count }));
  }

  postMeta.view_count++;
  await updatePostMeta(postMeta);

  return res
    .status(200)
    .json(createResultSuccess({ view_count: postMeta.view_count }));
};

export default withHttpMethodHandler({ patch });

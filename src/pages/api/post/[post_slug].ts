import { Result, ResultSuccess } from '$common';
import {
  createResultError,
  createResultSuccess,
  withHttpMethodHandler,
} from '@modules/api/api-utils';
import { getPostDataFromSlug, PostData } from '@modules/post/post-data-service';
import { NextApiHandler } from 'next';

type Data_Get = PostData;
export type ResultPostIndex_Get = ResultSuccess<Data_Get>;
const get: NextApiHandler<Result<Data_Get>> = async (req, res) => {
  const { post_slug } = req.query;
  if (!post_slug || typeof post_slug !== 'string')
    return res.status(422).json(createResultError('Invalid post slug'));

  const postData = await getPostDataFromSlug(post_slug);

  return res.status(200).json(createResultSuccess(postData));
};

export default withHttpMethodHandler({ get });

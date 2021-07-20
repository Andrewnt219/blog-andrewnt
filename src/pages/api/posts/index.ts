import { Result, ResultSuccess } from '$common';
import {
  createResultSuccess,
  withHttpMethodHandler,
} from '@modules/api/api-utils';
import {
  getAllPostData,
  PostData,
  sortPostByPublishedOn,
} from '@modules/post/post-data-service';
import { NextApiHandler } from 'next';

type Data = PostData[];
export type ResultPostsIndex_Get = ResultSuccess<Data>;
export type QueryPostsIndex_Get = {
  mode?: 'latest' | 'popular';
};
const get: NextApiHandler<Result<Data>> = async (req, res) => {
  const postData = await getAllPostData();

  sortPostByPublishedOn(postData);
  return res.status(200).json(createResultSuccess(postData));
};

export default withHttpMethodHandler({ get });

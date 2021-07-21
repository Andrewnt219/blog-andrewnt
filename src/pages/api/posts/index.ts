import { Result, ResultSuccess } from '$common';
import {
  createResultSuccess,
  withHttpMethodHandler,
} from '@modules/api/api-utils';
import {
  getAllPublishedPostData,
  PostData,
} from '@modules/post/post-data-service';
import { filterPostData, PostFilterOptions } from '@modules/post/post-utils';
import { PaginateResult } from '@utils/convert-js-utils';
import { NextApiHandler } from 'next';

type Data_Get = PaginateResult<PostData>;
export type ResultPostsIndex_Get = ResultSuccess<Data_Get>;
export type QueryPostsIndex_Get = PostFilterOptions;
const get: NextApiHandler<Result<Data_Get>> = async (req, res) => {
  const query = req.query as QueryPostsIndex_Get;

  const postData = await getAllPublishedPostData();

  const paginationResult = filterPostData(postData, query);

  return res.status(200).json(createResultSuccess(paginationResult));
};

export default withHttpMethodHandler({ get });

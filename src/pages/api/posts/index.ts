import { Result, ResultSuccess } from '$common';
import {
  createResultSuccess,
  withHttpMethodHandler,
} from '@modules/api/api-utils';
import { getAllPostData, PostData } from '@modules/post/post-data-service';
import { filterPostData, PostFilterOptions } from '@modules/post/post-utils';
import { getPaginateResult, PaginateResult } from '@utils/convert-js-utils';
import { NextApiHandler } from 'next';

type Data_Get = PaginateResult<PostData>;
export type ResultPostsIndex_Get = ResultSuccess<Data_Get>;
export type QueryPostsIndex_Get = PostFilterOptions & {
  page?: string | number;
  perPage?: string | number;
};
const get: NextApiHandler<Result<Data_Get>> = async (req, res) => {
  const { perPage, page, ...options } = req.query as QueryPostsIndex_Get;

  const postData = await getAllPostData();

  filterPostData(postData, options);

  const paginationResult = getPaginateResult(postData, perPage, page);

  return res.status(200).json(createResultSuccess(paginationResult));
};

export default withHttpMethodHandler({ get });

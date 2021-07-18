import { Result, ResultError, ResultSuccess } from '@modules/api/api-results';
import { handleApiError, withHttpMethodHandler } from '@modules/api/api-utils';
import { NextApiHandler } from 'next';
import supabase from 'src/lib/supabase/supabase';

type Data = null;
export type ApiPostIncreaseViewCountResult = ResultSuccess<Data>;
const patch: NextApiHandler<Result<Data>> = async (req, res) => {
  try {
    const { post_id } = req.body;

    if (!post_id || typeof post_id !== 'string')
      return res.status(422).json(new ResultError('Invalid post_id'));

    const { error } = await supabase.rpc('increase_view_count', {
      post_id,
    });
    if (error) throw error;

    return res.status(204).json(new ResultSuccess(null));
  } catch (error) {
    handleApiError(req, res, error);
  }
};

export default withHttpMethodHandler({ patch });

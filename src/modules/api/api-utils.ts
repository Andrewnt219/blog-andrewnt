import axios, { AxiosError } from 'axios';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { Result, ResultError } from './api-results';

type ApiHandler = NextApiHandler<Result>;
export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
export type HttpMethodHandlers = Partial<Record<HttpMethod, ApiHandler>>;
type HttpMethodHandlerSelector = (handlers: HttpMethodHandlers) => ApiHandler;

export const withHttpMethodHandler: HttpMethodHandlerSelector =
  (handlers) => (req, res) => {
    const httpMethod = req.method?.toLowerCase() ?? '';
    if (!(httpMethod in handlers)) {
      return res.status(405).json(new ResultError('Invalid http method'));
    }

    const handle = handlers[httpMethod as HttpMethod];
    if (!handle) {
      return res
        .status(405)
        .json(new ResultError(`${httpMethod} not supported`));
    }

    try {
      return handle(req, res);
    } catch (err) {
      return handleApiError(req, res, err);
    }
  };

export const handleApiError = (
  req: NextApiRequest,
  res: NextApiResponse<ResultError>,
  err: unknown
) => {
  console.error(err);
  return res.status(500).json(new ResultError('Something went wrong'));
};

export function getErrorMessage(error: unknown): string | null {
  if (axios.isAxiosError(error)) return getAxiosError(error);

  if (error instanceof ResultError) return error.error.message;

  if (error instanceof Error) return error.message;

  return null;
}

export function getAxiosError(error: AxiosError<ResultError>): string | null {
  if (error.request) return 'Network problem';

  if (error.response) return error.response.data.error.message;

  return null;
}

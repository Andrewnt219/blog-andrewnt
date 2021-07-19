import { Result, ResultError, ResultPending, ResultSuccess } from '$common';
import { createError } from '@utils/create-js-utils';
import axios, { AxiosError } from 'axios';
import type {
  GetStaticPropsResult,
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
} from 'next';

type ApiHandler = NextApiHandler<Result>;
export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
export type HttpMethodHandlers = Partial<Record<HttpMethod, ApiHandler>>;
type HttpMethodHandlerSelector = (handlers: HttpMethodHandlers) => ApiHandler;

export const withHttpMethodHandler: HttpMethodHandlerSelector =
  (handlers) => async (req, res) => {
    const httpMethod = req.method?.toLowerCase() ?? '';
    if (!(httpMethod in handlers)) {
      return res.status(405).json(createResultError('Invalid http method'));
    }

    const handle = handlers[httpMethod as HttpMethod];
    if (!handle) {
      return res
        .status(405)
        .json(createResultError(`${httpMethod} not supported`));
    }

    try {
      return await Promise.resolve(handle(req, res));
    } catch (error) {
      return handleApiError(req, res, error);
    }
  };

export const handleApiError = (
  req: NextApiRequest,
  res: NextApiResponse<ResultError>,
  err: unknown
) => {
  console.error(err);
  return res.status(500).json(createResultError('Something went wrong'));
};

export function getErrorMessage(error: unknown): string | null {
  if (axios.isAxiosError(error)) return getAxiosError(error);

  if (error instanceof Error) return error.message;

  if (isResultError(error)) return error.error.message;

  return null;
}

export function isResultError(error: unknown): error is ResultError {
  if (typeof error !== 'object') return false;

  if (!error) return false;

  return 'message' in error;
}

export function getAxiosError(error: AxiosError<ResultError>): string | null {
  if (error.request) return 'Network problem';

  if (error.response) return error.response.data.error.message;

  return null;
}

export function createResultError(message: string): ResultError {
  return {
    type: 'error',
    data: null,
    error: createError(message),
    timestamp: new Date().toISOString(),
  };
}

export function createResultSuccess<Data = unknown>(
  data: Data
): ResultSuccess<Data> {
  return {
    type: 'success',
    data,
    error: null,
    timestamp: new Date().toISOString(),
  };
}

export function creatResultPending<Data = unknown>(
  initialData?: Data
): ResultPending<Data> {
  return {
    type: 'pending',
    data: initialData ?? null,
    error: null,
  };
}

export function createStaticPropsError(
  message: string
): GetStaticPropsResult<ResultError> {
  return {
    revalidate: 60,
    props: createResultError(message),
  };
}

export function createStaticProps<Data>(
  data: Data
): GetStaticPropsResult<ResultSuccess<Data>> {
  return {
    revalidate: 60,
    props: createResultSuccess(data),
  };
}

export function handleStaticPropsError(
  error: unknown
): GetStaticPropsResult<ResultError> {
  console.error(error);

  return createStaticPropsError('Something went wrong');
}

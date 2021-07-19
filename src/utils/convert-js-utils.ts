import { JustFields } from '$common';
import { ResultError, ResultSuccess } from '@modules/api/api-results';
import { GetStaticPropsResult } from 'next';

export function removeMethodsFromInstance<T>(instance: T) {
  const object = Object.assign({}, instance);

  for (const key in object) {
    if (typeof object[key] === 'function') delete object[key];
  }

  return object as JustFields<T>;
}

export function slugify(str: string, separator = ' ') {
  return str.toLowerCase().split(separator).join('-');
}

export function createStaticPropsError(
  message: string
): GetStaticPropsResult<ResultError> {
  return {
    revalidate: 60,
    props: { ...new ResultError(message) },
  };
}

export function createStaticProps<Data>(
  data: Data
): GetStaticPropsResult<ResultSuccess<Data>> {
  return {
    revalidate: 60,
    props: { ...new ResultSuccess(data) },
  };
}

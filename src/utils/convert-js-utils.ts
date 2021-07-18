import { JustFields } from '$common';

export function convertInstanceToObject<T>(instance: T) {
  return Object.assign({}, instance) as JustFields<T>;
}

import { JustFields } from '$common';

export function removeMethodsFromInstance<T>(instance: T) {
  const object = Object.assign({}, instance);

  for (const key in object) {
    if (typeof object[key] === 'function') delete object[key];
  }

  return object as JustFields<T>;
}

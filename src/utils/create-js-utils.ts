import { ErrorWithMessage } from '$common';

export function createError(message: string): ErrorWithMessage {
  return { message };
}

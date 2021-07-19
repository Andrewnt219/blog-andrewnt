declare module '$common' {
  import { ReactNode } from 'react';

  type JustMethodKeys<T> = {
    [P in keyof T]: T[P] extends () => void ? P : never;
  }[keyof T];

  type JustMethods<T> = Pick<T, JustMethodKeys<T>>;

  type JustFieldsKey<T> = {
    [P in keyof T]: T[P] extends () => void ? never : P;
  }[keyof T];

  type JustFields<T> = Pick<T, JustFieldsKey<T>>;

  type ThenArgRecursive<T> = T extends PromiseLike<infer U>
    ? ThenArgRecursive<U>
    : T;

  type WithLayout = (page: ReactNode) => ReactNode;

  interface Objectable {
    getObject(): JustFields;
  }

  type ErrorWithMessage = { message: string };

  type Result<Data = unknown> =
    | ResultSuccess<Data>
    | ResultError
    | ResultPending;

  type ResultSuccess<Data> = {
    type: 'success';
    data: Data;
    error: null;
    timestamp: string;
  };

  type ResultError = {
    type: 'error';
    data: null;
    error: ErrorWithMessage;
    timestamp: string;
  };

  type ResultPending<Data = null> = {
    type: 'pending';
    data: Data | null;
    error: null;
  };
}

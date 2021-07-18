declare module '$common' {
  import type { serialize } from 'next-mdx-remote/serialize';

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

  type FrontMatter = {
    title: string;
  };

  type MdxSource = ThenArgRecursive<ReturnType<typeof serialize>>;
}

declare module '$common' {
  import type { serialize } from 'next-mdx-remote/serialize';

  type ThenArgRecursive<T> = T extends PromiseLike<infer U>
    ? ThenArgRecursive<U>
    : T;

  type FrontMatter = {
    title: string;
  };

  type MdxSource = ThenArgRecursive<ReturnType<typeof serialize>>;
}

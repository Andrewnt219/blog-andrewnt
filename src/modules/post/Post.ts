import { MdxSource } from '$common';
import { FrontMatter } from './post-utils';
import { PostMeta } from './PostMeta';

export class Post {
  meta: PostMeta;
  content: MdxSource;
  frontMatter: FrontMatter;

  constructor(content: MdxSource, meta: PostMeta, frontMatter: FrontMatter) {
    this.content = content;
    this.meta = meta;
    this.frontMatter = frontMatter;
  }
}

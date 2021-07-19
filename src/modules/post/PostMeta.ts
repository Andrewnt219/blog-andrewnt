import { JustFields, Objectable } from '$common';
import { removeMethodsFromInstance } from '@utils/convert-js-utils';

export type PostMetaDocument = JustFields<PostMeta>;
export class PostMeta implements Objectable {
  static readonly TABLE_NAME = 'post_meta';
  view_count = 1;
  like_count = 0;
  post_id = '';

  constructor(post_id: string) {
    this.post_id = post_id;
  }

  static fromPostMetaDocument(postMetaObject: PostMetaDocument): PostMeta {
    return Object.assign(new PostMeta(postMetaObject.post_id), postMetaObject);
  }

  getObject() {
    return removeMethodsFromInstance<PostMeta>(this);
  }

  increaseViewCount(amount?: number) {
    this.view_count += amount ?? 1;
  }

  increaseLikeCount(amount?: number) {
    this.like_count += amount ?? 1;
  }
}

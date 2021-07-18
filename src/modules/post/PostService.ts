import adminDb from '@lib/firebase/firestore-admin';
import { PostMeta, PostMetaDocument } from './PostMeta';

export class PostService {
  static readonly collection = adminDb.collection('post_meta');

  static getPostMetaRef(post_id: string) {
    return PostService.collection.doc(post_id);
  }
  static async getPostMeta(post_id: string) {
    const postMetaRef = PostService.getPostMetaRef(post_id);
    const postMetaSnapshot = await postMetaRef.get();

    if (!postMetaSnapshot.exists) return null;

    return PostMeta.fromPostMetaDocument(
      postMetaSnapshot.data() as PostMetaDocument
    );
  }

  static async addPostMeta(postMeta: PostMeta) {
    const postMetaRef = PostService.getPostMetaRef(postMeta.post_id);
    await postMetaRef.set(postMeta.getObject());
  }

  static async updatePostMeta(postMeta: PostMeta) {
    const postMetaRef = PostService.getPostMetaRef(postMeta.post_id);
    await postMetaRef.update(postMeta.getObject());
  }
}

import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import fireStore from 'src/lib/firebase/firestore';
import { PostMeta, PostMetaDocument } from './PostMeta';

export class PostService {
  static readonly COLLECTION_NAME = 'post_meta';
  static readonly db = fireStore;

  static getPostMetaRef(post_id: string) {
    return doc(PostService.db, PostService.COLLECTION_NAME, post_id);
  }
  static async getPostMeta(post_id: string) {
    const postMetaRef = PostService.getPostMetaRef(post_id);
    const postMeta = await getDoc(postMetaRef);

    if (!postMeta.exists()) return null;

    return PostMeta.fromPostMetaDocument(postMeta.data() as PostMetaDocument);
  }

  static async addPostMeta(postMeta: PostMeta) {
    await setDoc(
      doc(fireStore, 'post_meta', postMeta.post_id),
      postMeta.getObject()
    );
  }

  static async updatePostMeta(postMeta: PostMeta) {
    const postMetaRef = PostService.getPostMetaRef(postMeta.post_id);
    await updateDoc(postMetaRef, postMeta.getObject());
  }
}

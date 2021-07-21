import adminDb from '@lib/firebase/firestore-admin';
import { tryParsePageNumber, tryParsePerPage } from '@utils/convert-js-utils';

export type PostMeta = {
  view_count: number;
  like_count: number;
  post_id: string;
};

const postMetaCollectionRef = adminDb.collection('post_meta');

export function getPostMetaRef(post_id: string) {
  return postMetaCollectionRef.doc(post_id);
}
export async function getPostMeta(post_id: string) {
  const postMetaRef = getPostMetaRef(post_id);
  const postMetaSnapshot = await postMetaRef.get();

  if (!postMetaSnapshot.exists) {
    const postMeta = initPostMeta(post_id);
    addPostMeta(postMeta);

    return postMeta;
  }

  return postMetaSnapshot.data() as PostMeta;
}

export async function addPostMeta(postMeta: PostMeta) {
  const postMetaRef = getPostMetaRef(postMeta.post_id);
  await postMetaRef.set(postMeta);
}

export async function updatePostMeta(postMeta: PostMeta) {
  const postMetaRef = getPostMetaRef(postMeta.post_id);
  await postMetaRef.update(postMeta);
}

export async function getPopularPostMeta(
  _perPage: string | number | undefined,
  _page: string | number | undefined
) {
  const perPage = tryParsePerPage(_perPage);
  const page = tryParsePageNumber(_page);

  const snapshot = await postMetaCollectionRef
    .startAt((page - 1) * perPage)
    .limit(perPage)
    .get();

  return snapshot.docs.map((doc) => doc.data() as PostMeta);
}

export function initPostMeta(post_id: string): PostMeta {
  return {
    post_id,
    like_count: 0,
    view_count: 1,
  };
}

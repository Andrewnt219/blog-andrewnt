import { ResultPostIndex_Get } from '@api/post/[post_slug]';
import { QueryPostsIndex_Get, ResultPostsIndex_Get } from '@api/posts';
import { QueryPostsPinned_Get, ResultPostsPinned_Get } from '@api/posts/pinned';
import axios from 'axios';

const apiPost = axios.create({ baseURL: '/api/post' });
const apiPosts = axios.create({ baseURL: '/api/posts' });

export async function queryAllPostData(params?: QueryPostsIndex_Get) {
  const { data } = await apiPosts.get<ResultPostsIndex_Get>('/', { params });
  return data.data;
}

export async function queryPostData(post_slug: string) {
  const { data } = await apiPost.get<ResultPostIndex_Get>(post_slug);
  return data.data;
}

export async function queryPinnedPosts(params?: QueryPostsPinned_Get) {
  const { data } = await apiPosts.get<ResultPostsPinned_Get>("/pinned", {params});
  return data.data;
}

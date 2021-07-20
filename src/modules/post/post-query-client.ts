import { QueryPostsIndex_Get, ResultPostsIndex_Get } from '@api/posts';
import axios from 'axios';

const apiPost = axios.create({ baseURL: '/api/post' });
const apiPosts = axios.create({ baseURL: '/api/posts' });

export async function queryAllPostData(params?: QueryPostsIndex_Get) {
  const { data } = await apiPosts.get<ResultPostsIndex_Get>('', { params });
  return data.data;
}

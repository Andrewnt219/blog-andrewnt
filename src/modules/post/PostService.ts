import { ApiPostIncreaseViewCountResult } from '@pages/api/post/increaseViewCount';
import axios from 'axios';

export class PostService {
  static readonly fetcher = axios.create({ baseURL: '/api/post' });

  static async increaseViewCount(post_id: string) {
    const { data } =
      await PostService.fetcher.patch<ApiPostIncreaseViewCountResult>(
        '/increaseViewCount',
        { post_id }
      );

    return data;
  }
}

export class PostMeta {
  static readonly TABLE_NAME = 'post_meta';
  view_count = 0;
  like_count = 0;
  post_id = '';
}

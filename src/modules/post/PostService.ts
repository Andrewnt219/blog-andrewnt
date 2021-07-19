import adminDb from '@lib/firebase/firestore-admin';
import { slugify } from '@utils/convert-js-utils';
import fs from 'fs';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import { assertFrontMatter } from './post-utils';
import { PostData } from './PostData';
import { PostMeta, PostMetaDocument } from './PostMeta';

export class PostService {
  static readonly collection = adminDb.collection('post_meta');
  static readonly ROOT = process.cwd();
  static readonly BLOG_PATH = path.join(PostService.ROOT, 'blog');

  //#region PostMeta
  static getPostMetaRef(post_id: string) {
    return PostService.collection.doc(post_id);
  }
  static async getPostMeta(post_id: string) {
    const postMetaRef = PostService.getPostMetaRef(post_id);
    const postMetaSnapshot = await postMetaRef.get();

    if (!postMetaSnapshot.exists) {
      const postMeta = new PostMeta(post_id);
      PostService.addPostMeta(postMeta);

      return postMeta;
    }

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

  //#endregion

  //#region posts (files)

  static getAllPostNames() {
    return fs.readdirSync(PostService.BLOG_PATH);
  }

  static async getPostbySlug(postSlug: string): Promise<PostData> {
    const pathToPost = PostService.getPostPathBySlug(postSlug);
    const source = fs.readFileSync(pathToPost, 'utf-8');

    const { content, data } = matter(source);
    assertFrontMatter(data);

    const mdxSource = await serialize(content, { scope: data });
    const postMeta = await PostService.getPostMeta(slugify(data.title));

    return new PostData(mdxSource, postMeta, data);
  }

  static async getLatestPosts(options: GetFilesOptions) {
    // Collect all of the MDX files in the pages directory, using fs.readdirSync.
    // Load the frontmatter (I use an NPM package for this, gray-matter).
    // Filter out any unpublished posts (ones where isPublished is not set to true).
    // Sort all of the blog posts by publishedOn, and slice out everything after the specified limit.
    // Return the data.
  }

  static async getPopularPosts(options: GetFilesOptions) {
    // Same concept as `getLatestContent`, but check from the db
  }
  //#endregion

  // #region helpers
  private static getPostPathBySlug(postSlug: string) {
    return path.join(PostService.BLOG_PATH, `${postSlug}.mdx`);
  }
  // #endregion
}

type GetFilesOptions = {
  limit: number;
};

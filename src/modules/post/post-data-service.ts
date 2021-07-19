import { slugify } from '@utils/convert-js-utils';
import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import { assertFrontMatter, FrontMatter } from './FrontMatter';
import { getPostMeta, PostMeta } from './post-meta-service';

type GetFilesOptions = {
  limit: number;
};
export type PostData = {
  meta: PostMeta;
  content: MDXRemoteSerializeResult;
  frontMatter: FrontMatter;
};

const ROOT_FOLDER = process.cwd();
const BLOG_PATH = path.join(ROOT_FOLDER, 'blog');

export function getAllPostNames() {
  return fs.readdirSync(BLOG_PATH);
}

export async function getPostDataBySlug(postSlug: string): Promise<PostData> {
  const pathToPost = getPostPathBySlug(postSlug);
  const source = fs.readFileSync(pathToPost, 'utf-8');

  const { content, data } = matter(source);
  assertFrontMatter(data);

  const mdxSource = await serialize(content, { scope: data });
  const meta = await getPostMeta(slugify(data.title));

  return {
    content: mdxSource,
    frontMatter: data,
    meta,
  };
}

export async function getAllFrontMatter(options: GetFilesOptions) {
  // Collect all of the MDX files in the pages directory, using fs.readdirSync.
  // Load the frontmatter (I use an NPM package for this, gray-matter).
  // Filter out any unpublished posts (ones where isPublished is not set to true).
  // Sort all of the blog posts by publishedOn, and slice out everything after the specified limit.
  // Return the data.
}

export async function getLatestFrontMatter(options: GetFilesOptions) {
  // Collect all of the MDX files in the pages directory, using fs.readdirSync.
  // Load the frontmatter (I use an NPM package for this, gray-matter).
  // Filter out any unpublished posts (ones where isPublished is not set to true).
  // Sort all of the blog posts by publishedOn, and slice out everything after the specified limit.
  // Return the data.
}

export async function getPopularFrontMatter(options: GetFilesOptions) {
  // Same concept as `getLatestContent`, but check from the db
}

export function getPostPathBySlug(postSlug: string) {
  return path.join(BLOG_PATH, `${postSlug}.mdx`);
}

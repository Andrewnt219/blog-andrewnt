import fs from 'fs';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';

const ROOT = process.cwd();
const BLOG_PATH = path.join(ROOT, 'blog');

type GetFilesOptions = {
  limit: number;
};

export function getAllPosts() {
  return fs.readdirSync(BLOG_PATH);
}

export async function getPostbySlug(postSlug: string) {
  const pathToPost = getPostPathBySlug(postSlug);
  const source = fs.readFileSync(pathToPost, 'utf-8');

  const { content, data } = matter(source);
  assertFrontMatter(data);

  const mdxSource = await serialize(content, { scope: data });

  return { mdxSource, frontMatter: data };
}

export async function getLatestPosts(options: GetFilesOptions) {
  // Collect all of the MDX files in the pages directory, using fs.readdirSync.
  // Load the frontmatter (I use an NPM package for this, gray-matter).
  // Filter out any unpublished posts (ones where isPublished is not set to true).
  // Sort all of the blog posts by publishedOn, and slice out everything after the specified limit.
  // Return the data.
}

export async function getPopularPosts(options: GetFilesOptions) {
  // Same concept as `getLatestContent`, but check from the db
}

// #region validations
const frontMatterStringValueKey = [
  'title',
  'description',
  'thumbnail',
  'publishedOn',
  'layout',
] as const;
type FrontMatterStringValueKey = typeof frontMatterStringValueKey[number];

const frontMatterBoolValueKey = ['isPublished'] as const;
type FrontMatterBoolValueKey = typeof frontMatterBoolValueKey[number];
type FrontMatter = Record<FrontMatterStringValueKey, string> &
  Record<FrontMatterBoolValueKey, boolean>;

export function assertFrontMatter(data: any): asserts data is FrontMatter {
  if (!data) throw new Error('data is empty');
  if (typeof data !== 'object') throw new Error('data is not FrontMatter');

  frontMatterBoolValueKey.forEach((key) => {
    if (typeof data[key] !== 'boolean')
      throw new Error('data is not FrontMatter');
  });

  frontMatterStringValueKey.forEach((key) => {
    if (typeof data[key] !== 'string')
      throw new Error('data is not FrontMatter');
  });
}
// #endregion

// #region low-levels
function getPostPathBySlug(postSlug: string) {
  return path.join(BLOG_PATH, `${postSlug}.mdx`);
}
// #endregion

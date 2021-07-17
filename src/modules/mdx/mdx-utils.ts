import { FrontMatter } from '$common';
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
  const mdxSource = await serialize(content, { scope: data });

  return { mdxSource, frontMatter: data as FrontMatter };
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

// #region low-levels
function getPostPathBySlug(postSlug: string) {
  return path.join(BLOG_PATH, `${postSlug}.mdx`);
}
// #endregion

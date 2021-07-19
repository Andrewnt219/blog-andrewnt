import dayjs from 'dayjs';
import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import { getPostMeta, PostMeta } from './post-meta-service';
import { assertFrontMatter } from './post-utils';

//#region types
type GetFilesOptions = {
  limit: number;
};

export type PostMatter = FrontMatter & {
  slug: string;
  content: MDXRemoteSerializeResult;
};
export type FrontMatter = {
  title: string;
  description: string;
  thumbnail: string;
  publishedOn: string;
  isArchived: boolean;
  layout: string;
};
export type PostData = PostMatter & PostMeta;
export type FilterPostFn = (post: PostMatter) => boolean;
//#endregion types

//#region constants
const ROOT_FOLDER = process.cwd();
const BLOG_PATH = path.join(ROOT_FOLDER, 'blog');
//#endregion constants

//#region main

export async function getPostData(postSlug: string): Promise<PostData> {
  const postMatter = await getPostMatter(postSlug);
  const meta = await getPostMeta(postSlug);

  return {
    ...postMatter,
    ...meta,
  };
}

export async function getAllPostMatter(filterFn?: FilterPostFn) {
  const postSlugs = getAllPostSlugs();
  const postMatters = await Promise.all(postSlugs.map(getPostMatter));

  return filterFn ? postMatters.filter(filterFn) : postMatters;
}

export async function getPostMatter(postSlug: string): Promise<PostMatter> {
  const { content, data } = getRawPostMatter(postSlug);
  assertFrontMatter(data);

  const mdxSource = await serialize(content, { scope: data });

  return { ...data, content: mdxSource, slug: postSlug };
}

export async function getLatestPostMatter(options: GetFilesOptions) {
  // Collect all of the MDX files in the pages directory, using fs.readdirSync.
  // Load the frontmatter (I use an NPM package for this, gray-matter).
  // Filter out any unpublished posts (ones where isPublished is not set to true).
  // Sort all of the blog posts by publishedOn, and slice out everything after the specified limit.
  // Return the data.
}

export async function getPopularPostMatter(options: GetFilesOptions) {
  // Same concept as `getLatestContent`, but check from the db
}
//#endregion main

//#region helpers
export function getAllPostFilenames() {
  return fs.readdirSync(BLOG_PATH);
}

export function getAllPostSlugs() {
  return getAllPostFilenames().map((filename) => filename.replace('.mdx', ''));
}

function getAllPostFiles() {
  return fs.readFileSync(BLOG_PATH);
}

function readPostFile(postSlug: string) {
  const pathToPost = getPostPathBySlug(postSlug);
  return fs.readFileSync(pathToPost, 'utf-8');
}

function getRawPostMatter(postSlug: string) {
  const source = readPostFile(postSlug);

  return matter(source);
}

function getAllRawPostMatters() {
  const postSlugs = getAllPostSlugs();

  return postSlugs.map(getRawPostMatter);
}

function getPostPathBySlug(postSlug: string) {
  return path.join(BLOG_PATH, `${postSlug}.mdx`);
}

function getPostPathsBySlugs(postSlugList: string[]) {
  return postSlugList.map(getPostPathBySlug);
}

export function filterPostNotArchived(postMatters: PostMatter[]) {
  return postMatters.filter((post) => !post.isArchived);
}

export function filterPostPublishOn(fromDate: Date, toDate: Date) {
  return function (postMatter: PostMatter) {
    const publishDate = dayjs(postMatter.publishedOn);
    return publishDate.isAfter(fromDate) && publishDate.isBefore(toDate);
  };
}

//#endregion helpers

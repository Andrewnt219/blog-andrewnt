import { serializePost } from '@modules/mdx/mdx-utils';
import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import path from 'path';
import { getPostMeta, PostMeta } from './post-meta-service';
import { assertFrontMatter, filterPostNotArchived } from './post-utils';

//#region types

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
const ROOT_FOLDER =
  process.env.NODE_ENV === 'production'
    ? path.join(process.cwd(), '.next/server/chunks')
    : process.cwd();
const BLOG_PATH = path.join(ROOT_FOLDER, 'blog');
//#endregion constants

//#region main

export async function getAllPublishedPostData(): Promise<PostData[]> {
  const postSlugs = getAllPostSlugs();
  const postDataList = await Promise.all(postSlugs.map(getPostDataFromSlug));
  const publishedPostDataList = postDataList.filter(filterPostNotArchived);

  return publishedPostDataList;
}
export async function getPostDataFromSlug(postSlug: string): Promise<PostData> {
  const postMatter = await getPostMatter(postSlug);
  return getPostDataFromMatter(postMatter);
}

export async function getPostDataFromMatter(
  postMatter: PostMatter
): Promise<PostData> {
  const meta = await getPostMeta(postMatter.slug);

  return {
    ...postMatter,
    ...meta,
  };
}

export async function getPostDataFromMeta(
  postMeta: PostMeta
): Promise<PostData> {
  const postMatter = await getPostMatter(postMeta.post_id);

  return {
    ...postMatter,
    ...postMeta,
  };
}

export async function getAllPublishedPostMatter() {
  const postSlugs = getAllPostSlugs();
  const postMatters = await Promise.all(postSlugs.map(getPostMatter));
  const publishedPostMatter = postMatters.filter(filterPostNotArchived);

  return publishedPostMatter;
}

export async function getPostMatter(postSlug: string): Promise<PostMatter> {
  const rawMatter = getRawPostMatter(postSlug);
  assertFrontMatter(rawMatter.data);

  const mdxSource = await serializePost(rawMatter);

  return { ...rawMatter.data, content: mdxSource, slug: postSlug };
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

//#endregion helpers

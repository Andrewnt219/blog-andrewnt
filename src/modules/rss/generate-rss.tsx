import MdxComponents from '@modules/mdx/components/MdxComponents/MdxComponents';
import {
  getAllPublishedPostMatter,
  PostMatter,
} from '@modules/post/post-data-service';
import { getLinkToPost } from '@modules/post/post-utils';
import { Author, Feed } from 'feed';
import fs from 'fs';
import { MDXRemote } from 'next-mdx-remote';
import { renderToStaticMarkup } from 'react-dom/server';

const today = new Date();
const BASE_URL = 'https://blog.andrewnt.dev';
const author: Author = {
  name: 'Andrew Nguyen',
  email: 'hey@andrewnt.dev',
  link: BASE_URL,
};
const categories = ['Web development', 'Programming', 'IT'];

const feed = new Feed({
  title: "Andrew's Blog",
  description: 'Welcome to my blog!',
  id: BASE_URL,
  link: BASE_URL,
  language: 'en',
  image: `${BASE_URL}/images/logo.svg`,
  favicon: `${BASE_URL}/favicon.ico`,
  copyright: `All rights reserved ${today.getFullYear()}, Florian Kapfenberger`,
  updated: today,
  generator: 'Next.js using Feed for Node.js',
  feedLinks: {
    rss2: `${BASE_URL}/rss/feed.xml`,
    json: `${BASE_URL}/rss/feed.json`,
    atom: `${BASE_URL}/rss/atom.xml`,
  },
});

function addFeedItem(postMatter: PostMatter) {
  const postUrl = BASE_URL + getLinkToPost(postMatter.slug);

  feed.addItem({
    title: postMatter.title,
    id: postUrl,
    link: postUrl,
    description: postMatter.description,

    content: renderToStaticMarkup(
      <MDXRemote {...postMatter.content} components={MdxComponents} />
    ).replace(/src="\//g, `src="${BASE_URL}/`),
    author: [author],
    contributor: [author],
    date: new Date(postMatter.publishedOn),
    image: BASE_URL + `/images/${postMatter.slug}/hero.jpg`,
    category: postMatter.tags.map((tag) => ({ name: tag })),
  });
}

export default async function generateRss() {
  const postMatters = await getAllPublishedPostMatter();

  for (const category of categories) {
    feed.addCategory(category);
  }

  postMatters.forEach(addFeedItem);

  fs.mkdirSync('./public/rss', { recursive: true });
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1());
  fs.writeFileSync('./public/rss/feed.json', feed.json1());
}

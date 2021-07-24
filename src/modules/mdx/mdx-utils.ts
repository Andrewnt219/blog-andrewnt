import matter from 'gray-matter';
import mdxPrism from 'mdx-prism';
import { serialize } from 'next-mdx-remote/serialize';

export function serializePost(matter: matter.GrayMatterFile<string>) {
  return serialize(matter.content, {
    scope: matter.data,
    mdxOptions: {
      remarkPlugins: [
        require('remark-code-titles'),
        [
          require('remark-toc'),
          {
            ordered: true,
          },
        ],
      ],
      rehypePlugins: [
        require('rehype-slug'),

        [
          require('rehype-autolink-headings'),
          {
            behavior: 'append',
            properties: {
              className: 'heading-anchor',
            },
          },
        ],
        mdxPrism,
      ],
    },
  });
}

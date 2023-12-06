import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import readingTime from 'reading-time';
import path from 'path';
// Remark packages
import remarkGfm from 'remark-gfm';
import remarkFootnotes from 'remark-footnotes';
import remarkExtractFrontmatter from './app/libs/remark-extract-frontmatter';
import remarkCodeTitles from './app/libs/remark-code-title';
import { extractTocHeadings } from './app/libs/remark-toc-headings';
// Rehype packages
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCitation from 'rehype-citation';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypePresetMinify from 'rehype-preset-minify';

const root = process.cwd();

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    icon: { type: 'string' },
    image: { type: 'string' },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    draft: { type: 'boolean' },
    date: { type: 'string', required: true },
  },
  computedFields: {
    readingTime: {
      type: 'number',
      resolve: (post) => Math.ceil(readingTime(post.body.raw).minutes),
    },
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
    // toc: {
    //   type: 'string',
    //   resolve: (post) => extractTocHeadings(post.body.raw),
    // },
    category: {
      type: 'string',
      resolve: (post) =>
        post._raw.sourceFileDir.indexOf('/') !== -1
          ? post._raw.sourceFileDir.slice(
              0,
              post._raw.sourceFileDir.indexOf('/')
            )
          : post._raw.sourceFileDir,
    },
  },
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkGfm,
      remarkCodeTitles,
      [remarkFootnotes, { inlineNotes: true }],
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      [rehypeCitation, { path: path.join(root, 'data') }],
      [rehypePrismPlus, { ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
});

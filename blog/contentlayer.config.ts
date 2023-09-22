import { defineDocumentType, makeSource } from "contentlayer/source-files";
import readingTime from "reading-time";
import path from "path";
// Remark packages
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";
import remarkExtractFrontmatter from "./src/libs/remark-extract-frontmatter";
import remarkCodeTitles from "./src/libs/remark-code-title";
import { extractTocHeadings } from "./src/libs/remark-toc-headings";
import remarkImgToJsx from "./src/libs/remark-img-to-jsx";
// Rehype packages
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCitation from "rehype-citation";
import rehypePrismPlus from "rehype-prism-plus";
import rehypePresetMinify from "rehype-preset-minify";

const root = process.cwd();

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    icon: { type: "string" },
    image: { type: "string" },
    tags: { type: "list", of: { type: "string" }, required: true },
    draft: { type: "boolean" },
    date: { type: "string", required: true },
  },
  computedFields: {
    readingTime: {
      type: "number",
      resolve: (post) => Math.ceil(readingTime(post.body.raw).minutes),
    },
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
    toc: {
      type: "string",
      resolve: (post) => extractTocHeadings(post.body.raw),
    },
  },
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      [remarkFootnotes, { inlineNotes: true }],
      remarkImgToJsx,
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      [rehypeCitation, { path: path.join(root, "data") }],
      [rehypePrismPlus, { ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
});

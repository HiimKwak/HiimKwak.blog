import { defineDocumentType, makeSource } from "contentlayer/source-files";
import readingTime from "reading-time";
import path from "path";
// Remark packages
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";
import remarkMath from "remark-math";
import remarkExtractFrontmatter from "./lib/remark-extract-frontmatter";
import remarkCodeTitles from "./lib/remark-code-title";
import { extractTocHeadings } from "./lib/remark-toc-headings";
import remarkImgToJsx from "./lib/remark-img-to-jsx";
// Rehype packages
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
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
    date: { type: "date", required: true },
  },
  computedFields: {
    readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
    // slug: {
    //   type: "string",
    //   resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ""),
    // },
    toc: { type: "string", resolve: (doc) => extractTocHeadings(doc.body.raw) },
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
      remarkMath,
      remarkImgToJsx,
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      [rehypeCitation, { path: path.join(root, "data") }],
      [rehypePrismPlus, { ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
});

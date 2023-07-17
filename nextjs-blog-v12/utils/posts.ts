import fs from "fs";
import { sync } from "glob";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Metadata, PostInfo, PostData } from "@/types/types";
import { parsePost } from "./useParsePost";

export const BASE_PATH = "/posts";
export const POSTS_PATH = path.join(process.cwd(), BASE_PATH);
// const postsDirectory = path.join(process.cwd(), "posts");

export const getAllPosts = () => {
  // extract paths of posts and extract front-matter data
  const postPaths: string[] = sync(`${POSTS_PATH}/**/*.md`);
  return postPaths.map(parsePost);
};

export async function getPostData(id: PostData["id"]): Promise<PostData> {
  // const postPath = path.join(POSTS_PATH, `${id}.md`);
  const postPath = sync(`/**/${id}.md`)[0];
  const fileContents = fs.readFileSync(postPath, "utf8");

  const {
    data: { title, date },
    content,
  } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    title,
    date,
  };
}

export function getAllPostPaths() {
  // const fileNames = fs.readdirSync(postsDirectory);
  const postPaths: string[] = sync(`${POSTS_PATH}/**/*.md`);

  return postPaths.map((postPath) => {
    return {
      params: {
        slug: postPath.slice(postPath.indexOf(BASE_PATH)).replace(/\.md$/, ""),
      },
    };
  });
}

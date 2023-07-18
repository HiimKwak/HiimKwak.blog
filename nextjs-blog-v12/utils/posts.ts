import { sync } from "glob";
import path from "path";
import { Post } from "@/types/types";
import { parsePost } from "./useParsePost";

export const BASE_PATH = "/posts";
export const POSTS_PATH = path.join(process.cwd(), BASE_PATH);
// const postsDirectory = path.join(process.cwd(), "posts");

export const getAllPosts = (): Array<Post> => {
  // extract paths of posts and extract front-matter data
  const postPaths: string[] = sync(`${POSTS_PATH}/**/*.mdx`);
  return postPaths.reduce<Post[]>((acc, postPath) => {
    const post = parsePost(postPath);
    if (!post) return acc;
    return [...acc, post];
  }, []);
};

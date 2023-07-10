import matter from "gray-matter";
import path from "path";
import type { Post } from "../types/types";
import fs from "fs/promises";
import { cache } from "react";

// `cache` 는 요청의 수명 기간 동안 함수를 캐시할 수 있는 리액트 18의 기능입니다.
// 즉, 페이지를 렌더링할 때 여러 번 호출할 수 있지만 페이지 빌드 당 한 번만 getPosts()가 호출됩니다.
export const getPosts = cache(async () => {
  const posts = await fs.readdir("./posts/");

  return Promise.all(
    posts
      .filter((file) => path.extname(file) === ".mdx")
      .map(async (file) => {
        const filePath = `./posts/${file}`;
        const postContent = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(postContent);

        if (data.published === false) {
          return null;
        }

        return { ...data, body: content } as Post;
      })
  );
});

export async function getPost(slug: string) {
  const posts = await getPosts();
  return posts.find((post) => post?.slug === slug);
}

export default getPosts;

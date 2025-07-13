import { getDiaryPosts } from "app/db/content/post";

export default async function sitemap() {
  const posts = getDiaryPosts().map((post) => ({
    url: `https://hiimkwak.blog/post/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = ["", "/posts"].map((route) => ({
    url: `https://hiimkwak.blog${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...posts];
}

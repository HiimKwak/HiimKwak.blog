import { getBlogPosts } from 'app/db/post';

export default async function sitemap() {
  let posts = getBlogPosts().map((post) => ({
    url: `https://hiimkwak.blog/post/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = ['', '/posts'].map((route) => ({
    url: `https://hiimkwak.blog${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...posts];
}

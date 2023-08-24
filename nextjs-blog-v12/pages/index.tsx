import Link from "next/link";
import { GetStaticProps } from "next";

import RootLayout from "@/components/Layout";

import { allPosts, Post } from "contentlayer/generated";
import { compareDesc } from "date-fns";

export default function Home({ posts }: { posts: string }) {
  const postData = JSON.parse(posts) as Post[];
  return (
    <RootLayout>
      <div className="flex flex-col gap-2">
        {postData.map((post) => (
          <Link href={post.url} key={post._id}>
            <div className="text-xl font-bold">{post.title}</div>
            <div className="text-base text-slate-500">{post.description}</div>
            <div className="text-xs">
              {post.date} {post.readingTime}분
            </div>
            <div>
              {post.tags.map((tag) => (
                <div key={tag}>{tag}</div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </RootLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // const posts = getAllPosts();
  const posts: Post[] = allPosts.sort((a: Post, b: Post) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return {
    props: {
      posts: JSON.stringify(posts),
    },
  };
};

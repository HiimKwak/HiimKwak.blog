import RootLayout from "@/components/Layout";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import Link from "next/link";
import { GetStaticProps } from "next";

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <RootLayout>
      <div className="flex flex-col gap-2">
        {posts.map((post) => (
          <Link href={post.url} key={post._id}>
            <div className="text-xl font-bold">{post.title}</div>
            <div className="text-slate-300">{post.description}</div>
            <div className="text-sm">{post.date}</div>
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
      posts,
    },
  };
};

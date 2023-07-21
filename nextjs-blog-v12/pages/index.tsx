import RootLayout from "@/components/Layout";
import { getAllPosts } from "@/utils/posts";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
// import { Post } from "@/types/types";
import Link from "next/link";
import { GetStaticProps } from "next";

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <RootLayout>
      <div className="flex flex-col gap-2">
        {posts.map(({ slug, title, date, description }) => (
          <Link href={slug} key={title}>
            <div className="text-xl font-bold">{title}</div>
            <div className="text-slate-300">{description}</div>
            <div className="text-sm">{date}</div>
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

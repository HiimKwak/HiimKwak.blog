import RootLayout from "@/components/Layout";
import { getAllPosts } from "@/utils/posts";
import { Post } from "@/types/types";
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
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
};

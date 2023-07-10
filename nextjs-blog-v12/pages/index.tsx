import RootLayout from "@/components/Layout";
import { getSortedPostsData } from "@/utils/posts";
import { PostInfo } from "@/types/types";
import Link from "next/link";
import { GetStaticProps } from "next";

export default function Home({ posts }: { posts: PostInfo[] }) {
  return (
    <RootLayout>
      <span className="text-lg">Home</span>
      {posts.map(({ id, title, date }: PostInfo) => (
        <Link href={`posts/${id}`} key={id}>
          {title}
          <br />
          {date}
        </Link>
      ))}
    </RootLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getSortedPostsData();
  return {
    props: {
      posts,
    },
  };
};

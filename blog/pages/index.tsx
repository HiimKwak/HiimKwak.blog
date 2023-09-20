import Link from "next/link";
import { GetStaticProps } from "next";
import { allPosts, Post } from "contentlayer/generated";

import RootLayout from "@/components/Layout";
import IconText from "@/components/common/IconText";
import { IcCalendar, IcClock } from "@/assets/icons";

import { compareDesc } from "date-fns";
import dayjs from "dayjs";

export default function Home({ posts }: { posts: string }) {
  const postData = JSON.parse(posts) as Post[];
  return (
    <RootLayout>
      <div className="flex flex-col gap-2">
        {postData.map((post) => (
          <Link href={post.url} key={post._id} className="w-full pb-4">
            <div className="text-xl font-bold">{post.title}</div>
            <div className="text-base text-slate-500">{post.description}</div>
            <div className="flex items-baseline justify-between gap-4 mt-1">
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag) => (
                  <div
                    key={tag}
                    className="block p-1 px-3 font-semibold rounded-lg bg-neutral-200 text-neutral-600 dark:bg-neutral-600 dark:text-neutral-400"
                  >
                    {tag}
                  </div>
                ))}
              </div>

              <div className="flex gap-2 text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                <IconText
                  Icon={IcCalendar}
                  text={dayjs(post.date).format("YY.MM.DD")}
                />
                <IconText Icon={IcClock} text={`${post.readingTime}분`} />
              </div>
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

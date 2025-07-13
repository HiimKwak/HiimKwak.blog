import { getDiaryPosts } from "../db/content/post";
import Link from "next/link";
import dayjs from "dayjs";

export const metadata = {
  title: "일상",
  description: "곽민규의 생각",
};

export default function Post() {
  const allPosts = getDiaryPosts()
    .sort(
      (a, b) =>
        new Date(a.metadata.publishedAt).getTime() -
        new Date(b.metadata.publishedAt).getTime()
    )
    .reverse();

  return (
    <div className="mx-auto max-w-2xl px-4 md:px-0">
      <div className="flex flex-col divide-y rounded-lg divide-slate-200 dark:divide-gray-700">
        {allPosts.map((post) => (
          <PostCard {...post} key={post.slug} />
        ))}
      </div>
    </div>
  );
}

function PostCard(post: ReturnType<typeof getDiaryPosts>[0]) {
  return (
    <Link href={`/post/${post.slug}`} className="min-w-0 py-4 pb-3">
      <p className="text-xl font-medium">{post.metadata.title}</p>
      <p className="my-2 text-xs truncate text-neutral-600 dark:text-neutral-400">
        {`${dayjs(post.metadata.publishedAt).format("MMMM D, YYYY")} -
          ${post.metadata.summary} `}
      </p>
    </Link>
  );
}

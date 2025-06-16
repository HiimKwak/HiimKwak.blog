import { getNotePosts } from "../db/post";
import Link from "next/link";
import dayjs from "dayjs";

export const metadata = {
  title: "공책",
  description: "단상 모음집",
};

export default function Post() {
  const allPosts = getNotePosts()
    .sort(
      (a, b) =>
        new Date(a.metadata.publishedAt).getTime() -
        new Date(b.metadata.publishedAt).getTime()
    )
    .reverse();

  return (
    <div className="py-4">
      <div className="flex flex-col divide-y rounded-lg divide-slate-200 dark:divide-gray-700">
        {allPosts.map((post) => (
          <PostCard {...post} key={post.slug} />
        ))}
      </div>
    </div>
  );
}

function PostCard(post: ReturnType<typeof getNotePosts>[0]) {
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

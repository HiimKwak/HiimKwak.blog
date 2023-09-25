import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import PostCard from "@/src/components/post/PostCard";

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="flex flex-col gap-2 p-4">
      {posts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </div>
  );
}

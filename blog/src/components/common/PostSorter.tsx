import PostCard from "@/src/components/post/PostCard";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

const PostSorter = ({ category }: { category: string }) => {
  const posts = allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .filter((post) => post._raw.sourceFileDir.includes(category));

  return (
    <div className="flex flex-col m-4 bg-white divide-y rounded-lg divide-slate-200">
      {posts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </div>
  );
};

export default PostSorter;

import PostCard from "@/src/components/post/PostCard";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

const PostSorter = ({
  category,
  header,
}: {
  category: string;
  header?: boolean;
}) => {
  const posts = allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .filter((post) => post._raw.sourceFileDir.includes(category));

  return (
    <>
      {header && (
        <div className="text-[2rem] font-bold tracking-tight my-4">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </div>
      )}

      <div className="flex flex-col bg-white divide-y rounded-lg divide-slate-200">
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </>
  );
};

export default PostSorter;

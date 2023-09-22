import Link from "next/link";
import { Post } from "contentlayer/generated";

import PostTags from "./PostTags";
import PostTime from "./PostTime";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Link href={post.url} key={post._id} className="w-full pb-4">
      <div className="text-xl font-bold">{post.title}</div>
      <div className="text-base text-slate-500">{post.description}</div>
      <div className="flex items-baseline justify-between gap-4 mt-1">
        {post.tags && <PostTags tags={post.tags} />}
        <PostTime date={post.date} readingTime={post.readingTime} />
      </div>
    </Link>
  );
};

export default PostCard;

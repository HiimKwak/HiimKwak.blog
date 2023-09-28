import Link from "next/link";
import { Post } from "contentlayer/generated";

import PostTags from "./PostTags";
import PostTime from "./PostTime";

const PostCard = ({ post }: { post: Post }) => {
  const postTags = post.tags.filter((tag) => tag !== null);
  console.log(postTags);
  return (
    <Link
      href={post.url}
      key={post._id}
      className="grid w-full grid-cols-1 gap-1 p-4"
    >
      <div className="text-xl font-bold">{post.title}</div>
      <div className="text-base truncate text-slate-500">
        {post.description}
      </div>
      <div className="flex items-start justify-between gap-12 overflow-x-auto">
        <PostTime date={post.date} readingTime={post.readingTime} />
        <PostTags tags={postTags} />
      </div>
    </Link>
  );
};

export default PostCard;

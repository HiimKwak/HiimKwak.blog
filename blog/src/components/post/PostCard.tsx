import Link from 'next/link';
import { Post } from 'contentlayer/generated';

import PostTags from './PostTags';
import PostTime from './PostTime';

const PostCard = ({ post }: { post: Post }) => {
  const postTags = post.tags.filter((tag) => tag !== null);

  return (
    <Link
      href={post.url}
      key={post._id}
      className='grid w-full grid-cols-1 p-4 pb-3'
    >
      <div className='text-xl'>{post.title}</div>
      <div className='text-[0.9rem] truncate text-neutral-600 dark:text-neutral-400'>
        {post.description}
      </div>
      <div className='flex items-start justify-between gap-12 overflow-x-auto'>
        <PostTime date={post.date} readingTime={post.readingTime} />
        <PostTags tags={postTags} />
      </div>
    </Link>
  );
};

export default PostCard;

import { getBlogPosts } from '../db/post';
import Link from 'next/link';
import dayjs from 'dayjs';
// import { Suspense } from 'react';
// import ViewCounter from './view-counter';
// import { getViewsCount } from 'app/db/queries';

export const metadata = {
  title: '포스트',
  description: '소프트웨어 개발, 인생에 대한 제 생각들입니다.',
};

export default function Post() {
  let allPosts = getBlogPosts()
    .sort(
      (a, b) =>
        new Date(a.metadata.publishedAt).getTime() -
        new Date(b.metadata.publishedAt).getTime()
    )
    .reverse();

  return (
    <>
      <div className='text-[2.5rem] font-semibold tracking-tight'>
        개발 이야기
      </div>
      <div className='py-4'>
        <div className='flex flex-col divide-y rounded-lg divide-slate-200 dark:divide-gray-700'>
          {allPosts.map((post) => (
            <PostCard {...post} key={post.slug} />
          ))}
        </div>
      </div>
    </>
  );
}

function PostCard(post: ReturnType<typeof getBlogPosts>[0]) {
  return (
    <Link href={`/post/${post.slug}`} className='min-w-0 py-4 pb-3'>
      <p className='text-xl font-semibold'>{post.metadata.title}</p>
      <p className='my-2 text-xs truncate text-neutral-600 dark:text-neutral-400'>
        {`${dayjs(post.metadata.publishedAt).format('MMMM D, YYYY')} -
          ${post.metadata.summary} `}
      </p>
    </Link>
  );
}

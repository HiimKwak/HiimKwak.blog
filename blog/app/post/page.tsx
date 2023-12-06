import { getBlogPosts } from '../db/post';
import Link from 'next/link';
import IconText from '../components/common/icon-text';
import { IcCalendar } from '../assets/icons';
import dayjs from 'dayjs';

export const metadata = {
  title: '포스트',
  description: '소프트웨어 개발에 대한 제 생각을 읽어보세요.',
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
        <div className='flex flex-col bg-white divide-y rounded-lg divide-slate-200'>
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
    <Link href={post.slug} className='grid w-full grid-cols-1 p-4 pb-3'>
      <div className='text-xl'>{post.metadata.title}</div>
      <div className='text-[0.9rem] truncate text-neutral-600 dark:text-neutral-400'>
        {post.metadata.summary}
      </div>
      <div className='flex items-start justify-between gap-12 overflow-x-auto'>
        <PostTime date={post.metadata.publishedAt} />
      </div>
    </Link>
  );
}

function PostTime({ date }: { date: string }) {
  return (
    <div className='flex items-center h-6 gap-2 text-neutral-600 dark:text-neutral-400 whitespace-nowrap'>
      <IconText Icon={IcCalendar} text={dayjs(date).format('YY.MM.DD')} />
    </div>
  );
}

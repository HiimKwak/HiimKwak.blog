import PostCard from '@/src/components/post/PostCard';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

type CategoryKeys = 'blog' | 'life' | 'memo';
type Categories = {
  [key in CategoryKeys]: string;
};

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

  const CATEGORIES: Categories = {
    blog: '개발 이야기',
    life: '일상',
    memo: '메모',
  };

  return (
    <div className='py-4'>
      {header && (
        <div className='text-[1.5rem] tracking-tight mb-4'>
          {CATEGORIES[category as CategoryKeys]}
        </div>
      )}

      <div className='flex flex-col bg-white divide-y rounded-lg divide-slate-200'>
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default PostSorter;

import { allPosts } from '@/.contentlayer/generated';
import PostSorter from '@/src/components/post/PostSorter';

export default function Home() {
  let categories: string[] = [];
  allPosts.map((post) => {
    {
      !categories.includes(post.category) && categories.push(post.category);
    }
  });
  categories.sort();

  return (
    <>
      <div className='text-[2.5rem] font-semibold tracking-tight'>최근</div>
      {categories.map((category) => (
        <div key={category}>
          <PostSorter category={category} header={true} />
        </div>
      ))}
    </>
  );
}

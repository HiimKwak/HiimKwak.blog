import { allPosts } from '@/.contentlayer/generated';
import PostSorter from '@/src/components/common/PostSorter';

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
      <div className='text-[3rem] font-extrabold tracking-tight'>Latest</div>
      {categories.map((category) => (
        <div key={category}>
          <PostSorter category={category} header={true} />
        </div>
      ))}
    </>
  );
}

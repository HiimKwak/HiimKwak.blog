import PostSorter from '@/src/components/post/PostSorter';

const Blog = () => {
  return (
    <>
      <div className='text-[2.5rem] font-semibold tracking-tight'>
        개발 이야기
      </div>
      <PostSorter category='blog' />
    </>
  );
};

export default Blog;

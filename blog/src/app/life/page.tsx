import PostSorter from '@/src/components/post/PostSorter';

const Life = () => {
  return (
    <>
      <div className='text-[2.5rem] font-semibold tracking-tight'>일상</div>
      <PostSorter category='life' />
    </>
  );
};

export default Life;

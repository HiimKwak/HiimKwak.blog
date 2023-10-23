import PostSorter from '@/src/components/common/PostSorter';

const Memo = () => {
  return (
    <>
      <div className='text-[2.5rem] font-semibold tracking-tight'>메모</div>
      <PostSorter category='memo' />
    </>
  );
};

export default Memo;

'use client';

import Giscus from '@giscus/react';

export default function Comment() {
  return (
    <Giscus
      id='comments'
      repo='Hiimkwak/hiimkwak.blog'
      repoId='R_kgDOJ0U2lA'
      category='Comments'
      categoryId='DIC_kwDOJ0U2lM4Cbm96'
      mapping='title'
      reactionsEnabled='1'
      emitMetadata='0'
      inputPosition='top'
      theme='light'
      lang='ko'
      loading='lazy'
    />
  );
}

Comment.Skeleton = function Skeleton() {
  return (
    <div className='w-full h-80 flex flex-col gap-8 animate-pulse'>
      <div className='flex flex-auto flex-col justify-center'>
        <h4 className='w-8 rounded-lg bg-gray-600' />
        <div className='w-4 h-4 rounded-full bg-gray-600' />
      </div>
      <div className='flex flex-col gap-6'>
        <h4 className='w-8 rounded-lg bg-gray-600' />
        <div className='rounded-[0.25rem] border border-gray-400'>
          <div className='w-full h-11 bg-gray-500' />
          <div className='w-full h-32 m-2 bg-white'>
            <div className='min-h-[100px] border border-gray-400 rounded-[0.25rem] bg-gray-400' />
          </div>
          <div className='w-full h-8 m-2 bg-white'>
            <div className=' inline-flex flex-shrink-0 ms-auto'>
              <div className='rounded-[0.25rem] bg-green-700 w-32' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

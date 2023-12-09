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

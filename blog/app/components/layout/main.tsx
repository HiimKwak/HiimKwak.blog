'use client';

import { $ } from 'app/libs/core';
import { usePathname } from 'next/navigation';

export default function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main
      className={$(
        'p-4 flex justify-center mt-8',
        pathname.includes('/post') ? 'bg-white' : 'bg-ghostwhite-primary'
      )}
    >
      <div className='w-full'>{children}</div>
    </main>
  );
}

'use client';

import { usePathname } from 'next/navigation';

export default function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main
      className={`p-4 flex justify-center pt-[82px] ${
        pathname.includes('/posts') ? 'bg-white' : 'bg-ghostwhite-primary'
      }`}
    >
      <div className='w-full max-w-screen-lg'>{children}</div>
    </main>
  );
}

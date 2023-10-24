'use client';

import { usePathname } from 'next/navigation';

export default function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main
      className={`p-4 min-h-[82.7%] ${
        pathname.includes('/posts') ? 'bg-white' : 'bg-ghostwhite-primary'
      }`}
    >
      {children}
    </main>
  );
}

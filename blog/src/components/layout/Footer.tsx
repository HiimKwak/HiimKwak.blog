'use client';

import { usePathname } from 'next/navigation';
import pkg from '@/package.json';

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <footer
      className={`flex items-center justify-center h-16 text-neutral-400 dark:text-neutral-600 ${
        pathname.includes('/posts') ? 'bg-white' : 'bg-ghostwhite-primary'
      }`}
    >
      Copyright {year} HiimKwak. @{pkg.version}
    </footer>
  );
}

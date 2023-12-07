'use client';

import { motion, LayoutGroup } from 'framer-motion';
import { Suspense, useEffect } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import useIntersectionObserver from 'app/hooks/useIntersectionObserver';
import { $ } from 'app/libs/core';

const navItems = {
  '/': {
    name: '홈',
  },
  '/post': {
    name: '포스트',
  },
};

export default function Navbar() {
  useEffect(() => {
    const target = document.getElementById('header-flag');
    setTargetElement(target);
  }, []);

  const [setTargetElement, isIntersected] = useIntersectionObserver({});

  return (
    <aside
      className={$(
        '-ml-[8px] tracking-tight px-2 py-4 md:px-0',
        !isIntersected &&
          'bg-transparent border-b border-neutral-300 dark:border-gray-600 backdrop-blur-xl'
      )}
    >
      <div className='max-w-2xl md:mx-auto'>
        <LayoutGroup>
          <nav
            className='relative flex flex-row items-start px-4 pb-0 fade md:overflow-auto scroll-pr-6 md:relative md:px-0'
            id='nav'
          >
            <div className='flex flex-row pr-10 space-x-0'>
              <Suspense fallback={null}>
                {Object.entries(navItems).map(([path, { name }]) => {
                  return <NavItem key={path} path={path} name={name} />;
                })}
              </Suspense>
            </div>
          </nav>
        </LayoutGroup>
      </div>
    </aside>
  );
}

function NavItem({ path, name }: { path: string; name: string }) {
  let pathname = usePathname() || '/';
  if (pathname.includes('/post/')) {
    pathname = '/post';
  }
  let isActive = path === pathname;

  return (
    <Link
      key={path}
      href={path}
      className={$(
        'transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle',
        {
          'text-neutral-500': !isActive,
        }
      )}
    >
      <span className='relative px-2 py-1'>
        {name}
        {path === pathname ? (
          <motion.div
            className='absolute h-[1px] top-7 mx-2 inset-0 bg-sunglow dark:bg-gradient-to-r from-transparent to-sunglow'
            layoutId='sidebar'
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 30,
            }}
          />
        ) : null}
      </span>
    </Link>
  );
}

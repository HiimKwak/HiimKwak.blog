'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import DUCK_IMG from 'public/duck.jpeg';

import useIntersectionObserver from 'app/hooks/useIntersectionObserver';
import { $ } from 'app/libs/core';

interface NavLinkProps {
  title: string;
  link: string;
}

const NAV_LINKS: NavLinkProps[] = [
  { title: '홈', link: '/' },
  { title: '포스트', link: '/post' },
];

export default function Navbar() {
  useEffect(() => {
    const target = document.getElementById('header-flag');
    setTargetElement(target);
  }, []);

  const pathname = usePathname();
  const [setTargetElement, isIntersected] = useIntersectionObserver({});

  return (
    <nav
      className={$(
        'flex items-center p-4 justify-between',
        pathname.includes('/posts') ? 'bg-white' : 'bg-ghostwhite-primary',
        !isIntersected &&
          'bg-transparent border-b border-neutral-300 backdrop-blur-xl'
      )}
    >
      <Link href={'/'}>
        <Image
          src={DUCK_IMG}
          height={50}
          width={50}
          alt='home_btn'
          className={$(
            'rounded-full',
            pathname === '/' && 'shadow-[0_0_10px_2px] shadow-sunglow-primary'
          )}
        />
      </Link>
      <div className='flex items-center justify-center gap-2'>
        {NAV_LINKS.map(({ link, title }: NavLinkProps) => (
          <Link
            href={link}
            key={title}
            className={$(
              'p-2 text-sm transition text-secondary hover:text-highlight',
              pathname.includes(link || `posts/${link}`) && 'text-highlight'
            )}
          >
            {title}
          </Link>
        ))}
      </div>
    </nav>
  );
}

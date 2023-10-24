'use client';

import { useEffect, ComponentType } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import pkg from '@/package.json';
import { IcGithub } from '@/src/assets/icons';

import DUCK_IMG from '@/public/profile/duck.jpeg';
import IconText from '@/src/components/common/IconText';

import useIntersectionObserver from '@/src/hooks/useIntersectionObserver';

interface NavLinkProps {
  title: string;
  link: string;
  icon?: ComponentType;
}

const NAV_LINKS: NavLinkProps[] = [
  { title: '개발', link: '/blog' },
  { title: '일상', link: '/life' },
  { title: '메모', link: '/memo' },
  { title: '프로필', link: '/about' },
  { title: 'Github', link: `${pkg.author.social.github}`, icon: IcGithub },
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
      className={`flex items-center p-4 justify-between  ${
        pathname.includes('/posts') ? 'bg-white' : 'bg-ghostwhite-primary'
      } ${
        !isIntersected &&
        'bg-transparent border-b border-neutral-300 backdrop-blur-xl'
      }`}
    >
      <Link href={'/'}>
        <Image
          src={DUCK_IMG}
          height={50}
          width={50}
          alt='home_btn'
          className={`rounded-full ${
            pathname === '/' && 'shadow-[0_0_10px_2px] shadow-sunglow-primary'
          }`}
        />
      </Link>
      <div className='flex items-center justify-center gap-2'>
        {NAV_LINKS.map((route: NavLinkProps) => (
          <Link
            href={route.link}
            key={route.title}
            className={`p-2 text-sm transition text-secondary hover:text-highlight ${
              pathname.includes(route.link || `posts/${route.link}`) &&
              'text-highlight'
            }`}
          >
            {route.icon ? (
              <IconText
                Icon={IcGithub}
                IconSize={25}
                fill='hover:fill-sunglow-primary'
                className={
                  route.link === pathname
                    ? 'transition rounded-md  active:bg-secondary active:border-b-4 active:border-sunglow-primary'
                    : ''
                }
              />
            ) : (
              route.title
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import pkg from '@/package.json';
import { IcGithub } from '@/src/assets/icons';

import DUCK_IMG from '@/public/profile/duck.jpeg';
import IconText from '@/src/components/common/IconText';

interface NavLinkProps {
  title: string;
  link: string;
  icon?: React.ComponentType;
}

const NAV_LINKS: NavLinkProps[] = [
  { title: 'Blog', link: '/blog' },
  { title: 'Life', link: '/life' },
  { title: 'Memo', link: '/memo' },
  { title: 'About', link: '/about' },
  { title: 'Github', link: `${pkg.author.social.github}`, icon: IcGithub },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className='flex items-center justify-between'>
      <Link href={'/'}>
        <Image
          src={DUCK_IMG}
          height={50}
          width={50}
          alt='home_btn'
          className='rounded-full'
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

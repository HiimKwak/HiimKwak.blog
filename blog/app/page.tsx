import Image from 'next/image';
import { ComponentProps } from 'react';
import session from 'public/images/home/session.webp';
import badge from 'public/images/home/badge.webp';
import profile from 'public/images/home/profile.webp';
import hackathon from 'public/images/home/hackathon.webp';
import qt from 'public/images/home/qt.png';

export default function Page() {
  return (
    <section>
      <h1 className='mb-8 text-2xl font-medium tracking-tighter'>
        곽민규의 블로그에 오신 것을 환영합니다!
      </h1>
      <p className='prose prose-neutral dark:prose-invert'>
        저는 프론트엔드 개발자입니다. 깊이있는 개발자가 되기를 목표로 하고
        있습니다.
      </p>
      <div className='prose prose-neutral dark:prose-invert'>
        <p>
          <Badge href='https://react.dev'>
            <img
              alt='React logomark'
              src='/react-logo.svg'
              className='!mr-1 h-[14px] w-[14px]'
              width='14'
              height='14'
            />
            React
          </Badge>
          {`와 `}
          <Badge href='https://nextjs.org'>
            <img
              alt='Next.js logomark'
              src='/next-logo.svg'
              className='!mr-1'
              width='14'
              height='14'
            />
            Next.js
          </Badge>
          {`를 즐겨 사용하고 있습니다. 사람들이 쓰고싶은 서비스를 만들기를 좋아합니다.`}
        </p>
      </div>
      <div className='gap-4 my-8 columns-2 sm:columns-3'>
        <div className='relative h-40 mb-4'>
          <Image
            alt=''
            src={session}
            fill
            sizes='(max-width: 768px) 213px, 33vw'
            priority
            className='object-cover rounded-lg'
          />
        </div>
        <div className='relative mb-4 h-80 sm:mb-0'>
          <Image
            alt='badge'
            src={badge}
            fill
            sizes='(max-width: 768px) 213px, 33vw'
            priority
            className='rounded-lg object-cover object-[-16px] sm:object-center'
          />
        </div>
        <div className='relative h-40 sm:h-80 sm:mb-4'>
          <Image
            alt='Me standing on stage at Reactathon delivering the keynote'
            src={profile}
            fill
            sizes='(max-width: 768px) 213px, 33vw'
            priority
            className='object-cover object-top rounded-lg sm:object-center'
          />
        </div>
        <div className='relative h-40 mb-4 sm:mb-0'>
          <Image
            alt='Me standing on stage at SmashingConf giving a talk about my optimism for the web'
            src={hackathon}
            fill
            sizes='(max-width: 768px) 213px, 33vw'
            priority
            className='object-cover rounded-lg'
          />
        </div>
        <div className='relative h-40 mb-4'>
          <Image
            alt='Me and Guillermo Rauch on stage for Vercel Ship, answering questions from the Next.js community'
            src={qt}
            fill
            sizes='(max-width: 768px) 213px, 33vw'
            priority
            className='object-cover rounded-lg'
          />
        </div>
        {/* <div className='relative h-80'>
          <Image
            alt='My badge on top of a pile of badges from a Vercel meetup we held'
            src={meetups}
            fill
            sizes='(min-width: 768px) 213px, 33vw'
            priority
            className='object-cover rounded-lg'
          />
        </div> */}
      </div>
      <div className='prose prose-neutral dark:prose-invert'>
        <p>
          개발하는 것이 보람있고 즐겁습니다. 웹 개발의 미래가 무궁무진하다
          생각하고 이 분야에 기여하고 싶습니다.
        </p>
      </div>
      <ul className='flex flex-col mt-8 space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300'>
        <li>
          <a
            className='flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100'
            rel='noopener noreferrer'
            target='_blank'
            href='https://twitter.com/leeerob'
          >
            <ArrowIcon />
            <p className='ml-2 h-7'>follow me</p>
          </a>
        </li>
        <li>
          <a
            className='flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100'
            rel='noopener noreferrer'
            target='_blank'
            href='https://leerob.substack.com'
          >
            <ArrowIcon />
            <p className='ml-2 h-7'>get email updates</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

function Badge(props: ComponentProps<'a'>) {
  return (
    <a
      {...props}
      target='_blank'
      className='inline-flex items-center p-1 text-sm leading-4 no-underline border rounded border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
    />
  );
}

function ArrowIcon() {
  return (
    <svg
      width='12'
      height='12'
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z'
        fill='currentColor'
      />
    </svg>
  );
}

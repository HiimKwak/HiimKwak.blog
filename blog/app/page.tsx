import Image from 'next/image';
import { ComponentProps } from 'react';
import session from 'public/images/home/session.webp';
import badge from 'public/images/home/badge.webp';
import profile from 'public/images/home/profile.webp';
import hackathon from 'public/images/home/hackathon.webp';
import Link from 'next/link';

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

export default function Page() {
  return (
    <section>
      <h1 className='mb-8 text-2xl font-medium tracking-tighter'>
        개발자 곽민규의 블로그
      </h1>
      <p className='prose prose-neutral dark:prose-invert'>
        저는 프론트엔드 개발자입니다. 코딩 외의 기획, 디자인 등 비개발적
        요소에도 흥미를 느낍니다. 개발하는 전반적인 과정에 참여하는 것이 즐겁고
        보람찹니다. 무언가를 내 손으로 직접 만든다는 것이 이 직업의 가장 큰
        매력이라 생각합니다.
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
          {`를 즐겨 사용하고 있습니다. 사람들이 내가 만든 서비스를 사용해줄 때 쾌감을 느낍니다.`}
        </p>
      </div>
      <div className='gap-4 my-8 columns-2 sm:columns-3'>
        <div className='relative h-40 mb-4 sm:h-[21rem] sm:mb-0'>
          <Image
            alt='10기 멋사 중앙해커톤 당시 촬영한 내 팻말'
            src={badge}
            fill
            sizes='(max-width: 768px) 213px, 33vw'
            priority
            className='object-cover rounded-lg sm:object-center'
          />
        </div>
        <div className='relative h-40 sm:mb-4'>
          <Image
            alt='멋사 공통 세션에서 API를 주제로 발표하고 있는 내 모습'
            src={session}
            fill
            sizes='(max-width: 768px) 213px, 33vw'
            priority
            className='object-cover rounded-lg'
          />
        </div>
        <div className='relative h-40 mb-4 sm:mb-0'>
          <Image
            alt='프로팔 사진'
            src={profile}
            fill
            sizes='(max-width: 768px) 213px, 33vw'
            priority
            className='object-cover object-top rounded-lg sm:object-center'
          />
        </div>
        <div className='relative h-40 sm:h-[21rem] sm:mb-0'>
          <Image
            alt='11기 멋사 중앙해커톤 큐택 팀으로 참가한 당시 촬영한 인증샷'
            src={hackathon}
            fill
            sizes='(max-width: 768px) 213px, 33vw'
            priority
            className='object-cover rounded-lg'
          />
        </div>
      </div>
      <div className='prose prose-neutral dark:prose-invert'>
        <p>
          나영석같은 PD가 되고 싶어 미디어커뮤니케이션학부를 전공했으나 잘
          안맞아 소프트웨어를 직접 만들 수 있는 개발자로 전향했습니다. 제 천직인
          것 같습니다. 나이들어서는 뭐하고 있을지 모르겠지만 지금은 개발이 너무
          재밌습니다. 스스로를 프론트엔드에 가둬두고 싶지 않습니다. 실력있는
          엔지니어가 되는 것이 목표입니다🧑🏻‍💻
        </p>
        <p>
          철학이나 가치관이 뚜렷한 사람을 좋아합니다. 그런 사람들이 모인 집단에
          기여하고 싶습니다. 개인적으로는 건강한 신체가 좋은 경험의 전제가
          된다는 체덕지(體德智) 교육 사상을 좋아합니다.
        </p>
        <p>
          개발 외에는 핑거스타일 기타 연주, 게임, 축구, 맨몸운동, 러닝 등 각종
          운동을 좋아합니다. 최근에는 롤 마스터 티어를 향한 라스트 댄싱
          중입니다🕺🏻
        </p>
      </div>
      <ul className='flex flex-col mt-8 space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300'>
        <li>
          <a
            className='flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100'
            rel='noopener noreferrer'
            target='_blank'
            href='https://github.com/hiimkwak'
          >
            <ArrowIcon />
            <p className='ml-2 h-7'>깃허브로 이동</p>
          </a>
        </li>
        <li>
          <Link
            className='flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100'
            href='about'
          >
            <ArrowIcon />
            <p className='ml-2 h-7'>이력 보기</p>
          </Link>
        </li>
      </ul>
    </section>
  );
}

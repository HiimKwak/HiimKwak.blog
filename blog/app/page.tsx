import Image from "next/image";
import { ComponentProps } from "react";
import profile3 from "public/images/home/profile3.webp";
import profile2 from "public/images/home/profile2.webp";
import hackathon from "public/images/home/hackathon.webp";
import Link from "next/link";

function Badge(props: ComponentProps<"a">) {
  return (
    <a
      {...props}
      target="_blank"
      className="inline-flex items-center p-1 text-sm leading-4 no-underline border rounded border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
    />
  );
}

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Page() {
  return (
    <section className="mx-auto">
      <h1 className="mb-8 text-2xl font-medium tracking-tighter">
        곽민규의 블로그
      </h1>
      <p className="prose prose-neutral dark:prose-invert break-keep">
        저는 주니어 프론트엔드 개발자입니다. 사람들의 불편함을 해소하는 멋진
        무언가를 만드는 것에 재미를 느낍니다. 무작정 키보드를 두들기기보다
        사용자들과 깊게 소통해 실마리를 먼저 찾아내려 노력하고 있습니다.
        기술에만 치우치지 않고 세상과 잘 어우러질 수 있는 사람이 먼저 되고자
        합니다.
      </p>
      <div className="prose prose-neutral dark:prose-invert">
        <p className="break-keep">
          {`업무에서는 `}
          <Badge href="https://react.dev">
            <Image
              alt="React logo"
              src="/react-logo.svg"
              className="!mr-1"
              width="14"
              height="14"
            />
            React
          </Badge>
          {` 와 `}
          <Badge href="https://nextjs.org">
            <Image
              alt="Next.js logo"
              src="/next-logo.svg"
              className="!mr-1"
              width="14"
              height="14"
            />
            Next.js
          </Badge>
          {`, `}
          <Badge href="https://www.typescriptlang.org">
            <Image
              alt="TypeScript logo"
              src="/typescript-logo.png"
              className="!mr-1"
              width="14"
              height="14"
            />
            TypeScript
          </Badge>
          {` 등의 기술들을 사용하고 있습니다. 개인적으로는 `}
          <Badge href="https://namu.wiki/w/C(%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%20%EC%96%B8%EC%96%B4)#s-9">
            <Image
              alt="Clang logo"
              src="/clang-logo.svg"
              className="!mr-1"
              width="14"
              height="14"
            />
            C
          </Badge>
          {` 계열 언어에 관심이 있습니다.`}
        </p>
      </div>
      <div className="gap-4 my-8 px-auto columns-2 ">
        <div className="relative h-40 mb-4 sm:h-[21rem] sm:mb-0">
          <Image
            alt="11기 멋사 중앙해커톤 큐택 팀으로 참가한 당시 촬영한 인증샷"
            src={hackathon}
            fill
            sizes="(max-width: 768px) 213px, 45vw"
            priority
            className="object-cover rounded-lg"
          />
        </div>
        <div className="relative h-40 mb-4 sm:h-[21rem] sm:mb-0">
          <Image
            alt="profile2"
            src={profile2}
            fill
            sizes="(max-width: 768px) 213px, 45vw"
            priority
            className="object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          나영석같은 PD가 되고 싶어 미디어커뮤니케이션학부를 전공으로 선택했으나
          결국엔 개발자가 되었습니다. 현재 포트로직스라는 디지털 포워더 회사에서
          프론트엔드 개발자로 일하고 있습니다. 아날로그 방식의 업무 방식을
          똑똑하고 효율적인 디지털 기술로 수행할 수 있는 방법을 개발하고
          있습니다. 감사하게도 정말 좋은 팀원들과 함께 일하고 있으며 행복한
          회사생활을 유지하고 있습니다 :)
        </p>
        <p>
          흔들리지 않는 사람이 되고자 합니다. 경거망동하지 않으려 노력하지만
          가슴이 뛰는 일에는 과감하게 도전하기도 합니다. 건강한 신체가 좋은
          경험의 전제가 된다는 체덕지(體德智) 사상을 중요하게 여깁니다.
        </p>
        <p>
          개발 외에는 핑거스타일 기타 연주, 게임, 축구, 바디빌딩, 러닝, 수영 등
          각종 운동을 좋아합니다. 주로 정신에 온전히 집중할 수 있는 활동을
          즐겨합니다!
        </p>
      </div>
      <ul className="flex flex-col mt-8 space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/hiimkwak"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">깃허브로 이동</p>
          </a>
        </li>
        <li>
          <Link
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            href="about"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">이력 보기</p>
          </Link>
        </li>
      </ul>
    </section>
  );
}

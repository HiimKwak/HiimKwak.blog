import Image from "next/image";
import Link from "next/link";
import hackathon from "public/images/home/hackathon.webp";
import profile2 from "public/images/home/profile2.webp";
import type { ComponentProps } from "react";

function _Badge(props: ComponentProps<"a">) {
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
		<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
			<title>화살표 아이콘</title>
			<path
				d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export default function Page() {
	return (
		<section className="mx-auto max-w-2xl px-4 md:px-0">
			<div className="prose prose-neutral dark:prose-invert">
				<h2>곽민규</h2>
				<h4>꿈</h4>
				<p>
					예능 PD(
					<Link href="https://namu.wiki/w/%EB%82%98%EC%98%81%EC%84%9D">나영석</Link>) → 웹개발자 →
					게임 PD(
					<Link href="https://www.neowiz.com/media/story/17">최지원</Link>)
				</p>
				<h4>가치관</h4>
				<p>체덕지(體德智)</p>

				<h4>좋아하는 것:</h4>
				<ul>
					<li>핑거스타일 기타 연주</li>
					<li>게임</li>
					<li>운동(축구, 헬스, 복싱, 러닝, 수영, 맨몸운동)</li>
					<li>명작 뜯고씹고맛보고즐기기</li>
				</ul>
			</div>
			<div className="gap-4 my-8 px-auto columns-2 ">
				<div className="relative h-40 mb-4 sm:h-84 sm:mb-0">
					<Image
						alt="11기 멋사 중앙해커톤 큐택 팀으로 참가한 당시 촬영한 인증샷"
						src={hackathon}
						fill
						sizes="(max-width: 768px) 213px, 45vw"
						priority
						className="object-cover rounded-lg"
					/>
				</div>
				<div className="relative h-40 mb-4 sm:h-84 sm:mb-0">
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

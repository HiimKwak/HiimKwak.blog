"use client";

import useIntersectionObserver from "app/hooks/useIntersectionObserver";
import { LayoutGroup, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";
import { NAV_PATH } from "@/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/core";

const navItems = {
	left: {
		[NAV_PATH.home]: {
			name: "소개",
		},
		[NAV_PATH.post]: {
			name: "일상",
		},
		[NAV_PATH.notes]: {
			name: "공책",
		},
	},
	// right: {
	// 	"/about": {
	// 		name: "프로필",
	// 	},
	// 	"/github": {
	// 		name: "github",
	// 	},
	// },
} as const;

export function Navbar({
	sidebarTrigger,
}: {
	sidebarTrigger?: React.ReactNode;
}) {
	const [setTargetElement, isIntersected] = useIntersectionObserver({});
	useEffect(() => {
		const target = document.getElementById("header-flag");
		setTargetElement(target);
	}, [setTargetElement]);

	const isMobile = useIsMobile();

	return (
		<aside
			className={cn(
				"tracking-tight px-2 py-4 border-b border-neutral-300 dark:border-gray-600 z-100 bg-background dark:bg-neutral-900",
				"md:sticky md:top-0 md:w-full md:px-0",
				!isIntersected && "bg-transparent backdrop-blur-xl",
			)}
		>
			<div className="max-w-2xl md:mx-auto">
				<LayoutGroup>
					<nav
						className="flex px-4 pb-0 fade md:overflow-auto scroll-pr-6 md:relative md:px-0"
						id="nav"
					>
						<div className="flex w-full items-center -ml-[8px]">
							{sidebarTrigger && isMobile && (
								<div className="flex items-center">{sidebarTrigger}</div>
							)}
							<Suspense fallback={null}>
								<div className="flex space-x-0">
									{Object.entries(navItems.left).map(([path, { name }]) => (
										<NavItem key={path} path={path} name={name} />
									))}
								</div>
								{/* <div className="flex space-x-0">
									{Object.entries(navItems.right).map(([path, { name }]) => (
										<NavItem key={path} path={path} name={name} />
									))}
								</div> */}
							</Suspense>
						</div>
					</nav>
				</LayoutGroup>
			</div>
		</aside>
	);
}

function NavItem({ path, name }: { path: string; name: string }) {
	const pathname = usePathname() || "/";

	// '/' 경로는 정확히 일치할 때만 활성화
	// 다른 경로는 startsWith로 확인
	const isActive = path === "/" ? pathname === "/" : pathname.startsWith(path);

	const isGithub = path === "/github";
	const linkPath = isGithub ? "https://github.com/HiimKwak" : path;

	return (
		<Link
			key={path}
			href={linkPath}
			className={cn(
				"transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle",
				{
					"text-neutral-500": !isActive,
				},
			)}
		>
			<span className="relative px-2 py-1 text-center flex items-center">
				{isGithub ? (
					<Image
						alt="github-icon"
						src="/github-mark.svg"
						className="h-[14px] w-[14px]"
						width="14"
						height="14"
					/>
				) : (
					name
				)}
				{isActive ? (
					<motion.div
						className="absolute h-px top-7 mx-2 inset-0 bg-slate-700 dark:bg-linear-to-r from-transparent to-slate-400"
						layoutId="sidebar"
						transition={{
							type: "spring",
							stiffness: 350,
							damping: 30,
						}}
					/>
				) : null}
			</span>
		</Link>
	);
}

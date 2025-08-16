"use client";

import useIntersectionObserver from "app/hooks/useIntersectionObserver";
import { LayoutGroup, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";
import { cn } from "@/lib/core";
import { NAV_PATH } from "@/constants";

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
};

export function Navbar() {
	const [setTargetElement, isIntersected] = useIntersectionObserver({});
	useEffect(() => {
		const target = document.getElementById("header-flag");
		setTargetElement(target);
	}, [setTargetElement]);

	return (
		<aside
			className={cn(
				"-ml-[8px] tracking-tight px-2 py-4 md:px-0",
				!isIntersected &&
				"bg-transparent border-b border-neutral-300 dark:border-gray-600 backdrop-blur-xl",
				"sticky top-0 w-full z-10"
			)}
		>
			<div className="max-w-2xl md:mx-auto">
				<LayoutGroup>
					<nav
						className="flex px-4 pb-0 fade md:overflow-auto scroll-pr-6 md:relative md:px-0"
						id="nav"
					>
						<div className="flex w-full justify-between">
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
	let pathname = usePathname() || "/";
	if (pathname.includes("/post/")) {
		pathname = "/post";
	}
	const isActive = path === pathname;

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
				{path === pathname ? (
					<motion.div
						className="absolute h-[1px] top-7 mx-2 inset-0 bg-slate-700 dark:bg-gradient-to-r from-transparent to-slate-400"
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

"use client";

import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

export function Comment() {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		// 다크모드 감지
		const checkTheme = () => {
			const isDark =
				document.documentElement.classList.contains("dark") ||
				window.matchMedia("(prefers-color-scheme: dark)").matches;
			setTheme(isDark ? "dark" : "light");
		};

		checkTheme();

		// 다크모드 변경 감지
		const observer = new MutationObserver(checkTheme);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		// 미디어 쿼리 변경 감지
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		mediaQuery.addEventListener("change", checkTheme);

		return () => {
			observer.disconnect();
			mediaQuery.removeEventListener("change", checkTheme);
		};
	}, []);

	return (
		<Giscus
			id="comments"
			repo="Hiimkwak/hiimkwak.blog"
			repoId="R_kgDOJ0U2lA"
			category="Comments"
			categoryId="DIC_kwDOJ0U2lM4Cbm96"
			mapping="title"
			reactionsEnabled="1"
			emitMetadata="0"
			inputPosition="top"
			theme={theme}
			lang="ko"
			loading="lazy"
		/>
	);
}

Comment.Skeleton = function Skeleton() {
	return (
		<div className="w-full h-80 flex flex-col gap-8 animate-pulse">
			<div className="flex flex-auto flex-col justify-center">
				<h4 className="w-8 rounded-lg bg-gray-600" aria-label="로딩중" />
				<div className="w-4 h-4 rounded-full bg-gray-600" />
			</div>
			<div className="flex flex-col gap-6">
				<h4 className="w-8 rounded-lg bg-gray-600" aria-label="로딩중" />
				<div className="rounded-lg border border-gray-400">
					<div className="w-full h-11 bg-gray-500" />
					<div className="w-full h-32 m-2 bg-white">
						<div className="min-h-[100px] border border-gray-400 rounded-lg bg-gray-400" />
					</div>
					<div className="w-full h-8 m-2 bg-white">
						<div className=" inline-flex shrink-0 ms-auto">
							<div className="rounded-lg bg-green-700 w-32" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

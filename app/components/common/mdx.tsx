import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import React, {
	type ComponentProps,
	type ComponentPropsWithRef,
	type ReactNode,
	useId,
} from "react";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { highlight } from "sugar-high";
import CustomImage from "./image";

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
	const tableId = useId();

	const headers = data.headers.map((header) => (
		<th key={`${tableId}-header-${header}`}>{header}</th>
	));
	const rows = data.rows.map((row, rowIndex) => (
		<tr key={`${tableId}-row-${rowIndex}-${row.join("-")}`}>
			{row.map((cell, cellIndex) => (
				<td key={`${tableId}-cell-${rowIndex}-${cellIndex}-${cell}`}>{cell}</td>
			))}
		</tr>
	));

	return (
		<table>
			<thead>
				<tr>{headers}</tr>
			</thead>
			<tbody>{rows}</tbody>
		</table>
	);
}

function Youtube({ url, caption }: { url: string; caption?: string }) {
	const videoId = url.match(/[?&]v=([^&]+)/)?.[1] || url.split("/").pop();

	if (!videoId) {
		return (
			<div className="text-red-500">유효하지 않은 유튜브 URL입니다: {url}</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center gap-4 my-4 not-prose">
			<div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
				<iframe
					className="absolute top-0 left-0 w-full h-full rounded-lg"
					src={`https://www.youtube.com/embed/${videoId}`}
					title="YouTube video player"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			</div>
			{caption && (
				<span className="text-sm italic opacity-80 text-neutral-600 dark:text-neutral-300">
					{caption}
				</span>
			)}
		</div>
	);
}
Youtube.displayName = "Youtube";

function CustomLink({ href, ...props }: ComponentPropsWithRef<"a">) {
	if (href) {
		if (href.startsWith("/")) {
			return (
				<Link href={href} {...props}>
					{props.children}
				</Link>
			);
		}

		if (href.startsWith("#")) {
			return <a {...props} />;
		}
	}

	return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function Callout(props: { emoji: string; children: ReactNode }) {
	return (
		<div className="flex items-center p-1 px-4 py-3 mb-8 text-sm border rounded border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
			<div className="flex items-center w-4 mr-4">{props.emoji}</div>
			<div className="w-full callout">{props.children}</div>
		</div>
	);
}
Callout.displayName = "Callout";

function ProsCard({ title, pros }: { title: string; pros: string[] }) {
	return (
		<div className="w-full p-6 my-4 border border-emerald-200 dark:border-emerald-900 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
			<span>{`You might use ${title} if...`}</span>
			<div className="mt-4">
				{pros.map((pro) => (
					<div key={pro} className="flex items-baseline mb-2 font-medium">
						<div className="w-4 h-4 mr-2">
							<svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24">
								<title>check</title>
								<g
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
									<path d="M22 4L12 14.01l-3-3" />
								</g>
							</svg>
						</div>
						<span>{pro}</span>
					</div>
				))}
			</div>
		</div>
	);
}
ProsCard.displayName = "ProsCard";

function ConsCard({ title, cons }: { title: string; cons: string[] }) {
	return (
		<div className="w-full p-6 my-6 border border-red-200 dark:border-red-900 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
			<span>{`You might not use ${title} if...`}</span>
			<div className="mt-4">
				{cons.map((con) => (
					<div key={con} className="flex items-baseline mb-2 font-medium">
						<div className="w-4 h-4 mr-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="w-4 h-4 text-red-500"
							>
								<title>close</title>
								<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
							</svg>
						</div>
						<span>{con}</span>
					</div>
				))}
			</div>
		</div>
	);
}
ConsCard.displayName = "ConsCard";

function Code({
	children,
	...props
}: ComponentProps<"code"> & { children: string }) {
	const codeHTML = highlight(children);
	// biome-ignore lint/security/noDangerouslySetInnerHtml: ㅋㅋ
	return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str: string) {
	return str
		.toString()
		.toLowerCase()
		.trim() // Remove whitespace from both ends of a string
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(/&/g, "-and-") // Replace & with 'and'
		.replace(/[^\wㄱ-ㅎ가-힣-]+/g, "") // Remove all non-word characters except for -
		.replace(/--+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
	return ({ children }: { children: string }) => {
		const slug = slugify(children);
		return React.createElement(
			`h${level}`,
			{ id: slug },
			[
				React.createElement("a", {
					href: `#${slug}`,
					key: `link-${slug}`,
					className: "anchor",
				}),
			],
			children,
		);
	};
}

function ImageCarousel({ children }: { children: ReactNode }) {
	return <div className="not-prose">{children}</div>;
}
ImageCarousel.displayName = "ImageCarousel";

// MDX의 <p> 태그 커스터마이징 - 블록 레벨 요소가 있으면 Fragment로 렌더링
function CustomParagraph({ children }: { children: ReactNode }) {
	// 블록 레벨 컴포넌트 이름들
	const blockLevelComponents = [
		"Youtube",
		"Callout",
		"ProsCard",
		"ConsCard",
		"ImageCarousel",
		"div",
		"section",
		"article",
	];

	// children이 블록 레벨 컴포넌트인지 확인
	const hasBlockLevelChild = React.Children.toArray(children).some((child) => {
		if (React.isValidElement(child)) {
			const type = child.type;
			// 함수 컴포넌트의 경우 displayName이나 name 확인
			if (typeof type === "function") {
				const name =
					(type as { displayName?: string; name?: string }).displayName ||
					(type as { displayName?: string; name?: string }).name;
				return blockLevelComponents.includes(name || "");
			}
			// HTML 요소의 경우
			if (typeof type === "string") {
				return blockLevelComponents.includes(type);
			}
		}
		return false;
	});

	// 블록 레벨 요소가 있으면 Fragment로, 없으면 <p>로
	// biome-ignore lint/complexity/noUselessFragments: Fragment is needed to avoid wrapping block-level elements in <p>
	return hasBlockLevelChild ? <>{children}</> : <p>{children}</p>;
}

const components = {
	h1: createHeading(1),
	h2: createHeading(2),
	h3: createHeading(3),
	h4: createHeading(4),
	h5: createHeading(5),
	h6: createHeading(6),
	Image: CustomImage,
	ImageCarousel: ImageCarousel,
	a: CustomLink,
	p: CustomParagraph,
	Callout,
	ProsCard,
	ConsCard,
	code: Code,
	Table,
	Youtube,
};

export function CustomMDX(props) {
	return (
		<MDXRemote
			{...props}
			components={{ ...components, ...(props.components || {}) }}
			options={{
				...props.options,
				mdxOptions: {
					remarkPlugins: [remarkMath],
					rehypePlugins: [[rehypeKatex, { output: "mathml" }]], // ref: https://github.com/remarkjs/remark-math/issues/108#issuecomment-2621185520
				},
			}}
		/>
	);
}

import { CustomMDX } from "app/components/common/mdx";
import { getDiaryPosts } from "app/db/content/post";
import type { Metadata } from "next";

import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Comment } from "@/components/common/comment";
import { PostNavigator } from "@/components/common/post-navigator";
import { Views } from "@/components/common/views";
import { NAV_PATH } from "@/constants";

const CommentLazy = dynamic(
	() => import("@/components/common/comment").then((mod) => mod.Comment),
	{
		loading: () => <Comment.Skeleton />,
	},
);

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
	const { slug } = await params;
	const post = getDiaryPosts().find((post) => post.slug === slug);
	if (!post) {
		return;
	}

	const { title, publishedAt: publishedTime, summary: description, image } = post.metadata;

	let ogImage = `https://hiimkwak.blog/og?title=${encodeURIComponent(title)}`;
	if (image) {
		let imagePath = image.replace(/^public\//, "/");
		if (!imagePath.startsWith("/")) {
			imagePath = `/${imagePath}`;
		}
		if (!imagePath.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
			imagePath = `${imagePath}/img.png`;
		}
		ogImage = `https://hiimkwak.blog${imagePath}`;
	}

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "article",
			publishedTime,
			url: `https://hiimkwak.blog/post/${post.slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
	};
}

function formatDate(date: string) {
	const currentDate = new Date();
	const targetDate = new Date(date);

	const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
	const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
	const daysAgo = currentDate.getDate() - targetDate.getDate();

	let formattedDate = "";

	if (yearsAgo > 0) {
		formattedDate = `${yearsAgo}y ago`;
	} else if (monthsAgo > 0) {
		formattedDate = `${monthsAgo}mo ago`;
	} else if (daysAgo > 0) {
		formattedDate = `${daysAgo}d ago`;
	} else {
		formattedDate = "Today";
	}

	const fullDate = targetDate.toLocaleString("en-us", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	return `${fullDate} (${formattedDate})`;
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	const allPosts = getDiaryPosts().sort(
		(a, _b) =>
			new Date(a.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
	);

	const postIdx = allPosts.findIndex((post) => post.slug === slug);
	const post = allPosts[postIdx];
	const prev = postIdx === 0 ? null : allPosts[postIdx - 1];
	const next = postIdx === allPosts.length - 1 ? null : allPosts[postIdx + 1];

	if (!post) {
		notFound();
	}

	return (
		<section className="mx-auto max-w-2xl px-4 md:px-0">
			<h1 className="font-medium text-2xl tracking-tighter w-full break-keep pt-4">
				{post.metadata.title}
			</h1>
			<div className="flex justify-between items-center mt-2 mb-8 text-sm w-full">
				<p className="text-sm text-neutral-600 dark:text-neutral-400">
					{formatDate(post.metadata.publishedAt)}
				</p>
				<Suspense fallback={<p className="h-5" />}>
					<Views slug={post.slug} />
				</Suspense>
			</div>

			<article className="prose prose-quoteless prose-neutral dark:prose-invert w-full">
				<CustomMDX source={post.content} />
			</article>

			<footer className="mt-8 w-full border-t border-neutral-300 dark:border-gray-600 py-4">
				<div className="my-4">
					<CommentLazy />
				</div>
				<PostNavigator basePath={NAV_PATH.post} prev={prev} next={next} />
			</footer>
		</section>
	);
}

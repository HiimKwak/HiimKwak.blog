import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getAllNotePaths, getNoteByPath } from "@/db/content/note";
import { NoteContent } from "./note-content";
import { NoteLoading } from "./note-loading";

export async function generateStaticParams() {
	const allPaths = getAllNotePaths();
	// 최근 50개만 SSG
	return allPaths.slice(0, 50).map((path) => ({
		slug: path,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string[] }>;
}): Promise<Metadata | undefined> {
	const { slug } = await params;
	const decodedSlug = slug.map((segment) => decodeURIComponent(segment));
	const note = getNoteByPath(decodedSlug);

	if (!note) {
		return;
	}

	const {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
		tags,
	} = note.metadata;

	const noteUrl = `/notes/${decodedSlug.join("/")}`;

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
		keywords: tags,
		authors: [{ name: "HiimKwak" }],
		openGraph: {
			title,
			description,
			type: "article",
			publishedTime,
			url: `https://hiimkwak.blog${noteUrl}`,
			siteName: "HiimKwak.blog",
			locale: "ko_KR",
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		alternates: {
			canonical: `https://hiimkwak.blog${noteUrl}`,
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
	};
}

export default async function NotePage({
	params,
}: {
	params: Promise<{ slug: string[] }>;
}) {
	const { slug } = await params;

	// URL 디코딩 처리
	const decodedSlug = slug.map((segment) => decodeURIComponent(segment));
	const note = getNoteByPath(decodedSlug);

	if (!note) {
		notFound();
	}

	return (
		<div className="w-full">
			<Suspense fallback={<NoteLoading />}>
				<NoteContent note={note} slug={decodedSlug} />
			</Suspense>
		</div>
	);
}

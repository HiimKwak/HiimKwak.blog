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

export default async function NotePage({ params }: { params: Promise<{ slug: string[] }> }) {
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

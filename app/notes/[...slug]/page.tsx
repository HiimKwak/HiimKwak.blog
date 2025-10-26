import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CustomMDX } from "@/components/common/mdx";
import { PostNavigator } from "@/components/common/post-navigator";
import { Skeleton } from "@/components/ui/skeleton";
import { NAV_PATH } from "@/constants";
import { getNoteByPath, getNotes, type NoteTree } from "@/db/content/note";
import type { MDXData } from "@/db/content/utils";

function flattenNotes(
	noteTree: NoteTree,
	currentPath: string[] = [],
): Array<{
	note: MDXData;
	fullPath: string[];
}> {
	const result: Array<{
		note: MDXData;
		fullPath: string[];
	}> = [];

	// 현재 폴더의 노트들 추가
	for (const note of noteTree.notes) {
		result.push({
			note,
			fullPath: [...currentPath, note.slug],
		});
	}

	// 하위 폴더들 재귀적으로 탐색
	for (const child of noteTree.children) {
		result.push(...flattenNotes(child, [...currentPath, child.folderName]));
	}

	return result;
}

function findAdjacentNotes(
	noteTree: NoteTree,
	targetPath: string[],
): { prev: MDXData | null; next: MDXData | null } {
	const allNotes = flattenNotes(noteTree);

	allNotes.sort((a, b) => {
		const dateA = new Date(a.note.metadata.publishedAt || "1970-01-01");
		const dateB = new Date(b.note.metadata.publishedAt || "1970-01-01");
		return dateB.getTime() - dateA.getTime();
	});

	const currentIndex = allNotes.findIndex(
		(item) => item.fullPath.join("/") === targetPath.join("/"),
	);

	if (currentIndex === -1) {
		return { prev: null, next: null };
	}

	const prev =
		currentIndex < allNotes.length - 1
			? {
					...allNotes[currentIndex + 1].note,
					slug: allNotes[currentIndex + 1].fullPath.join("/"),
				}
			: null;

	const next =
		currentIndex > 0
			? {
					...allNotes[currentIndex - 1].note,
					slug: allNotes[currentIndex - 1].fullPath.join("/"),
				}
			: null;

	return { prev, next };
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

const NoteContent = async ({
	note,
	slug,
}: {
	note: MDXData;
	slug: string[];
}) => {
	const noteTree = getNotes();

	return (
		<section className="max-w-3xl mx-auto">
			<article className="prose prose-neutral dark:prose-invert max-w-none p-4">
				<header className="mb-8">
					<h1 className="text-2xl font-bold mb-2">{note.metadata.title}</h1>
					<div className="flex justify-between items-center">
						{note.metadata.publishedAt && (
							<time className="text-sm text-neutral-500 dark:text-neutral-400">
								{new Date(note.metadata.publishedAt).toLocaleDateString(
									"ko-KR",
								)}
							</time>
						)}
					</div>
				</header>

				<CustomMDX source={note.content} />

				<footer className="mt-8 w-full border-t border-neutral-300 dark:border-gray-600 py-4">
					<PostNavigator
						basePath={NAV_PATH.notes}
						{...findAdjacentNotes(noteTree, slug)}
					/>
				</footer>
			</article>
		</section>
	);
};

const NoteLoading = () => {
	return (
		<div className="w-full">
			<div className="h-16 border-b border-neutral-300" />

			<div className="flex flex-col gap-8 p-6">
				<div className="space-y-2">
					<Skeleton className="h-8 w-96" />
					<Skeleton className="h-2 w-24" />
				</div>

				<div className="space-y-4">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
				</div>

				<div className="space-y-4">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-1/5" />
				</div>

				<div className="space-y-4">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-2/5" />
				</div>

				<div className="space-y-4">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-4/5" />
				</div>
			</div>
		</div>
	);
};

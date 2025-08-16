import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/common/mdx";
import { getNoteByPath } from "@/db/content/note";
import { Navbar } from "@/components/layout/nav";
import { Suspense } from "react";
import { Views } from "@/components/common/views";
import { PostNavigator } from "@/components/common/post-navigator";
import { NAV_PATH } from "@/constants";
import { getNotes, type NoteTree } from "@/db/content/note";
import { MDXData } from "@/db/content/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";

function flattenNotes(noteTree: NoteTree, currentPath: string[] = []): Array<{
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
			fullPath: [...currentPath, note.slug]
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
	targetPath: string[]
): { prev: MDXData | null; next: MDXData | null } {
	const allNotes = flattenNotes(noteTree);

	allNotes.sort((a, b) => {
		const dateA = new Date(a.note.metadata.publishedAt || '1970-01-01');
		const dateB = new Date(b.note.metadata.publishedAt || '1970-01-01');
		return dateB.getTime() - dateA.getTime();
	});

	const currentIndex = allNotes.findIndex(item =>
		item.fullPath.join('/') === targetPath.join('/')
	);

	if (currentIndex === -1) {
		return { prev: null, next: null };
	}

	const prev = currentIndex < allNotes.length - 1 ? {
		...allNotes[currentIndex + 1].note,
		slug: allNotes[currentIndex + 1].fullPath.join('/')
	} : null;

	const next = currentIndex > 0 ? {
		...allNotes[currentIndex - 1].note,
		slug: allNotes[currentIndex - 1].fullPath.join('/')
	} : null;

	return { prev, next };
}

export async function generateStaticParams() {
	const noteTree = getNotes();
	const allNotes = flattenNotes(noteTree);

	return allNotes.map((item) => ({
		slug: item.fullPath,
	}));
}

export default async function NotePage({
	params,
}: {
	params: { slug: string[] };
}) {
	// await 제거
	const { slug } = params;

	// URL 디코딩 처리
	const decodedSlug = slug.map((segment) => decodeURIComponent(segment));
	const note = getNoteByPath(decodedSlug);

	if (!note) {
		notFound();
	}

	const noteTree = getNotes();

	return (
		<div className="w-full">
			<Navbar sidebarTrigger={<SidebarTrigger />} />

			<section className="max-w-3xl mx-auto">
				<article className="prose prose-neutral dark:prose-invert max-w-none p-4">
					<header className="mb-8">
						<h1 className="text-2xl font-bold mb-2">{note.metadata.title}</h1>
						<div className="flex justify-between items-center">
							{note.metadata.publishedAt && (
								<time className="text-sm text-neutral-500 dark:text-neutral-400">
									{new Date(note.metadata.publishedAt).toLocaleDateString("ko-KR")}
								</time>
							)}
							<Suspense fallback={<p className="h-5" />}>
								<Views slug={note.slug} className='text-sm text-neutral-500 dark:text-neutral-400' />
							</Suspense>
						</div>
					</header>

					<CustomMDX source={note.content} />

					<footer className="mt-8 w-full border-t border-neutral-300 dark:border-gray-600 py-4">
						<PostNavigator basePath={NAV_PATH.notes} {...findAdjacentNotes(noteTree, decodedSlug)} />
					</footer>
				</article>
			</section>
		</div>
	);
}

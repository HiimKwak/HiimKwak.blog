import { redirect } from "next/navigation";
import { getNotes, type NoteTree } from "@/db/content/note";
import type { MDXData } from "@/db/content/utils";

// 최신 노트를 찾는 함수
function findLatestNote(tree: NoteTree): MDXData | null {
	let latestNote: MDXData | null = null;
	let latestDate = new Date(0);

	const traverse = (node: NoteTree) => {
		// 현재 노드의 노트들 확인
		node.notes.forEach((note) => {
			if (note.metadata.publishedAt) {
				const noteDate = new Date(note.metadata.publishedAt);
				if (noteDate > latestDate) {
					latestDate = noteDate;
					latestNote = note;
				}
			}
		});

		// 자식 노드들도 확인
		node.children.forEach((child) => traverse(child));
	};

	traverse(tree);
	return latestNote;
}

// 최신 노트의 전체 경로를 찾는 함수
function findNotePath(
	tree: NoteTree,
	targetSlug: string,
	currentPath: string[] = [],
): string[] | null {
	// 현재 노드의 노트들 확인
	for (const note of tree.notes) {
		if (note.slug === targetSlug) {
			return [...currentPath, note.slug];
		}
	}

	// 자식 노드들 확인
	for (const child of tree.children) {
		const result = findNotePath(child, targetSlug, [
			...currentPath,
			child.folderName,
		]);
		if (result) return result;
	}

	return null;
}

export default function NotesPage() {
	const notes = getNotes();
	const latestNote = findLatestNote(notes);

	if (!latestNote) {
		// 노트가 없으면 404
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">노트가 없습니다</h1>
					<p className="text-neutral-600 dark:text-neutral-400">
						아직 작성된 노트가 없습니다.
					</p>
				</div>
			</div>
		);
	}

	// 최신 노트의 경로 찾기
	const notePath = findNotePath(notes, latestNote.slug);

	if (!notePath) {
		// 경로를 찾을 수 없으면 404
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">노트를 찾을 수 없습니다</h1>
					<p className="text-neutral-600 dark:text-neutral-400">
						노트 경로를 찾을 수 없습니다.
					</p>
				</div>
			</div>
		);
	}

	// 최신 노트로 리다이렉트
	redirect(`/notes/${notePath.join("/")}`);
}

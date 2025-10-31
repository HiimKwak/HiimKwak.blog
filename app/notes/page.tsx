import { Suspense } from "react";
import { getLatestNote } from "@/db/content/note";
import { NoteContent } from "./[...slug]/note-content";
import { NoteLoading } from "./[...slug]/note-loading";

async function LatestNoteContent() {
	const latestNoteData = getLatestNote();

	if (!latestNoteData) {
		return (
			<div className="w-full max-w-3xl mx-auto p-4">
				<p className="text-neutral-500">노트가 없습니다</p>
			</div>
		);
	}

	return <NoteContent slug={latestNoteData.path} />;
}

export default function NotesIndexPage() {
	return (
		<div className="w-full">
			<Suspense fallback={<NoteLoading />}>
				<LatestNoteContent />
			</Suspense>
		</div>
	);
}

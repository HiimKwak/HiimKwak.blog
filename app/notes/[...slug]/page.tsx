import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/common/mdx";
import { getNoteByPath } from "@/db/content/note";
import { NoteHeader } from "../note-header";

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
		<div className="h-screen w-full max-w-xl mx-auto">
			<NoteHeader />
			<article className="prose prose-neutral dark:prose-invert max-w-none p-4">
				<header className="mb-8">
					<h1 className="text-2xl font-bold mb-2">{note.metadata.title}</h1>
					{note.metadata.publishedAt && (
						<time className="text-sm text-neutral-500 dark:text-neutral-400">
							{new Date(note.metadata.publishedAt).toLocaleDateString("ko-KR")}
						</time>
					)}
				</header>
				<CustomMDX source={note.content} />
			</article>
		</div>
	);
}

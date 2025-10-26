import { CustomMDX } from "@/components/common/mdx";
import { PostNavigator } from "@/components/common/post-navigator";
import { NAV_PATH } from "@/constants";
import { getAdjacentNotes } from "@/db/content/note";
import type { MDXData } from "@/db/content/utils";

export async function NoteContent({ note, slug }: { note: MDXData; slug: string[] }) {
	const { prev, next } = getAdjacentNotes(slug);

	return (
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
					</div>
				</header>

				<CustomMDX source={note.content} />

				<footer className="mt-8 w-full border-t border-neutral-300 dark:border-gray-600 py-4">
					<PostNavigator basePath={NAV_PATH.notes} prev={prev} next={next} />
				</footer>
			</article>
		</section>
	);
}

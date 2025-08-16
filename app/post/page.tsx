import dayjs from "dayjs";
import Link from "next/link";
import { Navbar } from "@/components/layout/nav";
import { getDiaryPosts } from "../db/content/post";

export const metadata = {
	title: "일상",
	description: "곽민규의 생각",
};

export default function Post() {
	const allPosts = getDiaryPosts()
		.sort(
			(a, b) =>
				new Date(a.metadata.publishedAt).getTime() -
				new Date(b.metadata.publishedAt).getTime(),
		)
		.reverse();

	return (
		<>
			<Navbar />

			<div className="mx-auto max-w-2xl px-4 md:px-0">
				<div className="flex flex-col rounded-lg">
					{allPosts.map((post) => (
						<PostCard {...post} key={post.slug} />
					))}
				</div>
			</div>
		</>
	);
}

function PostCard(post: ReturnType<typeof getDiaryPosts>[0]) {
	return (
		<Link
			href={`/post/${post.slug}`}
			className="min-w-0 py-2 md:py-4 md:inline-flex md:justify-between"
		>
			<p className="text-xl font-medium">{post.metadata.title}</p>
			<p className="my-2 text-xs truncate text-neutral-600 dark:text-neutral-400">
				{dayjs(post.metadata.publishedAt).format("YYYY. MM. DD")}
			</p>
		</Link>
	);
}

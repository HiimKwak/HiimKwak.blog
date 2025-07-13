import type { Metadata } from "next";
import { getDiaryPosts } from "app/db/content/post";
import { notFound } from "next/navigation";
import { Suspense, cache } from "react";
import { CustomMDX } from "app/components/common/mdx";
import { getViewsCount } from "app/db/queries";
import { increment } from "app/db/actions";
import ViewCounter from "../view-counter";
import Comment from "./comment";
import Link from "next/link";

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

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image
    ? `https://hiimkwak.blog${image}`
    : `https://hiimkwak.blog/og?title=${title}`;

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
    // twitter: {
    //   card: 'summary_large_image',
    //   title,
    //   description,
    //   images: [ogImage],
    // },
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

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const allPosts = getDiaryPosts().sort(
    (a, b) =>
      new Date(a.metadata.publishedAt).getTime() -
      new Date(b.metadata.publishedAt).getTime()
  );

  const postIdx = allPosts.findIndex((post) => post.slug === slug);
  const post = allPosts[postIdx];
  const prev = postIdx === 0 ? null : allPosts[postIdx - 1];
  const next = postIdx === allPosts.length ? null : allPosts[postIdx + 1];

  if (!post) {
    notFound();
  }

  return (
    <section className="flex flex-col justify-center mx-auto max-w-2xl px-4 md:px-0">
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
          <Comment />
        </div>
        <Navigator prev={prev} next={next} />
      </footer>
    </section>
  );
}

const incrementViews = cache(increment);

async function Views({ slug }: { slug: string }) {
  const views = await getViewsCount();
  process.env.NODE_ENV === "production" && incrementViews(slug);
  return <ViewCounter allViews={views} slug={slug} />;
}

function Navigator({
  prev,
  next,
}: {
  prev: null | ReturnType<typeof getDiaryPosts>[0];
  next: null | ReturnType<typeof getDiaryPosts>[0];
}) {
  return (
    <div className="flex justify-between my-8 text-sm">
      {prev?.metadata.title ? (
        <Link href={`/post/${prev.slug}`} className="flex items-center gap-1">
          <CaretLeft />
          {prev.metadata.title}
        </Link>
      ) : (
        <span className="text-gray-700">이전 글이 없습니다.</span>
      )}

      {next?.metadata.title ? (
        <Link href={`/post/${next.slug}`} className="flex items-center gap-1">
          {next.metadata.title}
          <CaretRight />
        </Link>
      ) : (
        <span className="text-gray-500">다음 글이 없습니다.</span>
      )}
    </div>
  );
}

function CaretLeft() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>왼쪽 화살표</title>
      <path
        d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CaretRight() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>오른쪽 화살표</title>
      <path
        d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

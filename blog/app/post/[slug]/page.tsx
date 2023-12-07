import { Metadata } from 'next';
import { getBlogPosts } from 'app/db/post';
import { notFound } from 'next/navigation';
import { Suspense, cache } from 'react';
import { CustomMDX } from 'app/components/common/mdx';
import { getViewsCount } from 'app/db/queries';
import { increment } from 'app/db/actions';
import ViewCounter from '../view-counter';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? `https://hiimkwak.blog${image}`
    : `https://hiimkwak.blog/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
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
  let currentDate = new Date();
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = '';

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = 'Today';
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return `${fullDate} (${formattedDate})`;
}

export default function Post({ params }: { params: { slug: string } }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <h1 className='title font-medium text-2xl tracking-tighter max-w-[650px]'>
        {post.metadata.title}
      </h1>
      <div className='flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]'>
        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
          {formatDate(post.metadata.publishedAt)}
        </p>
        <Suspense fallback={<p className='h-5' />}>
          <Views slug={post.slug} />
        </Suspense>
      </div>
      <article className='prose prose-quoteless prose-neutral dark:prose-invert'>
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}

let incrementViews = cache(increment);

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();
  incrementViews(slug);
  return <ViewCounter allViews={views} slug={slug} />;
}

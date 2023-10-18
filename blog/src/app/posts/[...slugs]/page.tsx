import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { getMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import PostTime from '@/src/components/post/PostTime';
import Image from 'next/image';

const mdxComponents: MDXComponents = {
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  img: ({ src, alt, width, height }) => (
    <Image
      src={src as string}
      alt={alt as string}
      width={(width as number) || 350}
      height={(height as number) || 300}
    />
  ),
  ImageCarousel: ({ children }: { children: React.ReactNode }) => (
    <div className='flex overflow-auto'>{children}</div>
  ),
};

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({
  params,
}: {
  params: { slugs: string[] };
}) => {
  const slug = [...params.slugs].join('/');
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);

  if (!post) notFound();
  return { title: post.title };
};

export default function Post({ params }: { params: { slugs: string[] } }) {
  // console.log(params); => { slugs: [ 'memo', 'difference_between_engineer_and_coder' ] }
  const url = `/posts/${[...params.slugs].join('/')}`;
  const post = allPosts.find((post) => post.url === url);
  if (!post) return;

  const MDXContent = getMDXComponent(post.body.code);

  return (
    <div className='w-full prose dark:prose-dark'>
      <div className='grid gap-4 auto-rows-auto'>
        <div className='flex justify-center'>
          <PostTime date={post.date} readingTime={post.readingTime} />
        </div>
        <h1>{post.title}</h1>
      </div>

      <MDXContent components={mdxComponents} />
    </div>
  );
}

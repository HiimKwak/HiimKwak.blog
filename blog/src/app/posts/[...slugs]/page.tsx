import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { getMDXComponent } from "next-contentlayer/hooks";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const mdxComponents: MDXComponents = {
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
};

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({
  params,
}: {
  params: { slugs: string[] };
}) => {
  const slug = [...params.slugs].join("/");
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);

  if (!post) notFound();
  return { title: post.title };
};

export default function Post({ params }: { params: { slugs: string[] } }) {
  // console.log(params); => { slugs: [ 'memo', 'difference_between_engineer_and_coder' ] }
  const url = `/posts/${[...params.slugs].join("/")}`;
  const post = allPosts.find((post) => post.url === url);
  if (!post) return;

  const MDXContent = getMDXComponent(post.body.code);

  return (
    <div className="prose dark:prose-dark ">
      <div className="text-xl ">{post.title}</div>
      <MDXContent components={mdxComponents} />
    </div>
  );
}

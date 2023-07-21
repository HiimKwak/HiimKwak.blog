import RootLayout from "@/components/Layout";
import { serializeMdx } from "@/utils/mdx";
import { Post } from "@/types/types";
import { getAllPosts } from "@/utils/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ParsedUrlQuery } from "querystring";

export default function Post({
  mdx,
  postData,
}: {
  mdx: MDXRemoteSerializeResult;
  postData: Post;
}) {
  return (
    <RootLayout>
      <div className="prose dark:prose-dark ">
        <div className="text-xl">{postData.title}</div>
        <MDXRemote {...mdx} />
      </div>
    </RootLayout>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => post.slug),
    fallback: false,
  };
};

interface IParams extends ParsedUrlQuery {
  slug: string[];
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(params); //{ slugs: [ '2023', '07', 'lets_learn_about_ajax_and_promise' ] }
  const { slugs } = params as { slugs: string[] };
  const slug = `/posts/${[...slugs].join("/")}`;
  const postData = getAllPosts().find((post) => post.slug === slug);
  const mdx = postData ? await serializeMdx(postData.content) : "";

  if (!postData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      mdx,
      postData,
    },
  };
};

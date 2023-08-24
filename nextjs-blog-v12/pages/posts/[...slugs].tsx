import { allPosts, Post } from "@/.contentlayer/generated";
import { GetStaticPaths, GetStaticProps } from "next";
import RootLayout from "@/components/Layout";
import { serializeMdx } from "@/lib/utils/mdx";
import { MDXRemoteSerializeResult } from "next-mdx-remote/dist/types";
import { MDXRemote } from "next-mdx-remote";

export default function Post({
  postData,
  mdx,
}: {
  postData: Post;
  mdx: MDXRemoteSerializeResult;
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
  const posts = allPosts;
  return {
    paths: posts.map((post) => post.url),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // console.log(params); //{ slugs: [ '2023', '07', 'lets_learn_about_ajax_and_promise' ] }
  const { slugs } = params as { slugs: string[] };
  const url = `/posts/${[...slugs].join("/")}`;
  const postData = allPosts.find((post) => post.url === url);

  if (!postData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      postData,
      mdx: await serializeMdx(postData?.body.raw),
    },
  };
};

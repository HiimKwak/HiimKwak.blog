import PostSorter from "@/src/components/common/PostSorter";

const Blog = () => {
  return (
    <>
      <div className="text-[3rem] font-bold tracking-tight my-4	">Blog</div>
      <PostSorter category="blog" />
    </>
  );
};

export default Blog;

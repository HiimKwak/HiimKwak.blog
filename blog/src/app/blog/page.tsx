import PostSorter from "@/src/components/common/PostSorter";

const Blog = () => {
  return (
    <>
      <div className="text-[3rem] font-extrabold tracking-tight mt-8">Blog</div>
      <PostSorter category="blog" />
    </>
  );
};

export default Blog;

import PostSorter from "@/src/components/common/PostSorter";

export default function Home() {
  return (
    <>
      <div className="text-[3rem] font-extrabold tracking-tight my-4	">
        Latest
      </div>
      <PostSorter category="" />
    </>
  );
}

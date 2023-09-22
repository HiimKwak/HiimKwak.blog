const PostTags = ({ tags }: { tags: Array<string> }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <div
          key={tag}
          className="block p-1 px-3 font-semibold rounded-lg bg-neutral-200 text-neutral-600 dark:bg-neutral-600 dark:text-neutral-400"
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

export default PostTags;

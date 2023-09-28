const PostTags = ({ tags }: { tags: Array<string> }) => {
  return (
    <div className="flex gap-1">
      {tags.length > 0 &&
        (tags.length > 1 ? (
          <>
            <div className="block p-1 px-3 text-xs font-semibold rounded-lg w-max bg-neutral-200 text-neutral-600 dark:bg-neutral-600 dark:text-neutral-400">
              {tags[0]}
            </div>
            <div className="block p-1 px-3 text-xs font-semibold rounded-lg w-max bg-neutral-200 text-neutral-600 dark:bg-neutral-600 dark:text-neutral-400">
              +
            </div>
          </>
        ) : (
          <div className="block p-1 px-3 text-xs font-semibold rounded-lg w-max bg-neutral-200 text-neutral-600 dark:bg-neutral-600 dark:text-neutral-400">
            {tags[0]}
          </div>
        ))}
    </div>
  );
};

export default PostTags;

import { increment } from "@/db/actions";
import { getViewsCount } from "@/db/queries";
import { cn } from "@/lib/core";
import { cache } from "react";

const incrementViews = cache(increment);

export async function Views(props: { slug: string, className?: string }) {
  const views = await getViewsCount();
  process.env.NODE_ENV === "production" && incrementViews(props.slug);
  return <ViewCounter allViews={views} {...props} />;
}

function ViewCounter({
  slug,
  allViews,
  className,
}: {
  slug: string;
  allViews: {
    slug: string;
    count: number;
  }[];
  trackView?: boolean;
  className?: string;
}) {
  const viewsForSlug = allViews?.find((view) => view.slug === slug);
  const number = new Number(viewsForSlug?.count || 0);

  return (
    <p className={cn("text-neutral-600 dark:text-neutral-400", className)}>
      {`${number.toLocaleString()} views`}
    </p>
  );
}
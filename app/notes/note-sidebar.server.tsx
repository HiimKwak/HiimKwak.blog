import { getNotes } from "@/db/content/note";
import { NoteSidebar as NoteSidebarBase, NoteSidebarProvider, NoteSidebarSkeleton } from "./note-sidebar";

export async function NoteSidebarFetcher() {
  const data = getNotes();
  return <NoteSidebarBase data={data} />;
}

export const NoteSidebar = Object.assign(NoteSidebarBase, {
  Provider: NoteSidebarProvider,
  Fetcher: NoteSidebarFetcher,
  Skeleton: NoteSidebarSkeleton,
});



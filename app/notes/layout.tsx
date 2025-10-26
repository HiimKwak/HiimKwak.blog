import { getNotes } from "@/db/content/note";
import { NoteSidebarClient } from "./note-sidebar";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const data = getNotes();

	return <NoteSidebarClient data={data}>{children}</NoteSidebarClient>;
}

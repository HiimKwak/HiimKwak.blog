import { Suspense } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getNotes } from "@/db/content/note";
import { NoteSidebar } from "./note-sidebar";
import { NoteSidebarSkeleton } from "./note-sidebar-skeleton";

async function NoteSidebarServer() {
	const data = getNotes();
	return <NoteSidebar data={data} />;
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<Suspense fallback={<NoteSidebarSkeleton />}>
				<NoteSidebarServer />
			</Suspense>
			{children}
		</SidebarProvider>
	);
}

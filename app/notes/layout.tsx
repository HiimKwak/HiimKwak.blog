import { SidebarProvider } from "@/components/ui/sidebar";
import { getNotes } from "@/db/content/note";
import { NoteSidebar } from "./note-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
	const data = getNotes();
	return (
		<SidebarProvider>
			<NoteSidebar data={data} />
			{children}
		</SidebarProvider>
	);
}

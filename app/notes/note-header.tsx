"use client";

import Navbar from "@/components/layout/nav";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

export const NoteHeader = () => {
	const { isMobile } = useSidebar();

	return (
		<section className="flex">
			{isMobile && (
				<div className="p-4">
					<SidebarTrigger />
				</div>
			)}
			<Navbar />
		</section>
	);
};

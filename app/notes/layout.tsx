import { Suspense } from "react";
import { NoteSidebar } from "./note-sidebar.server";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<NoteSidebar.Provider>
			<Suspense fallback={<NoteSidebar.Skeleton />}>
				<NoteSidebar.Fetcher />
			</Suspense>
			{children}
		</NoteSidebar.Provider>
	);
}

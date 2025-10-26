"use client";

import { Sidebar } from "@/components/ui/sidebar";

const SKELETON_KEYS = Array.from({ length: 5 }, (_, i) => `skeleton-${i}-${Date.now()}`);

export function NoteSidebarSkeleton() {
	return (
		<Sidebar>
			<Sidebar.Content>
				<Sidebar.Group>
					<Sidebar.GroupLabel>Files</Sidebar.GroupLabel>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							{SKELETON_KEYS.map((key) => (
								<Sidebar.MenuSkeleton key={key} showIcon />
							))}
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				</Sidebar.Group>
			</Sidebar.Content>
		</Sidebar>
	);
}

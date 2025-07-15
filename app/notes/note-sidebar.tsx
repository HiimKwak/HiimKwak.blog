"use client";

import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { Collapsible } from "@/components/ui/collapsible";
import { Sidebar } from "@/components/ui/sidebar";
import type { NoteTree } from "@/db/content/note";

type NoteSidebarProps = ComponentProps<typeof Sidebar> & {
	data: NoteTree;
};

export function NoteSidebar({ data, ...sidebarProps }: NoteSidebarProps) {
	return (
		<Sidebar {...sidebarProps}>
			<Sidebar.Content>
				<Sidebar.Group>
					<Sidebar.GroupLabel>Files</Sidebar.GroupLabel>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							<Tree item={data} />
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				</Sidebar.Group>
			</Sidebar.Content>
		</Sidebar>
	);
}

function Tree({ item }: { item: NoteTree }) {
	const thisYear = new Date().getFullYear().toString();
	const thisMonth = (new Date().getMonth() + 1).toString();

	return (
		<Sidebar.MenuItem>
			<Collapsible
				className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
				defaultOpen={
					item.folderName === thisYear || item.folderName === thisMonth
				}
			>
				<Collapsible.Trigger asChild>
					<Sidebar.MenuButton>
						<ChevronRightIcon className="transition-transform w-4 h-4" />
						<FolderIcon className="w-4 h-4" />
						{item.folderName}
					</Sidebar.MenuButton>
				</Collapsible.Trigger>
				<Collapsible.Content>
					<Sidebar.MenuSub>
						{/* 노트 파일들 */}
						{item.notes.map((note, index) => (
							<Sidebar.MenuButton
								key={note.slug}
								isActive={note.slug === "button"}
								className="data-[active=true]:bg-transparent"
							>
								<FileIcon className="w-4 h-4" />
								{note.slug}
							</Sidebar.MenuButton>
						))}
						{/* 하위 폴더들 */}
						{item.children.map((child, index) => (
							<Tree key={`child-${index}`} item={child} />
						))}
					</Sidebar.MenuSub>
				</Collapsible.Content>
			</Collapsible>
		</Sidebar.MenuItem>
	);
}

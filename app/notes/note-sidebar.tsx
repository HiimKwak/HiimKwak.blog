"use client";

import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
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
							<Tree tree={data} />
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				</Sidebar.Group>
			</Sidebar.Content>
		</Sidebar>
	);
}

function Tree({
	tree,
	currentPath = [],
}: {
	tree: NoteTree;
	currentPath?: string[];
}) {
	const thisYear = new Date().getFullYear().toString();
	const defaultOpen = (folderName: string) =>
		folderName === "notes" || folderName === thisYear;

	const fullPath = [...currentPath, tree.folderName];

	return (
		<Sidebar.MenuItem>
			<Collapsible
				className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
				defaultOpen={defaultOpen(tree.folderName)}
			>
				<Collapsible.Trigger asChild>
					<Sidebar.MenuButton>
						<ChevronRightIcon className="transition-transform w-4 h-4" />
						{localeMonth(tree.folderName)}
					</Sidebar.MenuButton>
				</Collapsible.Trigger>
				<Collapsible.Content>
					<Sidebar.MenuSub>
						{/* 노트 파일들 */}
						{tree.notes.map((note) => (
							<NoteLink key={note.slug} slug={note.slug} fullPath={fullPath} />
						))}
						{/* 하위 폴더들 */}
						{tree.children.map((child) => (
							<Tree
								key={child.folderName}
								tree={child}
								currentPath={fullPath}
							/>
						))}
					</Sidebar.MenuSub>
				</Collapsible.Content>
			</Collapsible>
		</Sidebar.MenuItem>
	);
}

function NoteLink({ slug, fullPath }: { slug: string; fullPath: string[] }) {
	const segment = useSelectedLayoutSegment();
	const isActive = slug === segment;

	const href = `/${fullPath.join("/")}/${slug}`;

	return (
		<Sidebar.MenuButton
			key={slug}
			asChild
			isActive={isActive}
			className="data-[active=true]:bg-neutral-100 dark:data-[active=true]:bg-neutral-800 w-full text-left"
		>
			<Link href={href}>{slug}</Link>
		</Sidebar.MenuButton>
	);
}

// 한글 월 폴더명을 숫자로 매핑
const monthMapping: Record<string, string> = {
	"01": "1월",
	"02": "2월",
	"03": "3월",
	"04": "4월",
	"05": "5월",
	"06": "6월",
	"07": "7월",
	"08": "8월",
	"09": "9월",
	"10": "10월",
	"11": "11월",
	"12": "12월",
};

// 폴더명을 URL용으로 변환
function localeMonth(folderName: string): string {
	return monthMapping[folderName] || folderName;
}

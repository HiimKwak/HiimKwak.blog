"use client";

import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { Collapsible } from "@/components/ui/collapsible";
import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import { NAV_PATH } from "@/constants";
import type { NoteTree } from "@/db/content/note";

type NoteSidebarProps = ComponentProps<typeof Sidebar> & {
	data: NoteTree;
};

export function NoteSidebar({ data, ...sidebarProps }: NoteSidebarProps) {
	const pathname = usePathname();

	// 매번 pathname에서 직접 계산
	const openedNotePath = pathname.startsWith(NAV_PATH.notes)
		? pathname.split("/").filter(Boolean)
		: [];

	return (
		<Sidebar {...sidebarProps}>
			<Sidebar.Content>
				<Sidebar.Group>
					<Sidebar.GroupLabel>Files</Sidebar.GroupLabel>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							<Tree key={pathname} tree={data} openedNotePath={openedNotePath} />
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				</Sidebar.Group>
			</Sidebar.Content>
		</Sidebar>
	);
}

function Tree({
	tree,
	currentPath = [], // [notes, 2025, 08] 순으로 쌓이는 디렉토리 배열
	openedNotePath, // 현재 내가 열람하고 있는 노트의 디렉토리 배열 [notes, 2025, 08, 15]
}: {
	tree: NoteTree;
	currentPath?: string[];
	openedNotePath: string[];
}) {
	const defaultOpen = (folderName: string) => {
		if (folderName === "notes") return true;

		// 현재 트리의 뎁스 계산 (currentPath.length로 깊이 파악)
		const currentDepth = currentPath.length;

		// openedNotePath의 해당 뎁스 인덱스와 현재 folderName 비교
		// currentPath = ['notes'] → depth = 1 → openedNotePath[1]과 비교 (연도)
		// currentPath = ['notes', '2025'] → depth = 2 → openedNotePath[2]과 비교 (월)
		const targetSegment = openedNotePath[currentDepth];

		// 현재 폴더명이 openedNotePath의 해당 뎁스와 일치하면 열기
		return folderName === targetSegment;
	};

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
								openedNotePath={openedNotePath}
							/>
						))}
					</Sidebar.MenuSub>
				</Collapsible.Content>
			</Collapsible>
		</Sidebar.MenuItem>
	);
}

function NoteLink({ slug, fullPath }: { slug: string; fullPath: string[] }) {
	const pathname = usePathname();
	const href = `/${fullPath.join("/")}/${slug}`;

	// 현재 노트인지 확인 (전체 경로 비교)
	const isCurrentNote = pathname === href;

	// 현재 노트가 속한 폴더의 노트들을 펼치기 위해 부모 폴더 열기
	const _shouldExpandParent = isCurrentNote;

	const { setOpenMobile } = useSidebar();

	return (
		<Sidebar.MenuButton
			key={slug}
			asChild
			isActive={isCurrentNote}
			className="data-[active=true]:bg-neutral-100 dark:data-[active=true]:bg-neutral-800 w-full text-left"
		>
			<Link
				href={href}
				onClick={() => setOpenMobile(false)}
				className={isCurrentNote ? "font-semibold" : ""}
			>
				{slug}.mdx
			</Link>
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

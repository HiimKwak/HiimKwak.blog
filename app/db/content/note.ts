import fs from "node:fs";
import path from "node:path";
import { CONTENT_LOCATION } from "app/constants";
import { cache } from "react";
import { checkMDXExt, extractDataFromDir, type MDXData } from "./utils";

export type NoteTree = {
	folderName: string;
	notes: MDXData[];
	children: NoteTree[];
};

const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];

const buildNoteTree = (currDir: string, depth: number = 0): NoteTree => {
	const branches = fs.readdirSync(currDir);

	const filteredBranches = branches.filter((branch) => {
		const ext = path.extname(branch).toLowerCase();
		return !imageExtensions.includes(ext);
	});

	// 각 레벨에 맞는 정렬 함수
	const sortBranches = (a: string, b: string) => {
		switch (depth) {
			case 0:
				// 첫 번째 겹: 연도 숫자 내림차순 (2025, 2024, ...)
				return parseInt(b, 10) - parseInt(a, 10);
			case 1: {
				// 두 번째 겹: x월 형태 내림차순 (12, 11, ..., 01)
				return b.localeCompare(a);
			}
			case 2:
				// 세 번째 겹: MMDD 형태 내림차순
				return b.localeCompare(a);
			default:
				// 기본 정렬: 알파벳 순
				return a.localeCompare(b);
		}
	};

	const sortedBranches = filteredBranches.sort(sortBranches);

	const notes: MDXData[] = [];
	const children: NoteTree[] = [];
	const folderName = path.basename(currDir);

	for (const branch of sortedBranches) {
		const branchPath = path.join(currDir, branch);

		if (fs.statSync(branchPath).isDirectory()) {
			children.push(buildNoteTree(branchPath, depth + 1));
		} else if (checkMDXExt(branch)) {
			notes.push(extractDataFromDir(branchPath));
		}
	}

	return {
		folderName,
		notes,
		children,
	};
};

export const getNotes = cache(() => {
	const noteDir = path.join(process.cwd(), CONTENT_LOCATION.note);

	return buildNoteTree(noteDir);
});

export function getNoteByPath(pathSegments: string[]): MDXData | null {
	const noteDir = path.join(process.cwd(), CONTENT_LOCATION.note);

	// 경로 배열을 파일 시스템 경로로 변환
	const filePath = path.join(noteDir, ...pathSegments);
	const mdxPath = `${filePath}.mdx`;

	// 파일이 존재하는지 확인
	if (!fs.existsSync(mdxPath)) {
		return null;
	}

	// MDX 파일인지 확인
	if (!checkMDXExt(path.basename(mdxPath))) {
		return null;
	}

	return extractDataFromDir(mdxPath);
}

// 최신 노트 조회
export const getLatestNote = cache(
	(): {
		note: MDXData;
		path: string[];
	} | null => {
		const noteDir = path.join(process.cwd(), CONTENT_LOCATION.note);

		// 연도 폴더들을 내림차순으로 정렬
		const years = fs
			.readdirSync(noteDir)
			.filter((item) => fs.statSync(path.join(noteDir, item)).isDirectory())
			.sort((a, b) => Number.parseInt(b, 10) - Number.parseInt(a, 10));

		for (const year of years) {
			const yearPath = path.join(noteDir, year);
			// 월 폴더들을 내림차순으로 정렬
			const months = fs
				.readdirSync(yearPath)
				.filter((item) => fs.statSync(path.join(yearPath, item)).isDirectory())
				.sort((a, b) => b.localeCompare(a));

			for (const month of months) {
				const monthPath = path.join(yearPath, month);
				// MDX 파일들을 내림차순으로 정렬
				const files = fs
					.readdirSync(monthPath)
					.filter((item) => checkMDXExt(item))
					.sort((a, b) => b.localeCompare(a));

				if (files.length > 0) {
					const filePath = path.join(monthPath, files[0]);
					const note = extractDataFromDir(filePath);
					const slug = path.basename(files[0], ".mdx");
					return {
						note,
						path: [year, month, slug],
					};
				}
			}
		}

		return null;
	},
);

// 모든 노트 경로 반환 (generateStaticParams용)
export const getAllNotePaths = cache((): string[][] => {
	const noteDir = path.join(process.cwd(), CONTENT_LOCATION.note);
	const paths: string[][] = [];

	function traverse(currentDir: string, currentPath: string[] = []) {
		const items = fs.readdirSync(currentDir);

		for (const item of items) {
			const itemPath = path.join(currentDir, item);
			const stat = fs.statSync(itemPath);

			if (stat.isDirectory()) {
				traverse(itemPath, [...currentPath, item]);
			} else if (checkMDXExt(item)) {
				const slug = path.basename(item, ".mdx");
				paths.push([...currentPath, slug]);
			}
		}
	}

	traverse(noteDir);

	// 날짜순으로 정렬 (최신 우선)
	return paths.sort((a, b) => {
		// [year, month, slug] 형태로 비교
		const dateA = a.slice(0, 2).join("");
		const dateB = b.slice(0, 2).join("");
		return dateB.localeCompare(dateA);
	});
});

// 이전/다음 노트 조회
export function getAdjacentNotes(pathSegments: string[]): {
	prev: (MDXData & { slug: string }) | null;
	next: (MDXData & { slug: string }) | null;
} {
	const allPaths = getAllNotePaths();

	// 현재 노트의 인덱스 찾기
	const currentIndex = allPaths.findIndex(
		(p) => p.join("/") === pathSegments.join("/"),
	);

	if (currentIndex === -1) {
		return { prev: null, next: null };
	}

	// 이전 노트 (더 최신)
	const nextPath = currentIndex > 0 ? allPaths[currentIndex - 1] : null;
	let next: (MDXData & { slug: string }) | null = null;
	if (nextPath) {
		const nextNote = getNoteByPath(nextPath);
		if (nextNote) {
			next = { ...nextNote, slug: nextPath.join("/") };
		}
	}

	// 다음 노트 (더 오래된)
	const prevPath =
		currentIndex < allPaths.length - 1 ? allPaths[currentIndex + 1] : null;
	let prev: (MDXData & { slug: string }) | null = null;
	if (prevPath) {
		const prevNote = getNoteByPath(prevPath);
		if (prevNote) {
			prev = { ...prevNote, slug: prevPath.join("/") };
		}
	}

	return { prev, next };
}

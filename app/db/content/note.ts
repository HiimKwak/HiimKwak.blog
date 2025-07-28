import fs from "node:fs";
import path from "node:path";
import { CONTENT_LOCATION } from "app/constants";
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
				return parseInt(b) - parseInt(a);
			case 1: {
				// 두 번째 겹: x월 형태 내림차순 (12, 11, ..., 01)
				return b.localeCompare(a);
			}
			case 2:
				// 세 번째 겹: MMDD 형태 오름차순
				return a.localeCompare(b);
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

export function getNotes() {
	const noteDir = path.join(process.cwd(), CONTENT_LOCATION.note);

	return buildNoteTree(noteDir);
}

export function getNoteByPath(pathSegments: string[]): MDXData | null {
	const noteDir = path.join(process.cwd(), CONTENT_LOCATION.note);

	// 경로 배열을 파일 시스템 경로로 변환
	const filePath = path.join(noteDir, ...pathSegments);
	const mdxPath = `${filePath}.mdx`;

	// 디버깅용 로그
	console.log("getNoteByPath - pathSegments:", pathSegments);

	// 파일이 존재하는지 확인
	if (!fs.existsSync(mdxPath)) {
		console.log("getNoteByPath - file not found");
		return null;
	}

	// MDX 파일인지 확인
	if (!checkMDXExt(path.basename(mdxPath))) {
		console.log("getNoteByPath - not an MDX file");
		return null;
	}

	console.log("getNoteByPath - file found, extracting data");
	return extractDataFromDir(mdxPath);
}

import { CONTENT_LOCATION } from "app/constants";
import fs from "node:fs";
import path from "node:path";
import { checkMDXExt, extractDataFromDir, MDXData } from "./utils";

export type NoteTree = { folderName: string; notes: MDXData[]; children: NoteTree[]};

// const buildNoteTree = (currDir: string): TreeNode => {
//   const node: TreeNode = [];
//   const branches = fs.readdirSync(currDir);

//   for (const branch of branches) {
//     const branchPath = path.join(currDir, branch);

//     node.push(branch);

//     if (fs.statSync(branchPath).isDirectory()) {
//       const subTree = buildNoteTree(branchPath);
//       node.push(subTree);
//     }
//   }

//   return node;
// };

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
      case 1:
        // 두 번째 겹: x월 형태 올림차순 (1월, 2월, ..., 12월)
        const aMonth = parseInt(a.replace("월", ""));
        const bMonth = parseInt(b.replace("월", ""));
        return aMonth - bMonth;
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
    children
  };
};

export function getNotes() {
  const noteDir = path.join(process.cwd(), CONTENT_LOCATION.note);

  return buildNoteTree(noteDir);
}

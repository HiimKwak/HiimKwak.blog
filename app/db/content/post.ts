import fs from "node:fs";
import path from "node:path";
import { CONTENT_LOCATION } from "app/constants";
import { checkMDXExt, extractDataFromDir } from "./utils";

export function getDiaryPosts() {
	const diaryPath = path.join(process.cwd(), CONTENT_LOCATION.diary);

	const mdxFiles = fs.readdirSync(diaryPath).filter(checkMDXExt);

	return mdxFiles.map((file) => {
		const filePath = path.join(diaryPath, file);
		return extractDataFromDir(filePath);
	});
}

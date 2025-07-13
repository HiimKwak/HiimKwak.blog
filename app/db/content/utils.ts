import fs from "node:fs";
import path from "node:path";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  personal: string;
};

export type MDXData = {
  metadata: Metadata;
  slug: string;
  content: string;
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  if (!match) {
    throw new Error("Frontmatter가 없습니다.");
  }
  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  for (const line of frontMatterLines) {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    metadata[key.trim() as keyof Metadata] = value;
  }

  return { metadata: metadata as Metadata, content };
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

export function checkMDXExt(file: string): boolean {
  const ext = path.extname(file).toLowerCase();
  return ext === ".mdx";
}

export function extractDataFromDir(filePath: string): MDXData {
  const { metadata, content } = readMDXFile(filePath);
  const slug = path.basename(filePath, path.extname(filePath));

  return {
    metadata,
    slug,
    content,
  };
}

export interface Metadata {
  title: string;
  date: string;
}

export interface PostInfo extends Metadata {
  id: string;
}

export interface PostData extends PostInfo {
  contentHtml: string;
}

export type PostMatter = {
  title: string;
  description: string;
  tags: string[];
  draft?: boolean;
  date: string;
};

export type Post = PostMatter & {
  slug: string;
  content: string;
  readingMinutes: number;
  wordCount: number;
};

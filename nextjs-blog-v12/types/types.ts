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

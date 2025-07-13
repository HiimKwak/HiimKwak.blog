import Link from "next/link";
import dayjs from "dayjs";
import { getNotes } from "app/db/content/note";

export const metadata = {
  title: "공책",
  description: "단상 모음집",
};

export default function Post() {
  const allPosts = getNotes();
  console.log(allPosts);
}

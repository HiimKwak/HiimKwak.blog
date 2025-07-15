import { getNotes } from "app/db/content/note";

export const metadata = {
	title: "공책",
	description: "단상 모음집",
};

export default function Page() {
	const allNotes = getNotes();

	return <div>note page</div>;
}

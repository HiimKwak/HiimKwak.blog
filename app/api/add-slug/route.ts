import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const slug = searchParams.get("slug");
	// add slug into query params. e.g. api/add-slug?slug=postName

	try {
		if (!slug) throw new Error("Slug required");
		await sql`INSERT INTO views (slug) VALUES (${slug});`;
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}

	const views = await sql`SELECT * FROM views;`;
	return NextResponse.json({ views }, { status: 200 });
}

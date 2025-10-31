import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
	try {
		const { slug } = await request.json();

		if (!slug) {
			throw new Error("Slug required");
		}

		await sql`INSERT INTO views (slug) VALUES (${slug});`;

		const views = await sql`SELECT * FROM views;`;
		return NextResponse.json({ views }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

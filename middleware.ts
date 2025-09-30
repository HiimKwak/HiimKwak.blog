import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (pathname === "/notes") {
		try {
			// API를 통해 최신 노트 경로 가져오기
			const apiUrl = new URL("/api/notes", request.url);
			const response = await fetch(apiUrl);

			if (response.ok) {
				const data = await response.json();
				const redirectUrl = new URL(data.redirectPath, request.url);
				return NextResponse.redirect(redirectUrl);
			}
		} catch (error) {
			console.error("미들웨어에서 최신 노트 찾기 실패:", error);
		}
	}

	return NextResponse.next();
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function NotesPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	// todo: redirect 없애고 서버사이드 렌더링으로 완전히 전환하기
	useEffect(() => {
		const loadNotes = async () => {
			try {
				const response = await fetch("/api/notes");

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.error || "노트를 불러올 수 없습니다");
				}

				const data = await response.json();

				// API에서 받은 리다이렉트 경로로 이동
				router.push(data.redirectPath);
			} catch (error) {
				console.error("노트 로드 중 오류:", error);
				setError(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다");
			} finally {
				setIsLoading(false);
			}
		};

		loadNotes();
	}, [router]);

	// 로딩 중일 때 스켈레톤 표시
	if (isLoading) {
		return (
			<div className="w-full">
				<div className='h-16 border-b border-neutral-300' />

				<div className="flex flex-col gap-8 p-6">
					<div className="space-y-2">
						<Skeleton className="h-8 w-96" />
						<Skeleton className="h-2 w-24" />
					</div>

					<div className="space-y-4">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-5/6" />
					</div>

					<div className="space-y-4">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-1/5" />
					</div>

					<div className="space-y-4">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-2/5" />
					</div>

					<div className="space-y-4">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-4/5" />
					</div>
				</div>
			</div>
		);
	}

	// 에러가 있을 때 에러 메시지 표시
	if (error) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">오류가 발생했습니다</h1>
					<p className="text-neutral-600 dark:text-neutral-400 mb-4">
						{error}
					</p>
					<button
						type="button"
						onClick={() => window.location.reload()}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
					>
						다시 시도
					</button>
				</div>
			</div>
		);
	}

	// 이 부분은 일반적으로 도달하지 않지만, 안전을 위해 추가
	return null;
}

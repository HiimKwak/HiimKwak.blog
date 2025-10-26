import { Skeleton } from "@/components/ui/skeleton";

export function NoteLoading() {
	return (
		<div className="w-full">
			<div className="h-16 border-b border-neutral-300" />

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

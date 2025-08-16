'use client'

import type { ImageProps } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";

interface CustomImage extends ImageProps {
	caption?: string;
}

export default function CustomImage({ caption, ...props }: CustomImage) {
	return (
		<div className="flex flex-col items-center justify-center gap-4 my-4 not-prose">
			<Dialog>
				<Dialog.Trigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="relative group p-0 border-0 hover:bg-transparent w-full h-full"
					>
						<Image {...props} className="not-prose cursor-zoom-in" />
					</Button>
				</Dialog.Trigger>
				<Dialog.Content className="p-0 border-0 bg-transparent shadow-none max-w-none max-h-none w-auto h-auto">
					<Dialog.Title>{props.about}</Dialog.Title>
					<div className="relative overflow-auto max-h-[90vh] max-w-[90vw]">
						<Image
							{...props}
							width={1500}
							height={1500}
							className="w-full h-full object-contain rounded-lg"
							priority
						/>
					</div>
				</Dialog.Content>
			</Dialog>
			{caption && (
				<span className="text-sm italic opacity-80">{caption}</span>
			)}
		</div>
	);
}
import type React from "react";

import { cn } from "@/lib/core";

export interface IconTextProps {
	Icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
	IconSize?: number;
	text?: React.ReactNode;
	className?: string;
	fill?: string;
}

export default function IconText({ Icon, IconSize = 14, text, className, fill }: IconTextProps) {
	return (
		<div
			className={cn(
				"flex items-center text-neutral-600 dark:text-neutral-300",
				className ?? "gap-1 text-xs",
			)}
		>
			<Icon width={IconSize} height={IconSize} className={fill} />
			<span>{text}</span>
		</div>
	);
}

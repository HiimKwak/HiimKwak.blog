import type React from "react";

import { $ } from "app/libs/core";

export interface IconTextProps {
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  IconSize?: number;
  text?: React.ReactNode;
  className?: string;
  fill?: string;
}

export default function IconText({
  Icon,
  IconSize = 14,
  text,
  className,
  fill,
}: IconTextProps) {
  return (
    <div className={$("flex items-center", className ?? "gap-1 text-xs")}>
      <Icon width={IconSize} height={IconSize} className={fill} />
      <span>{text}</span>
    </div>
  );
}

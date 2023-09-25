import React from "react";

import { $ } from "@/src/libs/core";

export interface IconTextProps {
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  IconSize?: number;
  text?: React.ReactNode;
  className?: string;
}

export default function IconText({
  Icon,
  IconSize = 14,
  text,
  className,
}: IconTextProps) {
  return (
    <div className={$("flex items-center", className ?? "gap-1 text-xs")}>
      <Icon width={IconSize} height={IconSize} />
      <span>{text}</span>
    </div>
  );
}

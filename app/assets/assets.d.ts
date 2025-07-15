declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.gif";

declare module "*.svg" {
	import React = require("react");

	export const ReactComponent: React.ComponentProps<"svg">;

	const src: string;
	export default src;
}

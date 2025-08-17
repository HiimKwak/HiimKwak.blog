/** @type {import('next').NextConfig} */
const nextConfig = {
	// Configure pageExtensions to include md and mdx
	pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
	outputFileTracingExcludes: {
		"/*": [".pnpm-store/v3/files", ".next/cache/webpack", ".git/objects/pack"],
	},
};

module.exports = nextConfig;

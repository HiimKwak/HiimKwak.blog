/** @type {import('next').NextConfig} */
const nextConfig = {
	// Configure pageExtensions to include md and mdx
	pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
	outputFileTracingExcludes: {
		"/post/*": ["./content_publish/**/*"],
		"/notes/*": ["./content_publish/**/*"],
		"*": ['.pnpm-store/v3/files']
	},
};

module.exports = nextConfig;

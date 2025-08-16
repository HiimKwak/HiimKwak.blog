/** @type {import('next').NextConfig} */
const nextConfig = {
	// Configure pageExtensions to include md and mdx
	pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
	outputFileTracingIncludes: {
		"/post/[slug]": ["./content_publish/**/*"],
		"/notes/[...slug]": ["./content_publish/**/*"],
	},
};

module.exports = nextConfig;

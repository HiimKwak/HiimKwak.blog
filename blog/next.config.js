const { withContentlayer } = require("next-contentlayer");
const withExportImages = require("next-export-optimize-images");

/** @type {import('next').NextConfig} */
const nextConfig = withExportImages({
  reactStrictMode: true,
  // Configure pageExtensions to include md and mdx
  swcMinify: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
});

module.exports = withContentlayer(nextConfig);

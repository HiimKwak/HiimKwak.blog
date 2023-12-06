/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configure pageExtensions to include md and mdx
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Configure pageExtensions to include md and mdx
	pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
	outputFileTracingExcludes: {
		"/*": [".pnpm-store/v3/files", ".next/cache/webpack", ".git/objects/pack"],
	},
	
	// WSL 환경 최적화 (올바른 방법)
	webpack: (config, { dev, isServer }) => {
		if (dev) {
			// WSL 환경에서 파일 감시 최적화
			config.watchOptions = {
				poll: 1000, // 1초마다 파일 변경 확인
				aggregateTimeout: 300, // 300ms 지연 후 재빌드
				ignored: [
					'**/node_modules/**',
					'**/.git/**',
					'**/.next/**',
					'**/public/**',
				],
			};
			
			// 파일시스템 캐시 활성화
			config.cache = {
				type: 'filesystem',
				buildDependencies: {
					config: [__filename],
				},
			};
		}
		
		return config;
	},
};

module.exports = nextConfig;

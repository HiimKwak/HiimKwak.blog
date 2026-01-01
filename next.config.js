/** @type {import('next').NextConfig} */
const nextConfig = {
	// Configure pageExtensions to include md and mdx
	pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
	outputFileTracingExcludes: {
		"/*": [".pnpm-store/v3/files", ".next/cache/webpack", ".git/objects/pack"],
	},

	experimental: {
		reactCompiler: false, // React 19.1.0은 아직 실험적
	},

	// Image 최적화
	images: {
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 60,
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},

	// 컴파일러 최적화
	compiler: {
		removeConsole:
			process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
	},

	// WSL 환경 최적화 (올바른 방법)
	webpack: (config, { dev, isServer }) => {
		if (dev) {
			// WSL 환경에서 파일 감시 최적화
			config.watchOptions = {
				poll: 1000, // 1초마다 파일 변경 확인
				aggregateTimeout: 300, // 300ms 지연 후 재빌드
				ignored: [
					"**/node_modules/**",
					"**/.git/**",
					"**/.next/**",
					"**/public/**",
				],
			};

			// 파일시스템 캐시 활성화
			config.cache = {
				type: "filesystem",
				buildDependencies: {
					config: [__filename],
				},
			};
		}

		// 프로덕션 최적화
		if (!dev && !isServer) {
			config.optimization = {
				...config.optimization,
				moduleIds: "deterministic",
				runtimeChunk: "single",
				splitChunks: {
					chunks: "all",
					cacheGroups: {
						default: false,
						vendors: false,
						// 프레임워크 코드 분리
						framework: {
							name: "framework",
							chunks: "all",
							test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
							priority: 40,
							enforce: true,
						},
						// UI 라이브러리 분리
						lib: {
							test: /[\\/]node_modules[\\/]/,
							name(module) {
								const packageName = module.context.match(
									/[\\/]node_modules[\\/](.*?)([\\/]|$)/,
								)?.[1];
								return `lib.${packageName?.replace("@", "")}`;
							},
							priority: 30,
							minChunks: 1,
							reuseExistingChunk: true,
						},
						// 공통 코드 분리
						commons: {
							name: "commons",
							minChunks: 2,
							priority: 20,
						},
					},
				},
			};
		}

		return config;
	},
};

module.exports = nextConfig;

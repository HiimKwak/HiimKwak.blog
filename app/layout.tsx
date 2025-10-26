import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "./components/layout/nav";
import { cn } from "./lib/core";

export const metadata: Metadata = {
	metadataBase: new URL("https://hiimkwak.blog"),
	title: {
		default: "HiimKwak",
		template: "%s | HiimKwak",
	},
	description: "개발자 곽민규의 blog",
	openGraph: {
		title: "HiimKwak",
		description: "개발자 곽민규의 blog",
		url: "https://hiimkwak.blog",
		siteName: "HiimKwak",
		locale: "ko",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	// verification: {
	//   google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
	//   yandex: '14d2e73487fa6c71',
	// },
};

const pretendard = localFont({
	src: "../public/fonts/Pretendard.woff2",
	display: "swap",
	variable: "--font-pretendard",
	preload: true,
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="ko"
			className={cn(
				"text-black dark:text-white bg-white dark:bg-[#111010] antialiased",
				`${pretendard.variable}`,
			)}
		>
			<body>
				<Navbar />
				<div id="header-flag" />
				<main>
					{children}
					<Analytics />
				</main>
			</body>
		</html>
	);
}

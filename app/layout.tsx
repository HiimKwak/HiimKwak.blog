import './globals.css';
import { Metadata } from 'next';
import Navbar from 'app/components/layout/nav';
import { Analytics } from '@vercel/analytics/react';
import localFont from 'next/font/local';
import { $ } from './libs/core';

export const metadata: Metadata = {
  metadataBase: new URL('https://hiimkwak.blog'),
  title: {
    default: 'HiimKwak',
    template: '%s | HiimKwak',
  },
  description: '개발자 곽민규의 blog',
  openGraph: {
    title: 'HiimKwak',
    description: '개발자 곽민규의 blog',
    url: 'https://hiimkwak.blog',
    siteName: 'HiimKwak',
    locale: 'ko',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // verification: {
  //   google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
  //   yandex: '14d2e73487fa6c71',
  // },
};

const pretendard = localFont({
  src: '../public/fonts/Pretendard.woff2',
  display: 'swap',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='ko'
      className={$(
        'text-black dark:text-white bg-white dark:bg-[#111010]',
        `${pretendard.variable}`
      )}
    >
      <body className='flex flex-col max-w-2xl mx-4 mt-8 mb-40 antialiased md:mx-auto'>
        <div id='header-flag' />
        <header className='fixed top-0 left-0 right-0 z-10'>
          <Navbar />
        </header>
        <main className='flex flex-col flex-auto min-w-0 px-2 mt-14 md:px-0'>
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
}

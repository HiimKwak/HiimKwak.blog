import '../styles/globals.css';
import { Metadata } from 'next';
import Main from '@/src/components/layout/Main';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Hiimkwak',
  description: 'HiimKwak의 블로그입니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='relative'>
        <header className='sticky top-0 left-0 right-0'>
          <Navbar />
        </header>
        <div id='header-flag' />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  );
}

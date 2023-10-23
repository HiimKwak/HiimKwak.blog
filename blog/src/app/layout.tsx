import '../styles/globals.css';
import { Metadata } from 'next';
import Footer from '@/src/components/layout/Footer';
import Navbar from '@/src/components/layout/Navbar';

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
      <body className='p-4 bg-[#F1F1F6]'>
        <header className='mb-4'>
          <Navbar />
        </header>
        {children}
        <Footer />
      </body>
    </html>
  );
}

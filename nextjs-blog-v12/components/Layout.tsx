import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col gap-4 p-4 mx-auto">
      <Head>
        <title>내 블로그</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}

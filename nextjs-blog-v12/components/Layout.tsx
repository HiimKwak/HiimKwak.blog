import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>내 블로그</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
}

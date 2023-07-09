import RootLayout from "@/components/Layout";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <RootLayout>
      <span className="text-lg">Home</span>
    </RootLayout>
  );
}

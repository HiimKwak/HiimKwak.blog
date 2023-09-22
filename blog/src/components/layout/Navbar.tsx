import Image from "next/image";
import Link from "next/link";
import DUCK_IMG from "@/public/profile/duck.jpeg";

interface NavLinkProps {
  title: string;
  link: string;
}

const NAV_LINKS: NavLinkProps[] = [
  { title: "Blog", link: "/blog" },
  { title: "Memo", link: "/memo" },
  { title: "About", link: "/about" },
];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4">
      <Link href={"/"}>
        <Image
          src={DUCK_IMG}
          height={50}
          width={50}
          alt="home_btn"
          className="rounded-full"
        />
      </Link>
      <div className="space-x-4">
        {NAV_LINKS.map((route: NavLinkProps) => (
          <Link href={route.link} key={route.title}>
            {route.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}

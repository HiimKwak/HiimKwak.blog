import Link from "next/link";

interface NavLinkProps {
  title: string;
  link: string;
}

const NAV_LINKS: NavLinkProps[] = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
];

export default function Navbar() {
  return (
    <nav>
      {NAV_LINKS.map((route: NavLinkProps) => (
        <Link href={route.link} key={route.title}>
          {route.title}
        </Link>
      ))}
    </nav>
  );
}

import Image from "next/image";
import Link from "next/link";

import pkg from "@/package.json";
import { IcGithub } from "@/src/assets/icons";

import DUCK_IMG from "@/public/profile/duck.jpeg";
import IconText from "@/src/components/common/IconText";

interface NavLinkProps {
  title: string;
  link: string;
  icon?: React.ComponentType;
}

const NAV_LINKS: NavLinkProps[] = [
  { title: "Blog", link: "/blog" },
  { title: "Memo", link: "/memo" },
  { title: "About", link: "/about" },
  { title: "Github", link: `${pkg.author.social.github}`, icon: IcGithub },
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
      <div className="flex space-x-4">
        {NAV_LINKS.map((route: NavLinkProps) => (
          <Link href={route.link} key={route.title}>
            {route.icon ? (
              <IconText Icon={IcGithub} IconSize={25} />
            ) : (
              route.title
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between">
      <Link href={"/"}>
        <Image
          src={DUCK_IMG}
          height={50}
          width={50}
          alt="home_btn"
          className="rounded-full"
        />
      </Link>
      <div className="flex items-center justify-center gap-2">
        {NAV_LINKS.map((route: NavLinkProps) => (
          <Link
            href={route.link}
            key={route.title}
            className={
              route.link === pathname
                ? "inline-flex items-center justify-center text-sm font-medium transition rounded-md text-primary bg-secondary p-2 border-b-4 border-sunglow-primary hover:bg-sunglow-primary  hover:border-neutral-400 focus-visible:outline-offset-2 focus-visible:ring focus-visible:ring-sunglow-primary"
                : "inline-flex items-center justify-center p-2 text-sm font-medium transition rounded-md text-secondary hover:text-highlight focus-visible:outline-none focus-visible:ring focus-visible:ring-sunglow-primary"
            }
          >
            {route.icon ? (
              <IconText
                Icon={IcGithub}
                IconSize={25}
                fill="hover:fill-sunglow-primary"
                className={
                  route.link === pathname
                    ? "transition rounded-md  active:bg-secondary active:border-b-4 active:border-sunglow-primary"
                    : ""
                }
              />
            ) : (
              route.title
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}

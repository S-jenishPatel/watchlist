"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { oswald } from "@/components/fonts";
import SearchBar from "@/components/searchBar";

import logoutUser from "@/lib/logoutUser";

import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/watchlist logo cropped.png";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { usePathname } from "next/navigation";

type TLink = {
  title: string;
  link: string;
  isActive: boolean;
};

const links: TLink[] = [
  { title: "Home", link: "/user/home", isActive: false },
  { title: "Watchlist", link: "/user/watchlist", isActive: false },
];

function Navbar() {
  const path = usePathname();
  const paths = path.split("/");
  const activeLink = paths[paths.length - 1];

  const { setTheme, theme } = useTheme();

  return (
    <div className="flex justify-between items-center border-b-2 p-4">
      <div className="flex gap-4 items-center">
        <Image src={logo} alt="Wishlist logo" className="w-14 rounded-full" />
        <Link
          href="/user/home"
          className={`text-4xl font-600 ${oswald.className} tracking-wide`}
        >
          Watchlist
        </Link>
      </div>
      <SearchBar />
      <NavigationMenu>
        <NavigationMenuList>
          {links.map((link, index) => {
            activeLink == link.title.toLowerCase()
              ? (link.isActive = true)
              : (link.isActive = false);

            return (
              <NavigationMenuItem key={index}>
                <Link href={link.link} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={
                      link.isActive
                        ? `bg-secondary text-accent-foreground ${navigationMenuTriggerStyle()}`
                        : `${navigationMenuTriggerStyle()}`
                    }
                  >
                    {link.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}
          <NavigationMenuItem>
            <Button
              className="mx-2"
              onClick={async () => {
                await logoutUser();
              }}
            >
              Logout
            </Button>
          </NavigationMenuItem>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              theme == "light" ? setTheme("dark") : setTheme("light");
            }}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default Navbar;

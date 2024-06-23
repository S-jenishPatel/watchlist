"use client";
import SearchBar from "@/components/searchBar";
import { oswald } from "@/components/fonts";
import HamburgerMenu from "@/components/hamburgerMenu";

import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/watchlist logo cropped.png";

import NavLinks from "@/components/navLinks";
import { FaBurger } from "react-icons/fa6";

function Navbar() {
  return (
    <div className="flex items-center justify-between border-b-2 p-4">
      <div className="flex gap-1 md:gap-4 items-center">
        <Image
          src={logo}
          alt="Wishlist logo"
          className="w-10 md:w-14 rounded-full"
        />
        <Link
          href="/user/home"
          className={`text-3xl md:text-4xl font-600 ${oswald.className} tracking-wide`}
        >
          Watchlist
        </Link>
      </div>

      <HamburgerMenu className="md:hidden" />

      <SearchBar className="hidden md:flex gap-2 items-center md:w-1/3" />
      <NavLinks className="hidden md:flex" />
    </div>
  );
}

export default Navbar;

import bgImage from "@/../public/Watchlist background.jpeg";
import logo from "@/../public/watchlist logo cropped.png";

import { oswald } from "@/components/fonts";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

import { MdCopyright } from "react-icons/md";
import { FaGithub, FaXTwitter, FaLinkedin, FaInstagram } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden text-white">
      {/* background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={bgImage}
          alt="Background Image"
          className="h-full object-cover"
        />
      </div>

      {/* black overlay filter */}
      <div className="absolute inset-0 -z-10 bg-black opacity-60"></div>

      {/* Logo */}
      <div className="flex gap-4 items-center justify-center mt-10 md:justify-start md:m-4">
        <Image src={logo} className="w-16 rounded-full" alt="watchlist logo" />
        <h1 className={`text-5xl ${oswald.className} tracking-wide`}>
          Watchlist
        </h1>
      </div>

      {/* landing card */}
      <div className="h-3/4 flex flex-col items-center justify-center gap-8 text-center">
        <h2 className="text-4xl font-medium">
          Your Personal Entertainment Queue
        </h2>
        <p className="w-full md:w-1/2 px-2 md:text-balance text-lg">
          Discover and organize your favorite movies and TV shows at one place
          so you won't forget to watch them ever.
        </p>
        <Link href="/login" className="w-44">
          <Button
            variant={"secondary"}
            className="w-full h-full flex justify-center items-center text-base"
          >
            Get Started <ChevronRight />
          </Button>
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex gap-4 items-center justify-center md:justify-end p-4 text-gray-400">
        <p className="flex items-center">
          <MdCopyright className="inline" />
          2024 Watchlist, Inc.
        </p>
        <div className="flex gap-3">
          <Link href="https://github.com/S-jenishPatel" target="_blank">
            <FaGithub
              size={"1.3rem"}
              className="hover:cursor-pointer hover:scale-110 hover:text-gray-100 transition-transform"
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/jenish-patel-187b9326a"
            target="_blank"
          >
            <FaLinkedin
              size={"1.3rem"}
              className="hover:cursor-pointer hover:scale-110 hover:text-gray-100 transition-transform"
            />
          </Link>
          <Link
            href="https://x.com/Jenish49350562?t=fq-Nbf9fiSP1gy9qZ_KqYw&s=08"
            target="_blank"
          >
            <FaXTwitter
              size={"1.3rem"}
              className="hover:cursor-pointer hover:scale-110 hover:text-gray-100 transition-transform"
            />
          </Link>
          <Link
            href="https://www.instagram.com/_.j.e.n.i.s.h._/"
            target="_blank"
          >
            <FaInstagram
              size={"1.3rem"}
              className="hover:cursor-pointer hover:scale-110 hover:text-gray-100 transition-transform"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}

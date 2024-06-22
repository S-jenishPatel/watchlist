import Image from "next/image";
import bgImage from "@/../public/Watchlist background.jpeg";
import logo from "@/../public/watchlist logo cropped.png";
import { oswald } from "@/components/fonts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden content-center text-white">
      {/* background image */}
      <div className="absolute inset-0 -z-20">
        <Image src={bgImage} alt="Background Image" />
      </div>

      {/* black overlay filter */}
      <div className="absolute inset-0 -z-10 bg-black opacity-60"></div>

      {/* Logo */}
      <div className="absolute top-4 left-10 flex items-center justify-center gap-4">
        <Image src={logo} className="w-16 rounded-full" alt="watchlist logo" />
        <h1 className={`text-5xl ${oswald.className} tracking-wide`}>
          Watchlist
        </h1>
      </div>

      {/* landing card */}
      <div className="w-1/2 flex flex-col items-center gap-8 mx-auto p-6">
        <h2 className="text-4xl font-medium text-center">
          Your Personal Entertainment Queue
        </h2>
        <p className="text-center text-balance text-lg">
          Discover and organize your favorite movies and TV shows at one place
          so you won't forget to watch them ever.
        </p>
        <Link href="/login" className="w-1/4">
          <Button
            variant={"secondary"}
            className="w-full h-full text-base mt-2"
          >
            Get Started <ChevronRight />
          </Button>
        </Link>
      </div>
    </main>
  );
}

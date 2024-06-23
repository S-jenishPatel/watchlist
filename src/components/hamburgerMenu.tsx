import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SearchBar from "@/components/searchBar";
import NavLinks from "@/components/navLinks";

import { FaBurger } from "react-icons/fa6";

function HamburgerMenu({ className }: { className?: string | undefined }) {
  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger asChild>
          <FaBurger className="h-8 w-8" />
        </SheetTrigger>
        <SheetContent className="w-2/3">
          <SheetHeader>
            <SheetTitle className="text-3xl">Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-8 mt-6">
            <SearchBar className="w-full" />
            <NavLinks listClassName="flex-col gap-4 items-center" />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default HamburgerMenu;

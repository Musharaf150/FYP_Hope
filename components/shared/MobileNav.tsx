import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";

const MobileNav = () => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle transition delay-900 duration-700 ease-in-out">
          <Image
            src="/assets/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer pt-1.5" />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white 
        md:hidden">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={50}
            height={50} />
          <Separator className="border border-gray-500" />
          <NavItems />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;

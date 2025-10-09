import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export default function Navbar() {
  return (
    <nav className="relative h-18 w-full bg-primary flex items-center px-6">
      {/* Left: Logo */}
      <div className="flex-shrink-0">
        <Image
          alt="logo"
          draggable={false}
          height={124}
          width={124}
          src="/logo.png"
          className="size-12"
        />
      </div>

      {/* Center: Nav Links */}
      <div className="hidden absolute left-1/2 -translate-x-1/2 lg:flex gap-4">
        <Button className="font-medium" variant={"outline"}>
          Home
        </Button>
        <Button className="font-medium">Browse Storefronts</Button>
        <Button className="font-medium">About Us</Button>
        <Button className="font-medium">Explore</Button>
      </div>

      {/* Right: Auth Button */}
      <div className="ml-auto hidden lg:block">
        <Button variant="outline" className="font-semibold" asChild>
          <Link href={"/login"}>Login / Sign Up</Link>
        </Button>
      </div>
      <div className="ml-auto block lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size={"icon"} variant={"outline"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="px-4">
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
            <Button className="font-medium" variant={"outline"}>
              Home
            </Button>
            <Button className="font-medium">Browse Storefronts</Button>
            <Button className="font-medium">About Us</Button>
            <Button className="font-medium">Explore</Button>
            <Button className="font-semibold" asChild>
              <Link href={"/login"}>Login / Sign Up</Link>
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

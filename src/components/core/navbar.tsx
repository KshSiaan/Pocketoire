"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { MenuIcon, Store } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { cn, makeImg, howl } from "@/lib/utils";
import { useCookies } from "react-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useMeStore } from "@/lib/moon/user-store";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/base";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Storefronts", href: "/storefronts" },
  { label: "About Us", href: "/about" },
  { label: "Explore", href: "/explore" },
];

export default function Navbar() {
  const path = usePathname();
  const [{ token }] = useCookies(["token"]);
  const [storefrontUrl, setStorefrontUrl] = useState<string | null>(null);
  useEffect(() => {}, []);
  const me = useMeStore((state) => state.me);

  const { data: profileData } = useQuery({
    queryKey: ["navbar_creator_profile", token],
    queryFn: async (): Promise<
      ApiResponse<{
        data: {
          storefront_url: string;
        };
      }>
    > => {
      return howl(`/creator/profile`, { token });
    },
    enabled: !!token,
  });

  useEffect(() => {
    const url = profileData?.data?.data?.storefront_url;
    if (url) {
      setStorefrontUrl(url);
    } else {
      setStorefrontUrl(null);
    }
  }, [profileData?.data?.data?.storefront_url]);
  const renderLinks = (isMobile = false) =>
    navLinks.map(({ label, href }) => (
      <Button
        key={href}
        asChild
        variant="ghost"
        className={cn(
          "font-medium rounded-none text-background",
          path === href && "border border-background",
        )}
      >
        <Link href={href}>{label}</Link>
      </Button>
    ));

  return (
    <nav className="relative h-18 w-full bg-primary flex items-center px-6">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href={"/"}>
          <Image
            alt="logo"
            draggable={false}
            height={48}
            width={48}
            src="/logo.png"
            className="size-12"
          />
        </Link>
      </div>

      {/* Center Nav (Desktop) */}
      <div className="hidden absolute left-1/2 -translate-x-1/2 lg:flex gap-4">
        {renderLinks()}
        {token && storefrontUrl && (
          <Button
            asChild
            variant="ghost"
            className={cn(
              "font-medium rounded-none text-background",
              path === `/storefront/${storefrontUrl}` &&
                "border border-background",
            )}
          >
            <Link
              href={`/storefront/${storefrontUrl}`}
              className="flex items-center gap-2"
            >
              <Store className="size-4" />
              My Store
            </Link>
          </Button>
        )}
      </div>

      {/* Auth Button (Desktop) */}
      <div className="ml-auto hidden lg:block">
        {token ? (
          <Link href={"/profile"}>
            <Avatar>
              <AvatarImage
                src={
                  me?.profile_photo
                    ? makeImg(`storage/${me?.profile_photo}`)
                    : ""
                }
              />
              <AvatarFallback className="uppercase">
                {me?.name?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <Button variant="outline" className="font-semibold" asChild>
            <Link href="/login">Login / Sign Up</Link>
          </Button>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="ml-auto block lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="px-4 space-y-3 bg-primary">
            <SheetHeader>
              <SheetTitle />
            </SheetHeader>
            {renderLinks(true)}
            {token && storefrontUrl && (
              <Button
                asChild
                variant="ghost"
                className="font-medium rounded-none text-background w-full"
              >
                <Link
                  href={`/storefront/${storefrontUrl}`}
                  className="flex items-center justify-center gap-2"
                >
                  <Store className="size-4" />
                  My Store
                </Link>
              </Button>
            )}
            {token ? (
              <Button variant={"destructive"} size={"lg"} asChild>
                <Link href={"/profile"}>
                  <Avatar>
                    <AvatarImage
                      src={
                        me?.profile_photo
                          ? makeImg(`storage/${me?.profile_photo}`)
                          : ""
                      }
                    />
                    <AvatarFallback className="uppercase">
                      {me?.name?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>{" "}
                  My Dashboard
                </Link>
              </Button>
            ) : (
              <Button variant="outline" className="font-semibold" asChild>
                <Link href="/login">Login / Sign Up</Link>
              </Button>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

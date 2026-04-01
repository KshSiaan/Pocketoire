"use client";
import { Button } from "@/components/ui/button";
import { cn, howl } from "@/lib/utils";
import Link from "next/link";
import {
  Banknote,
  ChartColumnIcon,
  LinkIcon,
  LockKeyhole,
  PackageIcon,
  UserIcon,
  Store,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/base";
import { useEffect, useState } from "react";

const staticNavs = [
  { title: "Overview", icon: ChartColumnIcon, link: "/dashboard/overview" },
  { title: "Products", icon: PackageIcon, link: "/dashboard/products" },
  { title: "Earnings", icon: Banknote, link: "/dashboard/earnings" },
  { title: "Profile", icon: UserIcon, link: "/dashboard/profile" },
  { title: "Generate Link", icon: LinkIcon, link: "/dashboard/generate-link" },
  {
    title: "Change Password",
    icon: LockKeyhole,
    link: "/dashboard/change-password",
  },
];

export default function DBNavs() {
  const path = usePathname();
  const currentLink = path.split("/").at(-1);
  const [{ token }] = useCookies(["token"]);
  const [navs, setNavs] = useState(staticNavs);

  const { data: profileData } = useQuery({
    queryKey: ["creator_profile", token],
    queryFn: async (): Promise<
      ApiResponse<{
        data: {
          storefront_url: string;
          store_name: string;
        };
      }>
    > => {
      return howl(`/creator/profile`, { token });
    },
    enabled: !!token,
  });

  useEffect(() => {
    const storefrontUrl = profileData?.data?.data?.storefront_url;

    if (storefrontUrl) {
      const storefrontNav = {
        title: "My Store",
        icon: Store,
        link: `/storefront/${storefrontUrl}`,
      };

      setNavs([...staticNavs, storefrontNav]);
    } else {
      setNavs(staticNavs);
    }
  }, [profileData?.data?.data?.storefront_url]);

  return (
    <ul className="space-y-4">
      {navs.map((x) => {
        const lastSegment = x.link.split("/").at(-1);
        const isActive = currentLink === lastSegment;

        return (
          <li key={x.title}>
            <Link href={x.link}>
              <Button
                size={"lg"}
                variant={"ghost"}
                className={cn(
                  "text-lg w-full justify-start items-center gap-3 italic transition-all duration-150 rounded-none",
                  "hover:bg-secondary hover:text-background text-muted-foreground",
                  isActive && "border-b border-secondary text-foreground",
                )}
              >
                <x.icon className="size-6" />
                {x.title}
              </Button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

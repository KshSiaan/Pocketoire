"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Banknote,
  ChartColumnIcon,
  LinkIcon,
  LockKeyhole,
  PackageIcon,
  UserIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

const navs = [
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
                  isActive && "border-b border-secondary text-foreground"
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

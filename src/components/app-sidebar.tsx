"use client";
import {
  BarChartBigIcon,
  CircleDollarSignIcon,
  CreditCardIcon,
  LayoutDashboardIcon,
  LayoutList,
  LogOutIcon,
  SettingsIcon,
  UserCogIcon,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
// import { NavSecondary } from "@/components/nav-secondary";
// import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "User Management",
      url: "/user/creator",
      icon: UserCogIcon,
      items: [
        {
          title: "Creator",
          url: "/user/creator",
        },
        {
          title: "Buyer",
          url: "/user/buyer",
        },
      ],
    },
    {
      title: "Reports & Analytics",
      url: "/report",
      icon: BarChartBigIcon,
    },
    {
      title: "Viator Commission",
      url: "/viator_commission",
      icon: CircleDollarSignIcon,
    },
    {
      title: "Expedia Commission",
      url: "/expedia_commission",
      icon: CircleDollarSignIcon,
    },
    {
      title: "Payouts",
      url: "/payouts",
      icon: CreditCardIcon,
    },
    {
      title: "Content Management",
      url: "/content",
      icon: LayoutList,
    },
    {
      title: "Settings",
      url: "/settings/tnc",
      icon: SettingsIcon,
      items: [
        {
          title: "Terms & Conditons",
          url: "/settings/tnc",
        },
        {
          title: "FAQ",
          url: "/settings/faq",
        },
        {
          title: "Privacy Poilicy",
          url: "/settings/privacy",
        },
        {
          title: "Contact Us",
          url: "/settings/contact",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="sidebar" {...props}>
      <SidebarHeader className="pt-12">
        <SidebarMenu>
          <div className="w-full flex justify-center items-center">
            <Link href={"/"}>
              <Image
                src={"/logo.png"}
                height={240}
                width={260}
                alt="icon"
                className="size-[64px]"
              />
            </Link>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <Button variant={"destructive"} className="w-full" asChild>
          <Link href="/logout">
            Logout <LogOutIcon />
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

"use client";

import * as React from "react";
import {
  BarChartBigIcon,
  BookOpen,
  Bot,
  CreditCardIcon,
  FileBadgeIcon,
  Frame,
  LayoutDashboardIcon,
  LayoutList,
  LifeBuoy,
  // biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
  Map,
  NetworkIcon,
  PieChart,
  Send,
  Settings2,
  SettingsIcon,
  SquareTerminal,
  UserCogIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import Image from "next/image";

const data = {
  // user: {
  //   name: "shadcn",
  //   email: "m@example.com",
  //   avatar: "/avatars/shadcn.jpg",
  // },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboardIcon,
    },
    {
      title: "User Management",
      url: "#",
      icon: UserCogIcon,
      items: [
        {
          title: "Creator",
          url: "#",
        },
        {
          title: "Buyer",
          url: "#",
        },
      ],
    },
    {
      title: "Affiliate Feeds",
      url: "#",
      icon: FileBadgeIcon,
    },
    {
      title: "Reports & Analytics",
      url: "#",
      icon: BarChartBigIcon,
    },
    {
      title: "Payouts",
      url: "#",
      icon: CreditCardIcon,
    },
    {
      title: "Affiliate Network",
      url: "#",
      icon: NetworkIcon,
    },
    {
      title: "Content Management",
      url: "#",
      icon: LayoutList,
    },
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
      items: [
        {
          title: "Terms & Conditons",
          url: "#",
        },
        {
          title: "FAQ",
          url: "#",
        },
        {
          title: "Privacy Poilicy",
          url: "#",
        },
        {
          title: "Contact Us",
          url: "#",
        },
      ],
    },
  ],
  // navSecondary: [
  //   {
  //     title: "Support",
  //     url: "#",
  //     icon: LifeBuoy,
  //   },
  //   {
  //     title: "Feedback",
  //     url: "#",
  //     icon: Send,
  //   },
  // ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="sidebar" {...props}>
      <SidebarHeader className="pt-12">
        <SidebarMenu>
          <div className="w-full flex justify-center items-center">
            <Image
              src={"/logo.png"}
              height={240}
              width={260}
              alt="icon"
              className="size-[64px]"
            />
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
    </Sidebar>
  );
}

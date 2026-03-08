import type { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { howl } from "@/lib/utils";
import { ApiResponse } from "@/types/base";

export default async function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return redirect("/admin/login");
  }

  const data: ApiResponse<{
    user: {
      id: number;
      name: string;
      email: string;
      profile_photo: string | null;
      account_type: string;
      saved_products: Array<{
        id: number;
        title: string;
        price: string;
        pivot: {
          user_id: number;
          product_id: number;
          created_at: string;
          updated_at: string;
        };
        product_image: {
          id: number;
          product_id: number;
          image: string;
          source: string;
          created_at: string;
          updated_at: string;
        };
      }>;
    };
  }> = await howl("/profile", {
    token,
  });

  if (data?.data?.user.account_type !== "admin") {
    return notFound();
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <h4 className="font-semibold">Dashboard Overview</h4>
          </div>
          <div className="pr-4 flex items-center gap-2">
            <Button size={"icon"} className="relative" variant={"ghost"}>
              <BellIcon />
              <div className="absolute size-3 bg-destructive rounded-full top-1 right-1"></div>
            </Button>
            <Avatar className="border">
              <AvatarImage src={"https://avatar.iran.liara.run/public"} />
              <AvatarFallback>RV</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

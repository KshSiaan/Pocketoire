import DynamicBread from "@/components/core/dynamic-bread";
import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
import { howl } from "@/lib/utils";
import type { ApiResponse } from "@/types/base";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return redirect("/login");
  }

  try {
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

    if (!data?.data?.user?.id) {
      return redirect("/logout");
    }
  } catch {
    return redirect("/logout");
  }

  return (
    <>
      <Suspense>
        <Navbar />
      </Suspense>
      <Suspense>
        <DynamicBread />
      </Suspense>
      {children}
      <Footer />
    </>
  );
}

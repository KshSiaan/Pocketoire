import DynamicBread from "@/components/core/dynamic-bread";
import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
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

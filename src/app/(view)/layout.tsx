import { CookieConsent } from "@/components/cookie-consent";
import Cookier from "@/components/core/cookier";
import DynamicBread from "@/components/core/dynamic-bread";
import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <DynamicBread />
      {children}
      <Suspense>
        <Cookier />
      </Suspense>
      <Footer />
    </>
  );
}

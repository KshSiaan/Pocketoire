import DynamicBread from "@/components/core/dynamic-bread";
import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";

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
      <Footer />
    </>
  );
}

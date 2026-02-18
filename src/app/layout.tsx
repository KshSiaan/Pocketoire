import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import GodProvider from "@/provider/god-provider";
import { Suspense } from "react";
import Cookier from "@/components/core/cookier";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Pocketoire",
  description: "Your taste inspires others-now , let it reward you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.className} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <GodProvider>
            {children}
            <Suspense>
              <Cookier />
            </Suspense>
          </GodProvider>
          <Toaster
            position="top-center"
            richColors
            closeButton
            hotkey={["x"]}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

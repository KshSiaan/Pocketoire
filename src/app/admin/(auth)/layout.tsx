import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pocketoire - Authentication",
  description: "Pocketoire - Authentication",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

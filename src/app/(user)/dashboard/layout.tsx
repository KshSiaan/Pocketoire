import DBNavs from "./db-navs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="p-12 grid grid-cols-7 gap-12 items-start">
      <div className="col-span-2 w-full border p-6 shadow-lg">
        <DBNavs />
      </div>
      <div className="col-span-5">{children}</div>
    </main>
  );
}

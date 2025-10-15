import Image from "next/image";

export default function Header({
  title,
  desc,
}: {
  title?: string;
  desc?: string;
}) {
  return (
    <header className="h-[500px] bg-primary relative pt-12">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-6xl text-background font-semibold italic">
          {title}
        </h1>
        <p className="mt-6 text-2xl font-semibold text-background">{desc}</p>
      </div>
      <div className="absolute bottom-0 w-full h-[280px]">
        <Image
          src="/extra/header.svg"
          alt="header_style"
          fill
          className="object-cover object-bottom"
        />
      </div>
    </header>
  );
}

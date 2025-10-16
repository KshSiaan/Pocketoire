import Image from "next/image";

export default function Header({
  title,
  desc,
}: {
  title?: string;
  desc?: string;
}) {
  return (
    <header className="relative bg-primary flex flex-col justify-between lg:justify-center pt-24 lg:pt-0 items-center text-center overflow-hidden h-[50vh] min-h-[300px] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] ">
      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 md:px-10 max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-background font-semibold italic leading-tight drop-shadow-md">
          {title}
        </h1>
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-background/90 max-w-3xl mx-auto">
          {desc}
        </p>
      </div>

      {/* Decorative Image */}
      <div className="absolute bottom-0 left-0 w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px]">
        <Image
          src="/extra/header.svg"
          alt="header_style"
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>
    </header>
  );
}

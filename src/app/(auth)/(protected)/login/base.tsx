import Image from "next/image";
import Form from "./form";

export default function Base({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle: string;
  image: string;
}) {
  return (
    <>
      {/* Left Side (Content) */}
      <section className="w-full h-full flex flex-col justify-center items-center gap-6 px-4 py-8 text-center">
        <Image
          src="/logo.png"
          height={240}
          width={260}
          alt="icon"
          className="size-20 sm:size-24 md:size-28"
        />

        <div className="space-y-2 max-w-sm">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-destructive">
            {title}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {subtitle}
          </p>
        </div>

        <Form />
      </section>

      {/* Right Side (Image / Hidden on Small) */}
      <section
        className="hidden lg:block w-full h-full rounded-xl bg-primary bg-cover bg-center shadow-xl"
        style={{ backgroundImage: `url('${image}')` }}
      />
    </>
  );
}

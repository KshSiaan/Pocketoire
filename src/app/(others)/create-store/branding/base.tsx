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
      <section className="w-full h-full flex flex-col justify-center items-center gap-4 ">
        <Image
          src={"/logo.png"}
          height={240}
          width={260}
          alt="icon"
          className="size-[100px]"
        />
        <div className="space-y-2 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-destructive">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <Form />
      </section>
      <section
        className="w-full h-full rounded-xl bg-primary bg-cover bg-center shadow-xl"
        style={{ backgroundImage: `url('${image}')` }}
      />
    </>
  );
}

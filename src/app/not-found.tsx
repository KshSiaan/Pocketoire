import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center items-center flex-col gap-12 h-dvh">
        <Image
          height={800}
          width={800}
          src={"/extra/404.svg"}
          alt="not_found_illustration"
          className="w-[30dvw] mx-auto"
        />
        <h1 className="text-center font-bold text-6xl my-6">Page not found</h1>
        <p>
          Oops! The page you’re looking for doesn’t exist. It might have been
          moved or deleted.
        </p>
        <Button variant={"secondary"} size={"lg"} asChild>
          <Link href={"/"}>Go Back Home </Link>
        </Button>
      </div>
      <Footer />
    </>
  );
}

import { Button } from "@/components/ui/button";
import Header from "./_home/header";
import { ArrowRightIcon } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className=" p-12 flex justify-between items-center">
          <h2 className="text-3xl font-semibold">Featured Products</h2>
          <Button variant={"outline"}>
            View All <ArrowRightIcon />
          </Button>
        </div>
      </main>
    </>
  );
}

"use client";
import { Editor } from "primereact/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Page() {
  const navig = useRouter();
  return (
    <main className="space-y-6">
      <h2>Question</h2>
      <Input />
      <h2>Answer</h2>
      <Editor value="Always bet on Prime!" style={{ height: "320px" }} />
      <div className="space-x-2">
        <Button
          variant={"outline"}
          onClick={() => {
            navig.back();
          }}
        >
          Go back
        </Button>
        <Button variant={"secondary"}>Save FAQ</Button>
      </div>
    </main>
  );
}

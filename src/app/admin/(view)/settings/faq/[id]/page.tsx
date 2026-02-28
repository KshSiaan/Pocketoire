"use client";
import { Editor } from "primereact/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Page() {
  const navig = useRouter();
  return <main className="space-y-6"></main>;
}

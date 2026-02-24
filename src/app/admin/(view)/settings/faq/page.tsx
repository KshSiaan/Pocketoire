"use client";
import { Button } from "@/components/ui/button";
import { howl } from "@/lib/utils";
import { ApiResponse } from "@/types/base";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Edit, Loader2Icon, PlusIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const { data, isPending } = useQuery({
    queryKey: ["faq"],
    queryFn: async (): Promise<
      ApiResponse<
        Array<{
          id: number;
          question: string;
          answer: string;
        }>
      >
    > => {
      return howl(`/faq`);
    },
  });

  // const { mutate } = useMutation({
  //   mutationKey: ["update_faq"],
  //   mutationFn: (): Promise<ApiResponse<any>> => {
  //     return howl(`/admin/faq`, {
  //       method: "POST",
  //       body: {
  //         content,
  //       },
  //       token,
  //     });
  //   },
  //   onError: (err) => {
  //     toast.error(err.message ?? "Failed to complete this request");
  //   },
  //   onSuccess: (res) => {
  //     toast.success(res.message ?? "Success!");
  //   },
  // });

  return (
    <main>
      <div className="w-full flex justify-between items-center">
        <h4 className="text-2xl">FAQ Management</h4>
        <Button variant={"secondary"} asChild>
          <Link href="faq/add">
            <PlusIcon />
            Add New FAQ
          </Link>
        </Button>
      </div>
      {isPending && (
        <div className={`flex justify-center items-center h-24 mx-auto`}>
          <Loader2Icon className={`animate-spin`} />
        </div>
      )}
      <div className="mt-12 space-y-3">
        {data?.data?.map((faq) => (
          <div
            className="flex justify-between w-full items-center p-6 border bg-white shadow"
            key={faq.id}
          >
            <div className="">
              <h3 className="text-lg font-bold">{faq.question}</h3>
              <p className="text-sm">{faq.answer}</p>
            </div>
            <div className="space-x-2">
              <Button variant={"outline"} size={"icon-sm"} asChild>
                <Link href={`faq/${faq.id}`}>
                  {" "}
                  <Edit />
                </Link>
              </Button>
              <Button
                variant={"outline"}
                className="text-destructive"
                size={"icon-sm"}
              >
                <Trash2Icon />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

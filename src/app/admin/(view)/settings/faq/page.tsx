"use client";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  Dialog,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { howl } from "@/lib/utils";
import type { ApiResponse } from "@/types/base";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Loader2Icon, PlusIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { Editor } from "primereact/editor";
import React from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

export default function Page() {
  const qcl = useQueryClient();
  const [{ token }] = useCookies(["token"]);
  const [editableFaq, setEditableFaq] = React.useState<FaqItem | null>(null);
  const [editOpen, setEditOpen] = React.useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["faq"],
    queryFn: async (): Promise<ApiResponse<FaqItem[]>> => {
      return howl(`/faq`);
    },
  });

  const { mutate, isPending: updating } = useMutation({
    mutationKey: ["update_faq"],
    mutationFn: (payload: FaqItem): Promise<ApiResponse<unknown>> => {
      return howl(`/admin/faq/${payload.id}`, {
        method: "PATCH",
        body: {
          question: payload.question,
          answer: payload.answer,
        },
        token,
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: async (res) => {
      toast.success(res.message ?? "Success!");
      await qcl.invalidateQueries({ queryKey: ["faq"] });
      setEditOpen(false);
      setEditableFaq(null);
    },
  });

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
              <Button
                variant={"outline"}
                size={"icon-sm"}
                onClick={() => {
                  setEditableFaq(faq);
                  setEditOpen(true);
                }}
              >
                <Edit />
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

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit FAQ {editableFaq?.id}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <h2>Question</h2>
              <Input
                value={editableFaq?.question ?? ""}
                onChange={(e) =>
                  setEditableFaq((prev) =>
                    prev
                      ? {
                          ...prev,
                          question: e.target.value,
                        }
                      : prev,
                  )
                }
              />
            </div>

            <div className="space-y-2">
              <h2>Answer</h2>
              <Editor
                value={editableFaq?.answer ?? ""}
                onTextChange={(e) =>
                  setEditableFaq((prev) =>
                    prev
                      ? {
                          ...prev,
                          answer: e.textValue ?? "",
                        }
                      : prev,
                  )
                }
                style={{ height: "320px" }}
              />
            </div>
          </div>

          <DialogFooter className="space-x-2">
            <Button
              variant={"outline"}
              onClick={() => {
                setEditOpen(false);
                setEditableFaq(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant={"secondary"}
              disabled={
                updating ||
                !editableFaq?.question?.trim() ||
                !editableFaq?.answer?.trim()
              }
              onClick={() => {
                if (editableFaq) {
                  mutate(editableFaq);
                }
              }}
            >
              {updating ? "Saving..." : "Save FAQ"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

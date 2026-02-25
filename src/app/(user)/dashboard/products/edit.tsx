"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { base_api, base_url, howl } from "@/lib/utils";
import type { ApiResponse } from "@/types/base";
import { PenIcon } from "lucide-react";
import Image from "next/image";

const editProductSchema = z.object({
  album_id: z.string().optional(),
  product_url: z
    .union([z.url("Please enter a valid URL"), z.literal("")])
    .optional(),
  image: z.instanceof(File).optional(),
  product_name: z.string().optional(),
  description: z.string().optional(),
  price: z
    .union([
      z.string().regex(/^(\d+)(\.\d+)?$/, "Price must be a valid number"),
      z.literal(""),
    ])
    .optional(),
  currency: z.string().max(3, "Use a 3-letter currency code").optional(),
});

type EditProductSchema = z.infer<typeof editProductSchema>;

export default function EditProduct({
  data,
}: {
  data: {
    id: number;
    user_id: number;
    storefront_id: number;
    album_id: number;
    title: string;
    description: string;
    price: string;
    currency: string;
    product_link: string;
    viator_product_code: string;
    status: string;
    created_at: string;
    updated_at: string;
    clicks_count: number;
    sales_count: number;
    sales_sum_creator_commission?: string;
    product_image: {
      id: number;
      product_id: number;
      image: string;
      source: string;
      created_at: string;
      updated_at: string;
    };
  };
}) {
  const [{ token }] = useCookies(["token"]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navig = useRouter();

  const { data: albums, isPending: loadingAlbums } = useQuery({
    queryKey: ["albums_list"],
    queryFn: async (): Promise<
      ApiResponse<
        Array<{
          id: number;
          name: string;
          slug: string;
          description: string;
        }>
      >
    > => {
      return howl(`/storefront/albums`, {
        token,
      });
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["edit_product", data.id],
    mutationFn: async (formData: FormData): Promise<ApiResponse<null>> => {
      if (!token) {
        throw new Error("Authentication token missing");
      }

      const res = await fetch(`${base_url}${base_api}/product/${data.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const text = await res.text();
      const responseData = text ? JSON.parse(text) : {};

      if (!res.ok) {
        throw new Error(responseData.message ?? "Failed to update product");
      }

      return responseData;
    },
    onError: (err: unknown) => {
      const message =
        err instanceof Error ? err.message : "Failed to complete this request";

      toast.error(message);
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Product updated");
      navig.refresh();
      setDialogOpen(false);
    },
  });

  const form = useForm<EditProductSchema>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      album_id: data.album_id ? String(data.album_id) : "",
      product_url: data.product_link ?? "",
      image: undefined,
      product_name: data.title ?? "",
      description: data.description ?? "",
      price: data.price ?? "",
      currency: data.currency ?? "",
    },
  });

  function onSubmit(values: EditProductSchema) {
    const formData = new FormData();
    formData.append("album_id", values.album_id ?? "");
    formData.append("product_url", values.product_url ?? "");
    if (values.image) {
      formData.append("image", values.image);
    }
    formData.append("product_name", values.product_name ?? "");
    formData.append("description", values.description ?? "");
    formData.append("price", values.price ?? "");
    formData.append("currency", values.currency ?? "");

    mutate(formData);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="hover:text-secondary hover:bg-secondary/20"
          size={"icon"}
        >
          <PenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-none! min-w-1/2! max-h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-4xl italic">Edit Product</DialogTitle>
          <DialogDescription className="text-lg">
            Update your affiliate product details
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-muted-foreground">
                  Media & Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="product_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product URL</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-none"
                          placeholder="https://shop.live.rc.viator.com/..."
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          className="rounded-none"
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          onChange={(event) => {
                            const selectedFile = event.target.files?.[0];
                            field.onChange(selectedFile);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="border-1 border-dashed border-secondary p-4 rounded-lg">
                  <div className="flex justify-between items-center gap-6 h-24">
                    <Image
                      height={128}
                      width={240}
                      alt="product_icon"
                      src={data.product_image?.image ?? "/image/product.jpg"}
                      className="h-24 w-34 rounded-lg object-cover"
                    />
                    <div className="flex-1 h-full flex flex-col justify-between items-start">
                      <h3 className="text-lg font-bold">{data.title}</h3>
                      <p>{data.viator_product_code || "Product"}</p>
                      <p>
                        <span className="font-bold">${data.price}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-muted-foreground">
                  Product Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="product_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-none"
                          placeholder="Product name"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="resize-none h-24"
                          placeholder="Product description"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="album_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Album</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an album" />
                          </SelectTrigger>
                          <SelectContent>
                            {!loadingAlbums &&
                              albums?.data?.map((album) => (
                                <SelectItem
                                  key={album.id}
                                  value={album.id.toString()}
                                >
                                  {album.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-muted-foreground">Pricing</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="195.5"
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="EUR"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"outline"} className="border-primary">
                  Cancel
                </Button>
              </DialogClose>
              <Button variant={"secondary"} type="submit" disabled={isPending}>
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

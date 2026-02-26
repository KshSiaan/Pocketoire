"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon } from "lucide-react";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ApiResponse } from "@/types/base";
import { useCookies } from "react-cookie";
import { base_api, base_url, howl } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const addProductSchema = z.object({
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

type AddProductSchema = z.infer<typeof addProductSchema>;

export default function AddProduct() {
  const [{ token }] = useCookies(["token"]);
  const form = useForm<AddProductSchema>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      album_id: "",
      product_url: "",

      image: undefined,
      product_name: "",
      description: "",
      currency: "",
    },
  });

  const prod_url = form.watch("product_url");
  const [dialogOpen, setDialogOpen] = useState(false);
  const navig = useRouter();

  const { data: viatorProd, isPending: viatorLoader } = useQuery({
    queryKey: ["prod_URL", prod_url],
    queryFn: async (): Promise<
      ApiResponse<{
        product_name: string;
        description: string;
        price: number;
        currency: string;
        product_url: string;
        image_url: string;
        albums: Array<{
          id: number;
          storefront_id: number;
          name: string;
          slug: string;
          description: string;
          created_at: string;
          updated_at: string;
        }>;
      }>
    > => {
      return howl(`/storefront/albums`, {
        token,
      });
    },
    enabled: !!prod_url,
  });
  const { data, isPending: loading } = useQuery({
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
    mutationKey: ["add_product"],
    mutationFn: async (formData: FormData): Promise<ApiResponse<null>> => {
      if (!token) {
        throw new Error("Authentication token missing");
      }

      const res = await fetch(`${base_url}${base_api}/product`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) {
        throw new Error(data.message ?? "Failed to add product");
      }

      return data;
    },

    onError: (err: unknown) => {
      const message =
        err instanceof Error ? err.message : "Failed to complete this request";

      toast.error(message);
    },

    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      navig.refresh();
      setDialogOpen(false);
    },
  });

  function onSubmit(values: AddProductSchema) {
    console.log(values);
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
        <Button variant={"secondary"}>
          <PlusIcon />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-none! min-w-1/2! max-h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-4xl italic">Add New Product</DialogTitle>
          <DialogDescription className="text-lg">
            Add a new affiliate product to your store
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
                      <FormLabel>Image</FormLabel>
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
                          placeholder="Louvre Museum Paris Essential Guided Tour..."
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
                          placeholder="This 2.5 hour semi-private guided tour..."
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
                      <FormLabel>Album ID</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an album" />
                          </SelectTrigger>
                          <SelectContent>
                            {!loading &&
                              data?.data?.map((album) => (
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
                      <FormLabel>Price</FormLabel>
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
                Add Product
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

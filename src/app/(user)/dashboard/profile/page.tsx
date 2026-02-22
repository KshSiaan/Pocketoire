"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { howl, makeImg } from "@/lib/utils";
import { ApiResponse } from "@/types/base";
import { useQuery } from "@tanstack/react-query";
import { CameraIcon, GlobeIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useCookies } from "react-cookie";
import { FaInstagram, FaTiktok } from "react-icons/fa";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["creator_profile"],
    queryFn: async (): Promise<
      ApiResponse<{
        data: {
          id: number;
          store_id: number;
          store_name: string;
          store_bio: string;
          name: string;
          profile_photo: string;
          cover_photo: string;
          email: string;
          storefront_url: string;
          tiktok_link: any;
          instagram_link: any;
        };
      }>
    > => {
      return howl(`/creator/profile`, { token });
    },
  });
  return (
    <main>
      <h1 className="text-4xl italic font-bold">Profile Settings</h1>
      <h3 className="text-lg mt-2">
        Manage your account and storefront settings
      </h3>
      <Card>
        <CardHeader>
          <CardTitle>Store Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full aspect-[3/1] relative mb-[70px]">
            <Image
              src={
                data?.data.data.cover_photo
                  ? makeImg(`storage/${data.data.data.cover_photo}`)
                  : "https://avatar.iran.liara.run/public"
              }
              fill
              alt="cover"
              className="object-cover rounded-lg z-10"
            />

            <Button
              className="absolute z-20 right-2 rounded-full text-destructive bottom-2"
              variant={"outline"}
              size={"icon-lg"}
            >
              <CameraIcon />
            </Button>
            <div className="size-[120px] absolute -bottom-[60px] left-12 z-30">
              <Avatar className="size-full z-30 border-4 border-background">
                <AvatarImage
                  src={
                    data?.data.data.profile_photo
                      ? makeImg(`storage/${data.data.data.profile_photo}`)
                      : "https://avatar.iran.liara.run/public"
                  }
                />
                <AvatarFallback>UI</AvatarFallback>
              </Avatar>
              <Button
                className="absolute z-30 right-2 rounded-full text-destructive bottom-2"
                variant={"outline"}
                size={"icon-sm"}
              >
                <CameraIcon />
              </Button>
            </div>
          </div>
          <div className="space-y-4 pt-12!">
            <Label className="text-lg italic">Store Name *</Label>
            <Input
              defaultValue={data?.data?.data?.store_name || ""}
              placeholder={data?.data.data.store_name || "John Smith"}
            />
            <Label className="text-lg italic">Bio *</Label>
            <Textarea
              defaultValue={data?.data.data.store_bio || ""}
              placeholder={data?.data.data.store_bio || "About the store"}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="size-[120px] relative">
            <Avatar className="size-full z-30 border-4 border-background">
              <AvatarImage
                src={
                  data?.data.data.profile_photo
                    ? makeImg(`storage/${data.data.data.profile_photo}`)
                    : "https://avatar.iran.liara.run/public"
                }
              />
              <AvatarFallback>UI</AvatarFallback>
            </Avatar>
            <Button
              className="absolute z-30 right-2 rounded-full text-destructive bottom-2"
              variant={"outline"}
              size={"icon-sm"}
            >
              <CameraIcon />
            </Button>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 mt-6">
            <div className="space-y-4">
              <Label className="text-lg italic">Full Name *</Label>
              <Input
                defaultValue={data?.data?.data?.name || ""}
                placeholder={data?.data.data.name || "John Smith"}
              />
            </div>
            <div className="space-y-4">
              <Label className="text-lg italic">Email *</Label>
              <Input
                defaultValue={data?.data?.data?.email || ""}
                placeholder={data?.data.data.email || "JohnSmith@gmail.com"}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="w-full grid grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Storefront Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label className="text-lg italic">Storefront URL *</Label>
              <InputGroup>
                <InputGroupInput
                  defaultValue={data?.data?.data?.storefront_url || ""}
                  placeholder={data?.data.data.storefront_url || "xyz"}
                />
                <InputGroupAddon align={"inline-start"}>
                  https://pocketoire.com/
                </InputGroupAddon>
              </InputGroup>
              <div className="rounded-lg w-full bg-[#F3EBDA] flex items-center justify-start p-2 text-muted-foreground gap-2">
                <GlobeIcon className="size-5" />
                Pocketoire.com/{data?.data.data.storefront_url || "fashion123"}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label className="text-lg italic">Instagram *</Label>
              <InputGroup>
                <InputGroupInput
                  defaultValue={data?.data?.data?.instagram_link || ""}
                  placeholder={
                    data?.data.data.instagram_link || "instagram account URL"
                  }
                />
                <InputGroupAddon align={"inline-start"}>
                  <FaInstagram className="text-secondary" />
                </InputGroupAddon>
              </InputGroup>
              <Label className="text-lg italic">Tiktok *</Label>
              <InputGroup>
                <InputGroupInput
                  defaultValue={data?.data?.data?.tiktok_link || ""}
                  placeholder={
                    data?.data.data.tiktok_link || "tiktok account URL"
                  }
                />
                <InputGroupAddon align={"inline-start"}>
                  <FaTiktok className="text-secondary" />
                </InputGroupAddon>
              </InputGroup>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

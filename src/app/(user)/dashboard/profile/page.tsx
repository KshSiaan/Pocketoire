"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { base_api, base_url, howl, makeImg } from "@/lib/utils";
import type { ApiResponse } from "@/types/base";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CameraIcon, GlobeIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useCookies } from "react-cookie";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { toast } from "sonner";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const queryClient = useQueryClient();
  const profilePhotoInputRef = useRef<HTMLInputElement | null>(null);
  const coverPhotoInputRef = useRef<HTMLInputElement | null>(null);

  const [storeName, setStoreName] = useState("");
  const [storeBio, setStoreBio] = useState("");
  const [name, setName] = useState("");
  const [storefrontUrl, setStorefrontUrl] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [tiktokLink, setTiktokLink] = useState("");
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

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
          stripe_account_id: string;
          stripe_onboarded: number;
        };
      }>
    > => {
      return howl(`/creator/profile`, { token });
    },
  });

  useEffect(() => {
    const profile = data?.data?.data;
    if (!profile) {
      return;
    }

    setStoreName(profile.store_name ?? "");
    setStoreBio(profile.store_bio ?? "");
    setName(profile.name ?? "");
    setStorefrontUrl(profile.storefront_url ?? "");
    setInstagramLink(profile.instagram_link ?? "");
    setTiktokLink(profile.tiktok_link ?? "");
  }, [data?.data?.data]);

  useEffect(() => {
    return () => {
      if (profilePreview) {
        URL.revokeObjectURL(profilePreview);
      }
      if (coverPreview) {
        URL.revokeObjectURL(coverPreview);
      }
    };
  }, [profilePreview, coverPreview]);
  // these are the fields that can be edited by the user and these are the fields that are changable by the API to update the profile
  // store_name:string
  // store_bio:string
  // name:string
  // storefront_url:string
  // tiktok_link:string
  // instagram_link:string
  // profile_photo:FILE
  // cover_photo:FILE

  const { mutate, isPending: isUpdating } = useMutation({
    mutationKey: ["store_profile"],
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("store_name", storeName);
      formData.append("store_bio", storeBio);
      formData.append("name", name);
      formData.append("storefront_url", storefrontUrl);
      formData.append("instagram_link", instagramLink);
      formData.append("tiktok_link", tiktokLink);

      if (profilePhotoFile) {
        formData.append("profile_photo", profilePhotoFile);
      }

      if (coverPhotoFile) {
        formData.append("cover_photo", coverPhotoFile);
      }

      const res = await fetch(`${base_url}${base_api}/creator/profile`, {
        method: "PATCH",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseData = (await res
        .json()
        .catch(() => ({}))) as ApiResponse<null>;
      if (!res.ok) {
        throw new Error(responseData?.message || "Failed to update profile");
      }

      return responseData;
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to complete this request");
    },
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({ queryKey: ["creator_profile"] });
      toast.success(res.message ?? "Success!");

      setProfilePhotoFile(null);
      setCoverPhotoFile(null);

      if (profilePreview) {
        URL.revokeObjectURL(profilePreview);
        setProfilePreview(null);
      }

      if (coverPreview) {
        URL.revokeObjectURL(coverPreview);
        setCoverPreview(null);
      }
    },
  });

  const onPickProfilePhoto = () => {
    profilePhotoInputRef.current?.click();
  };

  const onPickCoverPhoto = () => {
    coverPhotoInputRef.current?.click();
  };

  const onProfileFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (profilePreview) {
      URL.revokeObjectURL(profilePreview);
    }

    setProfilePhotoFile(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  const onCoverFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (coverPreview) {
      URL.revokeObjectURL(coverPreview);
    }

    setCoverPhotoFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };
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
                coverPreview
                  ? coverPreview
                  : data?.data.data.cover_photo
                    ? makeImg(`storage/${data.data.data.cover_photo}`)
                    : "https://avatar.iran.liara.run/public"
              }
              fill
              unoptimized
              alt="cover"
              className="object-cover rounded-lg z-10"
            />

            <Button
              className="absolute z-20 right-2 rounded-full text-destructive bottom-2"
              variant={"outline"}
              size={"icon-lg"}
              type="button"
              onClick={onPickCoverPhoto}
              disabled={isUpdating}
            >
              <CameraIcon />
            </Button>
            <div className="size-[120px] absolute -bottom-[60px] left-12 z-30">
              <Avatar className="size-full z-30 border-4 border-background">
                <AvatarImage
                  src={
                    profilePreview
                      ? profilePreview
                      : data?.data.data.profile_photo
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
                type="button"
                onClick={onPickProfilePhoto}
                disabled={isUpdating}
              >
                <CameraIcon />
              </Button>
            </div>
          </div>
          <div className="space-y-4 pt-12!">
            <Label className="text-lg italic">Store Name *</Label>
            <Input
              value={storeName}
              placeholder={data?.data.data.store_name || "John Smith"}
              onChange={(event) => setStoreName(event.target.value)}
            />
            <Label className="text-lg italic">Bio *</Label>
            <Textarea
              value={storeBio}
              placeholder={data?.data.data.store_bio || "About the store"}
              onChange={(event) => setStoreBio(event.target.value)}
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
                  profilePreview
                    ? profilePreview
                    : data?.data.data.profile_photo
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
              type="button"
              onClick={onPickProfilePhoto}
              disabled={isUpdating}
            >
              <CameraIcon />
            </Button>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 mt-6">
            <div className="space-y-4">
              <Label className="text-lg italic">Full Name *</Label>
              <Input
                value={name}
                placeholder={data?.data.data.name || "John Smith"}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="space-y-4">
              <Label className="text-lg italic">Email *</Label>
              <Input
                value={data?.data?.data?.email || ""}
                placeholder={data?.data.data.email || "JohnSmith@gmail.com"}
                readOnly
                disabled
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
                  value={storefrontUrl}
                  placeholder={data?.data.data.storefront_url || "xyz"}
                  onChange={(event) => setStorefrontUrl(event.target.value)}
                />
                <InputGroupAddon align={"inline-start"}>
                  https://pocketoire.com/
                </InputGroupAddon>
              </InputGroup>
              <div className="rounded-lg w-full bg-[#F3EBDA] flex items-center justify-start p-2 text-muted-foreground gap-2">
                <GlobeIcon className="size-5" />
                Pocketoire.com/{storefrontUrl || "fashion123"}
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
                  value={instagramLink}
                  placeholder={
                    data?.data.data.instagram_link || "instagram account URL"
                  }
                  onChange={(event) => setInstagramLink(event.target.value)}
                />
                <InputGroupAddon align={"inline-start"}>
                  <FaInstagram className="text-secondary" />
                </InputGroupAddon>
              </InputGroup>
              <Label className="text-lg italic">Tiktok *</Label>
              <InputGroup>
                <InputGroupInput
                  value={tiktokLink}
                  placeholder={
                    data?.data.data.tiktok_link || "tiktok account URL"
                  }
                  onChange={(event) => setTiktokLink(event.target.value)}
                />
                <InputGroupAddon align={"inline-start"}>
                  <FaTiktok className="text-secondary" />
                </InputGroupAddon>
              </InputGroup>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full flex justify-end mt-6">
        <Button
          type="button"
          onClick={() => mutate()}
          disabled={isPending || isUpdating}
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <input
        ref={profilePhotoInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onProfileFileChange}
      />
      <input
        ref={coverPhotoInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onCoverFileChange}
      />
    </main>
  );
}

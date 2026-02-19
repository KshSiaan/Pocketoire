"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageIcon, UserCircle2Icon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useStoreCreator } from "@/lib/moon/create-store";

export default function Form() {
  const navig = useRouter();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ profile?: string; cover?: string }>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    setProfileImage(useStoreCreator.getState().profile_photo);
    setCoverImage(useStoreCreator.getState().cover_photo);

    if (useStoreCreator.getState().profile_photo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(useStoreCreator.getState().profile_photo as Blob);
    }
    if (useStoreCreator.getState().cover_photo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(useStoreCreator.getState().cover_photo as Blob);
    }
  }, []);
  const validateImage = (file: File): string | null => {
    // Check file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return "Please upload a valid image (JPG, PNG, or WEBP)";
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return "Image size must be less than 5MB";
    }

    return null;
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateImage(file);
    if (error) {
      setErrors((prev) => ({ ...prev, profile: error }));
      toast.error(error);
      return;
    }

    setProfileImage(file);
    setErrors((prev) => ({ ...prev, profile: undefined }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateImage(file);
    if (error) {
      setErrors((prev) => ({ ...prev, cover: error }));
      toast.error(error);
      return;
    }

    setCoverImage(file);
    setErrors((prev) => ({ ...prev, cover: undefined }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    setProfilePreview(null);
    setErrors((prev) => ({ ...prev, profile: undefined }));
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    setCoverPreview(null);
    setErrors((prev) => ({ ...prev, cover: undefined }));
  };

  const handleSubmit = async () => {
    // Validate both images are uploaded
    if (!profileImage || !coverImage) {
      toast.error("Please upload both profile and cover images");
      return;
    }

    // Check for any validation errors
    if (errors.profile || errors.cover) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for submission
      // const formData = new FormData();
      // formData.append("profileImage", profileImage);
      // formData.append("coverImage", coverImage);

      useStoreCreator.getState().setProfilePhoto(profileImage);
      useStoreCreator.getState().setCoverPhoto(coverImage);

      // toast.success("Images uploaded successfully!");
      navig.push("/create-store/about");
    } catch (error) {
      toast.error("Failed to upload images. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-2/3 space-y-6! mt-6">
      <div>
        <Label className="text-destructive">Profile Picture *</Label>
        <label className="cursor-pointer">
          <div className="border border-secondary border-dashed rounded-lg py-6 text-center space-y-4 w-full hover:border-primary transition-colors">
            {profilePreview ? (
              <div className="relative">
                <Image
                  src={profilePreview}
                  alt="Profile preview"
                  width={200}
                  height={200}
                  className="mx-auto rounded-lg object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.preventDefault();
                    removeProfileImage();
                  }}
                >
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <>
                <UserCircle2Icon className="mx-auto text-muted-foreground size-8" />
                <h4 className="text-xl">Upload Profile Picture</h4>
                <p className="text-sm text-muted-foreground">
                  Recommended: 200x200px, JPG, PNG, or WEBP (Max 5MB)
                </p>
              </>
            )}
            <input
              type="file"
              className="hidden"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleProfileChange}
            />
          </div>
        </label>
        {errors.profile && (
          <p className="text-destructive text-sm mt-1">{errors.profile}</p>
        )}
      </div>

      <div className="h-2"></div>

      <div>
        <Label className="text-destructive">Cover Picture *</Label>
        <label className="cursor-pointer">
          <div className="border border-secondary border-dashed rounded-lg py-6 text-center space-y-4 w-full hover:border-primary transition-colors">
            {coverPreview ? (
              <div className="relative">
                <Image
                  src={coverPreview}
                  alt="Cover preview"
                  width={400}
                  height={200}
                  className="mx-auto rounded-lg object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.preventDefault();
                    removeCoverImage();
                  }}
                >
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <>
                <ImageIcon className="mx-auto text-muted-foreground size-8" />
                <h4 className="text-xl">Upload Cover Photo</h4>
                <p className="text-sm text-muted-foreground">
                  Recommended: 1200x400px, JPG, PNG, or WEBP (Max 5MB)
                </p>
              </>
            )}
            <input
              type="file"
              className="hidden"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleCoverChange}
            />
          </div>
        </label>
        {errors.cover && (
          <p className="text-destructive text-sm mt-1">{errors.cover}</p>
        )}
      </div>

      <div className="h-2"></div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="border-primary"
          onClick={() => {
            navig.back();
          }}
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button
          variant={"secondary"}
          onClick={handleSubmit}
          disabled={isSubmitting || !profileImage || !coverImage}
        >
          {isSubmitting ? "Uploading..." : "Continue"}
        </Button>
      </div>
    </div>
  );
}

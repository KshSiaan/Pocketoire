"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStoreCreator } from "@/lib/moon/create-store";

export default function Form() {
  const navig = useRouter();
  const [name, setName] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [urlError, setUrlError] = React.useState("");
  useEffect(() => {
    setName(useStoreCreator.getState().storename || "");
    setUrl(useStoreCreator.getState().storeurl || "");
  }, []);
  const isValidUrl = (urlString: string): boolean => {
    if (!urlString.trim()) return false;
    try {
      new URL(
        urlString.startsWith("http") ? urlString : `https://${urlString}`,
      );
      return true;
    } catch {
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    if (value && !isValidUrl(value)) {
      setUrlError("Please enter a valid URL");
    } else {
      setUrlError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidUrl(url)) {
      setUrlError("Please enter a valid URL");
      return;
    }
    useStoreCreator.getState().setNameAndUrl(name, url);
    navig.push("/create-store/branding");
  };
  return (
    <div className="w-2/3 space-y-6 mt-6">
      <Label className="text-destructive">Store Name</Label>
      <Input
        placeholder="Enter your store name"
        className="bg-white"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Label className="text-destructive">Store URL</Label>
      <Input
        placeholder="Enter your store URL"
        className="bg-white"
        value={url}
        onChange={handleUrlChange}
      />
      {urlError && <p className="text-xs text-destructive">{urlError}</p>}
      <div className="p-2 bg-zinc-100 text-sm">
        pocketoire.com/<span className="text-destructive">{url}</span>
      </div>
      <p className="text-xs">This will be your unique storefront URL</p>
      <Button
        variant={"secondary"}
        className="w-full"
        onClick={handleSubmit}
        disabled={!url || !isValidUrl(url)}
      >
        {/* <Link href={"/create-store/branding"}></Link> */}
        Continue
      </Button>
    </div>
  );
}

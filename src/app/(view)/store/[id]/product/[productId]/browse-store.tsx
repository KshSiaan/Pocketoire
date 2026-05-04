"use client";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

type BrowseStoreData = {
  id?: number;
  slug?: string;
  title?: string;
  price?: string | number | null;
  currency?: string;
  product_image?: {
    image?: string | null;
  };
  storefront?: {
    id?: number | null;
    slug?: string;
    name?: string;
  };
};

type HistoryItem = {
  id: number;
  slug: string;
  title: string;
  image: string | null;
  price: string | number | null;
  currency: string;
  store: {
    id: number | null;
    slug: string;
    name: string;
  };
};

export default function BrowseStore({ data }: { data: BrowseStoreData }) {
  const [{ historyToken }, setCookie] = useCookies(["historyToken"]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: write cookie when viewed product changes
  useEffect(() => {
    if (!data?.id) return;

    let historyList: HistoryItem[] = [];

    // ✅ safely parse existing cookie
    try {
      const parsed = historyToken ? JSON.parse(historyToken) : [];
      historyList = Array.isArray(parsed) ? parsed : [];
    } catch {
      historyList = [];
    }

    // ✅ remove duplicate if already exists
    historyList = historyList.filter((item) => item.id !== data.id);

    // ✅ create new product entry
    const newItem = {
      id: data.id,
      slug: data.slug ?? "",
      title: data.title ?? "",
      image: data?.product_image?.image ?? null,
      price: data.price ?? null,
      currency: data.currency ?? "",
      store: {
        id: data?.storefront?.id ?? null,
        slug: data?.storefront?.slug ?? "",
        name: data?.storefront?.name ?? "",
      },
    };

    // ✅ add to front (most recent first)
    historyList.unshift(newItem);

    // ✅ keep max 4 items
    historyList = historyList.slice(0, 4);

    // ✅ write cookie
    setCookie("historyToken", JSON.stringify(historyList), {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
  }, [data?.id]); // 🔥 IMPORTANT

  return null;
}

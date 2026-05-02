"use client";
import type { ApiResponse } from "@/types/base";
import { howl } from "../utils";

export async function editAlbumApi(
  albumId: number,
  body: {
    name: string;
    description: string;
  },
  token?: string,
): Promise<ApiResponse<null>> {
  return howl(`/storefront/albums/${albumId}`, {
    method: "PATCH",
    body,
    token
  });
}

export async function deleteAlbumApi(
  albumId: number,
    token?: string,
): Promise<ApiResponse<null>> {
  return howl(`/storefront/albums/${albumId}`, {
    method: "DELETE",
    token
  });
}

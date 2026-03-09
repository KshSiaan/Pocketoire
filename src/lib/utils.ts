import { clsx, type ClassValue } from "clsx"
import { Cookies } from "react-cookie";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ApiClientOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  token?: string;
  headers?: Record<string, string>;
  content?: string
}

export const base_api = "/api";
export const base_url = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

const AUTH_FAILURE_STATUSES = new Set([401, 419]);
const AUTH_COOKIE_NAME = "token";
const cookieStore = new Cookies();

function isJwtToken(value: string): boolean {
  return /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(value);
}

function isLaravelSanctumToken(value: string): boolean {
  return /^\d+\|[A-Za-z0-9]+$/.test(value);
}

export function isSupportedAuthToken(value: string): boolean {
  return isJwtToken(value) || isLaravelSanctumToken(value);
}

function getLoginRedirectPath(): string {
  if (typeof window === "undefined") {
    return "/login";
  }

  const currentPath = window.location.pathname;
  return currentPath.startsWith("/admin") ? "/admin/login" : "/login";
}

export function clearAuthSession(redirect = true): void {
  if (typeof window === "undefined") {
    return;
  }

  // Ensure token cookie is removed for the whole app.
  cookieStore.remove(AUTH_COOKIE_NAME, { path: "/" });

  window.localStorage.removeItem("user-me");
  window.dispatchEvent(new CustomEvent("auth:expired"));

  if (redirect) {
    const currentPath = window.location.pathname;
    const targetPath = getLoginRedirectPath();
    if (currentPath !== targetPath) {
      window.location.assign(targetPath);
    }
  }
}

export function handleUnauthorizedResponse(status: number): boolean {
  if (!AUTH_FAILURE_STATUSES.has(status)) {
    return false;
  }

  clearAuthSession(true);
  return true;
}

export async function howl<T>(
  endpoint: string,
  { method = "GET", body, token, content, headers = {} }: ApiClientOptions = {}
): Promise<T> {
  if (token && !isSupportedAuthToken(token)) {
    clearAuthSession(true);
    throw new Error("Authentication token format is invalid. Please log in again.");
  }

  const res = await fetch(`${base_url}${base_api}${endpoint}`, {
    method,
    headers: {
      "Accept": "application/json",
      ...(content ? { "Content-Type": content } : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.log(
      `${base_url}${base_api}${endpoint}`
    );
    
    console.log(errorData);
    
    handleUnauthorizedResponse(res.status);
    
    throw new Error((errorData as idk).message || "API request failed");
  }

  return res.json() as Promise<T>;
}
export const blankImg = (
  x?: number | string,
  y?: number | string
) => {
  if (x && y) {
    return `https://placehold.co/${x}x${y}/png`;
  }
  if (x) {
    return `https://placehold.co/${x}x${x}/png`;
  }
  return `https://placehold.co/500x500/png`;
};

export type idk = any;


export function makeImg(x:string):string{
    if (x?.includes("http")) {
        return x
    }    
    return `${base_url}/${x}`
}
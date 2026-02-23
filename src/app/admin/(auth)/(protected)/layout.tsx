import { base_api, base_url } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(`${base_url}${base_api}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch");

  const data = await res.json();
  const role = data?.data?.user?.account_type;

  if (token) {
    if (role === "admin") {
      return redirect("/admin/dashboard");
    } else {
      return redirect("/");
    }
  }
  return children;
}

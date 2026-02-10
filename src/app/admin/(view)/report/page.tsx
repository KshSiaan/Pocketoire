"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sect from "./sect";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { howl, makeImg } from "@/lib/utils";
import { useCookies } from "react-cookie";
import { ApiResponse } from "@/types/base";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["admin_report"],
    queryFn: async (): Promise<
      ApiResponse<{
        creators: {
          total: number;
          current_week: number;
          previous_week: number;
          change_percent: number;
        };
        clicks: {
          total: number;
          current_week: number;
          previous_week: number;
          change_percent: number;
        };
        earnings: {
          total: string;
          current_week: number;
          previous_week: string;
          change_percent: number;
        };
        conversion_rate: {
          total: number;
          current_week: number;
          previous_week: number;
          change_percent: number;
        };
        top_performing_products: Array<{
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
          storefront: {
            id: number;
            name: string;
          };
          user: {
            id: number;
            name: string;
          };
          product_image: {
            id: number;
            product_id: number;
            image: string;
            source: string;
            created_at: string;
            updated_at: string;
          };
        }>;
        top_performing_creators: Array<{
          id: number;
          name: string;
          email: string;
          email_verified_at: string;
          otp: any;
          otp_verified_at: any;
          otp_expires_at: any;
          password_reset_token: any;
          password_reset_expires_at: any;
          profile_photo: string;
          cover_photo: string;
          account_type: string;
          status: string;
          status_reason: any;
          stripe_customer_id: any;
          stripe_account_id?: string;
          stripe_onboarded: number;
          moderated_by: any;
          moderated_at: any;
          google_id: any;
          created_at: string;
          updated_at: string;
          total_commission: string;
          storefront: {
            id: number;
            user_id: number;
            name: string;
          };
        }>;
      }>
    > => {
      return howl(`/admin/dashboard-reports`, {
        token,
      });
    },
  });

  return (
    <main className="min-h-screen w-full flex flex-col gap-6 px-4 md:px-6 lg:px-8 overflow-x-hidden">
      <Sect
        data={{
          creators: data?.data.creators,
          clicks: data?.data.clicks,
          earnings: data?.data.earnings,
          conversion_rate: data?.data.conversion_rate,
        }}
      />
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-start">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl italic">
              Top Performing Products
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data?.data.top_performing_products.map((product) => (
              <div
                className="flex justify-between items-centers gap-4"
                key={product.id}
              >
                <Image
                  src={
                    product.product_image?.image
                      ? makeImg(product.product_image.image)
                      : "/image/product.jpeg"
                  }
                  className="aspect-video! h-16 w-24 rounded-sm"
                  height={120}
                  unoptimized
                  width={340}
                  alt="prod_img"
                />
                <div className="flex-1">
                  <p className="font-bold">
                    {product.title.length > 50
                      ? product.title.substring(0, 50) + "..."
                      : product.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {product.product_image?.source}
                  </p>
                </div>
                <div className="text-destructive font-semibold">
                  {product.clicks_count} Clicks
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl italic">Top Creators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data?.data.top_performing_creators.map((creator) => (
              <div
                className="flex justify-between items-centers gap-4"
                key={creator.id}
              >
                <Avatar className="size-12">
                  <AvatarImage
                    src={
                      creator.profile_photo
                        ? makeImg(`storage/${creator.profile_photo}`)
                        : "/image/product.jpeg"
                    }
                  />
                  <AvatarFallback>UI</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-bold">
                    {creator.name.length > 50
                      ? creator.name.substring(0, 50) + "..."
                      : creator.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {creator?.storefront?.name}
                  </p>
                </div>
                <div className="text-destructive font-semibold text-green-600">
                  ${creator.total_commission} Earnings
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

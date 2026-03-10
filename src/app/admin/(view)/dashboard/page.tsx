"use client";
import Image from "next/image";
import Sect from "./sect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Traffic } from "./traffic";
import { Retailer } from "./retailer";
import { Badge } from "@/components/ui/badge";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { InboxIcon, Loader2Icon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { howl } from "@/lib/utils";
import { useCookies } from "react-cookie";
import type { ApiResponse } from "@/types/base";
import { useMemo, useState } from "react";

const CHART_COLORS = ["var(--color-destructive)", "var(--color-primary)"];

const toNumber = (value: unknown): number => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
};

const formatLabel = (value: string): string =>
  value
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());

type NullableString = string | null;

type ClickPoint = {
  date: string;
  clicks: number | string;
  day?: string;
};

type DashboardStats = {
  users: {
    total: number;
    current_month: number;
    previous_month: number;
    change_percent: number;
  };
  storefronts: {
    total: number;
    current_month: number;
    previous_month: number;
    change_percent: number;
  };
  clicks: {
    total: number;
    current_month: number;
    previous_month: number;
    change_percent: number;
  };
  earnings: {
    total: string;
    current_month: string;
    previous_month: string;
    change_percent: number;
  };
  clicks_over_time: {
    weekly: Record<string, Record<string, ClickPoint>>;
    monthly: Record<string, ClickPoint[]>;
  };
  sales_by_retailer: Record<string, number | string>;
  top_performing_products: Array<{
    id: number;
    user_id: number;
    storefront_id: number;
    album_id: number;
    source: string;
    title: string;
    description: string;
    price: string;
    currency: string;
    product_link: string;
    viator_product_code: string;
    status: string;
    created_at: string;
    updated_at: string;
    slug: string;
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
    otp: NullableString;
    otp_verified_at: NullableString;
    otp_expires_at: NullableString;
    password_reset_token: NullableString;
    password_reset_expires_at: NullableString;
    profile_photo: string;
    cover_photo: string;
    account_type: string;
    status: string;
    status_reason: NullableString;
    stripe_customer_id?: NullableString;
    stripe_account_id: string;
    stripe_onboarded: number;
    moderated_by: number | null;
    moderated_at: NullableString;
    google_id: NullableString;
    created_at: string;
    updated_at: string;
    total_commission: string;
    storefront: {
      id: number;
      user_id: number;
      name: string;
    };
  }>;
};

const formatTrafficLabel = (date: string, day?: string, monthly = false) => {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return day ?? date;
  }

  if (monthly) {
    return parsed.toLocaleDateString("en-US", { day: "2-digit" });
  }

  return day ?? parsed.toLocaleDateString("en-US", { weekday: "short" });
};

const normalizeTrafficRows = (
  rows: Array<{ label: string; [source: string]: string | number }>,
) => {
  const sourceKeys = Array.from(
    rows.reduce((set, row) => {
      Object.keys(row)
        .filter((key) => key !== "label")
        .forEach((key) => {
          set.add(key);
        });
      return set;
    }, new Set<string>()),
  );

  return rows.map((row) => {
    const normalizedRow: { label: string; [source: string]: string | number } =
      {
        label: String(row.label),
      };

    sourceKeys.forEach((key) => {
      normalizedRow[key] = toNumber(row[key]);
    });

    return normalizedRow;
  });
};

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [trafficPeriod, setTrafficPeriod] = useState<"weekly" | "monthly">(
    "weekly",
  );
  const { data, isPending } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async (): Promise<ApiResponse<DashboardStats>> => {
      return howl(`/admin/dashboard-stats`, {
        token,
      });
    },
  });

  const trafficData = useMemo(() => {
    const periodData = data?.data?.clicks_over_time?.[trafficPeriod];

    if (!periodData) {
      return [];
    }

    if (trafficPeriod === "weekly") {
      const weeklyBySource =
        periodData as DashboardStats["clicks_over_time"]["weekly"];

      const dateMap = new Map<
        string,
        { label: string; date: string; [source: string]: string | number }
      >();

      Object.entries(weeklyBySource).forEach(([source, pointsByDay]) => {
        Object.entries(pointsByDay || {}).forEach(([dayName, point]) => {
          const pointDate = point?.date;
          if (!pointDate) {
            return;
          }

          const existing = dateMap.get(pointDate) ?? {
            label: formatTrafficLabel(pointDate, dayName),
            date: pointDate,
          };

          existing[source] = toNumber(point?.clicks);
          dateMap.set(pointDate, existing);
        });
      });

      const rows = Array.from(dateMap.values())
        .sort((a, b) => a.date.localeCompare(b.date))
        .map(({ date, ...row }) => row);

      return normalizeTrafficRows(rows);
    }

    const monthlyBySource =
      periodData as DashboardStats["clicks_over_time"]["monthly"];

    const dateMap = new Map<
      string,
      { label: string; date: string; [source: string]: string | number }
    >();

    Object.entries(monthlyBySource).forEach(([source, points]) => {
      (points || []).forEach((point) => {
        const pointDate = point?.date;
        if (!pointDate) {
          return;
        }

        const existing = dateMap.get(pointDate) ?? {
          label: formatTrafficLabel(pointDate, point?.day, true),
          date: pointDate,
        };

        existing[source] = toNumber(point?.clicks);
        dateMap.set(pointDate, existing);
      });
    });

    const rows = Array.from(dateMap.values())
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(({ date, ...row }) => row);

    return normalizeTrafficRows(rows);
  }, [data?.data?.clicks_over_time, trafficPeriod]);

  const retailerData = useMemo(() => {
    const sales = data?.data?.sales_by_retailer;

    if (!sales) {
      return [];
    }

    return Object.entries(sales)
      .map(([retailer, value], index) => ({
        retailer: formatLabel(retailer),
        sales: toNumber(value),
        fill: CHART_COLORS[index % CHART_COLORS.length],
      }))
      .filter((item) => item.sales > 0);
  }, [data?.data?.sales_by_retailer]);

  return (
    <main className="min-h-screen w-full flex flex-col gap-6 px-4 md:px-6 lg:px-8 overflow-x-hidden">
      {/* Top Section */}
      <Sect stats={data?.data} isLoading={isPending} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Traffic Card */}
        <Card className="lg:h-[400px] flex flex-col">
          <CardHeader className="flex flex-wrap justify-between items-center gap-3">
            <CardTitle>Traffic Over Time</CardTitle>
            <RadioGroup
              value={trafficPeriod}
              onValueChange={(value) => {
                if (value === "weekly" || value === "monthly") {
                  setTrafficPeriod(value);
                }
              }}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-2 text-destructive">
                <RadioGroupItem value="weekly" id="traffic-weekly" />
                <Label htmlFor="traffic-weekly">Weekly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="traffic-monthly" />
                <Label htmlFor="traffic-monthly">Monthly</Label>
              </div>
            </RadioGroup>
          </CardHeader>
          <CardContent className="flex-1">
            <Traffic data={trafficData} isLoading={isPending} />
          </CardContent>
        </Card>

        {/* Sales by Retailer */}
        <Card className="lg:h-[400px] flex flex-col">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Sales by Retailer</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <Retailer data={retailerData} isLoading={isPending} />
            </div>
            <div className="space-y-3 flex flex-col justify-around">
              {retailerData.length ? (
                retailerData.map((item) => (
                  <div className="flex items-center gap-2" key={item.retailer}>
                    <Badge
                      className="h-3 w-8"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-sm sm:text-base">
                      {item.retailer}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No sales data</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Products */}
        <Card className="lg:h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            {isPending ? (
              <div className="flex items-center justify-center h-full">
                <Loader2Icon className="animate-spin" />
              </div>
            ) : data?.data?.top_performing_products?.length ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Store</TableHead>
                    <TableHead className="text-right">Clicks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.data.top_performing_products
                    .slice(0, 5)
                    .map((product: Record<string, unknown>) => (
                      <TableRow key={product.id as React.Key}>
                        <TableCell className="flex gap-2 items-center max-w-xs">
                          {typeof product.product_image === "object" &&
                            product.product_image &&
                            "image" in product.product_image && (
                              <Image
                                src={
                                  (product.product_image.image as string) ?? ""
                                }
                                alt={product.title as string}
                                width={40}
                                height={40}
                                className="w-10 h-10 object-cover rounded"
                              />
                            )}
                          <span className="line-clamp-1 text-sm">
                            {String(product.title)}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm">
                          {typeof product.storefront === "object" &&
                          product.storefront &&
                          "name" in product.storefront
                            ? String(
                                (product.storefront as Record<string, unknown>)
                                  .name,
                              )
                            : "N/A"}
                        </TableCell>
                        <TableCell className="text-right text-sm">
                          {String(product.clicks_count)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            ) : (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant={"icon"} className="text-destructive">
                    <InboxIcon />
                  </EmptyMedia>
                  <EmptyTitle>No products yet</EmptyTitle>
                </EmptyHeader>
              </Empty>
            )}
          </CardContent>
        </Card>

        {/* Top Creators */}
        <Card className="lg:h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle>Top Creators</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            {isPending ? (
              <div className="flex items-center justify-center h-full">
                <Loader2Icon className="animate-spin" />
              </div>
            ) : data?.data?.top_performing_creators?.length ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Creator</TableHead>
                    <TableHead>Store</TableHead>
                    <TableHead className="text-right">Commission</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.data.top_performing_creators
                    .slice(0, 5)
                    .map((creator: Record<string, unknown>) => (
                      <TableRow key={creator.id as React.Key}>
                        <TableCell className="flex gap-2 items-center max-w-xs">
                          {/* {typeof creator.profile_photo === "string" &&
                            creator.profile_photo && (
                              <Image
                                src={creator.profile_photo ?? ""}
                                alt={creator.name as string}
                                width={40}
                                height={40}
                                className="w-10 h-10 object-cover rounded-full"
                              />
                            )} */}
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {String(creator.name)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {String(creator.email)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {typeof creator.storefront === "object" &&
                          creator.storefront &&
                          "name" in creator.storefront
                            ? String(
                                (creator.storefront as Record<string, unknown>)
                                  .name,
                              )
                            : "N/A"}
                        </TableCell>
                        <TableCell className="text-right text-sm font-medium">
                          $
                          {Number(
                            creator.total_commission as string | number,
                          ).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            ) : (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant={"icon"} className="text-destructive">
                    <InboxIcon />
                  </EmptyMedia>
                  <EmptyTitle>No creators yet</EmptyTitle>
                </EmptyHeader>
              </Empty>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

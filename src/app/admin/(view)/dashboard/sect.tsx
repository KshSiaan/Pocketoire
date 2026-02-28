import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Metric = {
  total: number | string;
  change_percent: number;
};

type SectProps = {
  stats?: {
    users: Metric;
    storefronts: Metric;
    clicks: Metric;
    earnings: Metric;
  };
  isLoading?: boolean;
};

const formatNumber = (value: number | string) => {
  const parsed = typeof value === "string" ? Number(value) : value;
  const safe = Number.isFinite(parsed) ? parsed : 0;

  return new Intl.NumberFormat("en-US").format(safe);
};

const formatMoney = (value: number | string) => {
  const parsed = typeof value === "string" ? Number(value) : value;
  const safe = Number.isFinite(parsed) ? parsed : 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(safe);
};

const formatChange = (value: number) => {
  const safe = Number.isFinite(value) ? value : 0;
  const sign = safe > 0 ? "+" : "";

  return `${sign}${safe}%`;
};

const changeClass = (value: number) =>
  value < 0 ? "text-red-600 pr-2" : "text-emerald-600 pr-2";

export default function Sect({ stats, isLoading }: SectProps) {
  const usersTotal = stats?.users?.total ?? 0;
  const storefrontsTotal = stats?.storefronts?.total ?? 0;
  const clicksTotal = stats?.clicks?.total ?? 0;
  const earningsTotal = stats?.earnings?.total ?? 0;

  const usersChange = stats?.users?.change_percent ?? 0;
  const storefrontsChange = stats?.storefronts?.change_percent ?? 0;
  const clicksChange = stats?.clicks?.change_percent ?? 0;
  const earningsChange = stats?.earnings?.change_percent ?? 0;

  return (
    <div className="w-full grid lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-3xl">
            {isLoading ? "..." : formatNumber(usersTotal)}
          </h2>
        </CardContent>
        <CardFooter className="text-xs lg:text-base">
          <span className={changeClass(usersChange)}>
            {isLoading ? "..." : formatChange(usersChange)}
          </span>
          from last month
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Storefronts</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-3xl">
            {isLoading ? "..." : formatNumber(storefrontsTotal)}
          </h2>
        </CardContent>
        <CardFooter>
          <span className={changeClass(storefrontsChange)}>
            {isLoading ? "..." : formatChange(storefrontsChange)}
          </span>
          from last month
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-3xl">
            {isLoading ? "..." : formatNumber(clicksTotal)}
          </h2>
        </CardContent>
        <CardFooter>
          <span className={changeClass(clicksChange)}>
            {isLoading ? "..." : formatChange(clicksChange)}
          </span>
          from last month
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-3xl">
            {isLoading ? "..." : formatMoney(earningsTotal)}
          </h2>
        </CardContent>
        <CardFooter>
          <span className={changeClass(earningsChange)}>
            {isLoading ? "..." : formatChange(earningsChange)}
          </span>
          from last month
        </CardFooter>
      </Card>
    </div>
  );
}

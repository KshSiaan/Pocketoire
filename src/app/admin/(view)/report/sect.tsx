import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Sect({
  data,
}: {
  data: {
    creators?: {
      total: number;
      current_week: number;
      previous_week: number;
      change_percent: number;
    };
    clicks?: {
      total: number;
      current_week: number;
      previous_week: number;
      change_percent: number;
    };
    earnings?: {
      total: string;
      current_week: number;
      previous_week: string;
      change_percent: number;
    };
    conversion_rate?: {
      total: number;
      current_week: number;
      previous_week: number;
      change_percent: number;
    };
  };
}) {
  return (
    <div className="w-full grid lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-normal">Total Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-3xl font-semibold">{data?.clicks?.total}</h2>
        </CardContent>
        <CardFooter className="text-xs lg:text-sm pt-0">
          <span className="text-emerald-600 pr-2 font-medium">+12%</span> from
          last Week
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-normal">Total Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-3xl font-semibold">${data?.earnings?.total}</h2>
        </CardContent>
        <CardFooter className="text-xs lg:text-sm pt-0">
          <span className="text-emerald-600 pr-2 font-medium">+12%</span> from
          last Week
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-normal">Active Creators</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-3xl font-semibold">
            {data?.creators?.total ?? 0}
          </h2>
        </CardContent>
        <CardFooter className="text-xs lg:text-sm pt-0">
          <span className="text-emerald-600 pr-2 font-medium">+12%</span> from
          last Week
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-normal">Coversion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-3xl font-semibold">
            {data.conversion_rate?.total}%
          </h2>
        </CardContent>
        <CardFooter className="text-xs lg:text-sm pt-0">
          <span className="text-emerald-600 pr-2 font-medium">+12%</span> from
          last Week
        </CardFooter>
      </Card>
    </div>
  );
}

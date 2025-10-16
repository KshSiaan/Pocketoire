import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Sect() {
  return (
    <div className="w-full grid lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-normal">Total Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-3xl font-semibold">12,847</h2>
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
          <h2 className="text-3xl font-semibold">$2,477</h2>
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
          <h2 className="text-3xl font-semibold">237</h2>
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
          <h2 className="text-3xl font-semibold">12.7%</h2>
        </CardContent>
        <CardFooter className="text-xs lg:text-sm pt-0">
          <span className="text-emerald-600 pr-2 font-medium">+12%</span> from
          last Week
        </CardFooter>
      </Card>
    </div>
  );
}

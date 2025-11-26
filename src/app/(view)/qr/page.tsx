import { Scanner } from "@yudiel/react-qr-scanner";
import { toast } from "sonner";

export default function Page() {
  return (
    <Scanner
      onScan={(result) => toast.success(result.toString())}
      onError={(error: any) => console.log(error?.message)}
    />
  );
}

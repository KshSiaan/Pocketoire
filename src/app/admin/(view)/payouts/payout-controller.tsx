import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CheckIcon, XIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "@/types/base";
import { useCookies } from "react-cookie";
import { howl } from "@/lib/utils";
import { toast } from "sonner";

export default function PayoutController({
  data,
}: {
  data: {
    id: number;
    user_id: number;
    wallet_id: number;
    amount: string;
    currency: string;
    method: string;
    status: string;
    created_at: string;
    user: {
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
      stripe_account_id: string;
      stripe_onboarded: number;
      moderated_by: any;
      moderated_at: any;
      google_id: any;
      created_at: string;
      updated_at: string;
      commission_percent: string;
      storefront: {
        id: number;
        user_id: number;
        name: string;
      };
    };
    wallet: {
      id: number;
      user_id: number;
      balance: string;
      status: string;
      currency: string;
    };
  };
}) {
  const qcl = useQueryClient();
  const [{ token }] = useCookies(["token"]);
  const { mutate, isPending } = useMutation({
    mutationKey: ["update_payout", data.id],
    mutationFn: (action: "approve" | "reject"): Promise<ApiResponse<null>> => {
      return howl(`/admin/payouts/${data.id}`, {
        method: "PATCH",
        token,
        body: {
          action,
        },
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success!");
      qcl.invalidateQueries({ queryKey: ["payouts"] });
    },
  });

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-md border "
          >
            <CheckIcon className="h-4 w-4 text-gray-700" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve this payout?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark payout #{data.id} for {data.user.name} as approved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => mutate("approve")}
              disabled={isPending}
            >
              {isPending ? "Approving..." : "Approve"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-md border "
          >
            <XIcon className="h-4 w-4 text-gray-700" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject this payout?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reject payout #{data.id} for {data.user.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => mutate("reject")}
            >
              {isPending ? "Rejecting..." : "Reject"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

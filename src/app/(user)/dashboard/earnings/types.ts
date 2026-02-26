export interface EarningsProduct {
  id: number | null;
  product_code: string;
  title: string;
  main_image: string | null;
  total_conversions: number;
  total_clicks: number;
  total_earnings: number;
}

export interface EarningsWallet {
  balance: string;
  currency: string;
  status: string;
}

export interface EarningsPayout {
  id: number;
  user_id: number;
  wallet_id: number;
  amount: string;
  currency: string;
  method: string;
  status: string;
  created_at: string;
}

export interface EarningsData {
  total_paid_amounts: number;
  pending_payouts_amount: number;
  total_paid_this_month: number;
  total_paid_previous_months: number;
  monthly_payout_percentage_change: number;
  products: EarningsProduct[];
  wallet: EarningsWallet;
  payouts: EarningsPayout[];
  last_payout: EarningsPayout | null;
}

export interface EarningsResponse {
  status: string;
  message: string;
  data: EarningsData;
}

export interface UserType {
  id: number
  name: string
  email: string
  email_verified_at: string
  otp: string
  otp_verified_at: Date
  otp_expires_at: Date
  profile_photo: string
  cover_photo: string
  account_type: string
  status: string
  status_reason: string
  stripe_customer_id: string
  stripe_account_id: string
  stripe_onboarded: number
  moderated_by: string
  moderated_at: Date
  google_id: string
  created_at: string
  updated_at: string
}

export interface ProductType {
        id: number
        user_id: number
        storefront_id: number
        album_id: number
        title: string
        description: string
        price: string
        currency: string
        product_link: string
        viator_product_code: string
        status: string
        created_at: string
        updated_at: string
        clicks_count: number
        sales_count: number
        sales_sum_creator_commission?: string
}
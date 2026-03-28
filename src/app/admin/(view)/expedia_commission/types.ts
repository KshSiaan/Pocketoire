export type CommissionAmount = string | number | null;

export type ExpediaCommissionRow = {
      id: number
      product_id: number
      user_id: number
      platform_commission: string
      creator_commission: string
      creator_commission_percent: number
      currency: string
      wallet_credited_at: Date
      created_at: Date
      updated_at: Date
      product: {
        id: number
        user_id: number
        storefront_id: number
        album_id: number
        source: string
        title: string
        description: string
        price: string
        currency: string
        product_link: string
        viator_product_code: string | null
        status: string
        created_at: Date
        updated_at: Date
        slug: string
      }
    }
export type ExpediaProduct = {
    id: number
    user_id: number
    storefront_id: number
    album_id: number
    source: string
    title: string
    description: string
    price: string
    currency: string
    product_link: string
    viator_product_code: any
    status: string
    created_at: string
    updated_at: string
    slug: string
    product_image: {
      id: number
      product_id: number
      image: string
      source: string
      created_at: string
      updated_at: string
    }
    storefront: {
      id: number
      user_id: number
      name: string
      slug: string
      status: string
      status_reason: string
      bio: string
      instagram_link: any
      tiktok_link: any
      moderated_by: any
      moderated_at: any
      created_at: string
      updated_at: string
      deleted_at: any
    }
  }
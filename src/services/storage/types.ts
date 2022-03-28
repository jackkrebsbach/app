export type JWT = {
  email?: string
  userId?: string
  access_token?: string
  refresh_token?: string
}

export type NFT = {
  id?: number
  url?: string
  meta_mask_id?: string
  nft_state?: 'PENDING' | 'NULL' | 'TRANSFERED' | 'ERROR'
  user_id?: number
  created_at?: string
  updated_at?: string
}

export type User = {
  id?: number
  bc_id?: number
  email?: string
  phone?: string
  full_name?: string
  first_name?: string
  last_name?: string
  hoodie_size?: any
  full_user?: boolean
  disabled?: boolean
  role?: 'USER' | 'ADMIN'
  created_at?: string
  updated_at?: string
  invite_count?: number
}

export type Profile = {
  id?: number
  lyop?: string
  city?: string
  description?: string
  short_description?: string
  profile_picture?: string
  user_id?: number
  created_at?: string
  updated_at?: string
  gallery?: Photo[]
  display_name?: string
}
export type Photo = {
  id: number
  url: string
  is_profile: boolean
  profile_id: number
  width?: number
  height?: number
  created_at: string
  updated_at: string
}

import { Prisma } from '@prisma/client'

export type RegisterForm = {
  email: string
  password: string
  firstName: string
  lastName: string
}

export type LoginForm = {
  email: string
  password: string
}

export type TrackingCoinForm = {
  id?: string
  digitalAsset: string
  detail: string
  img?: string | null
  market: string
  quantity: number
  price: number
  soldAt?: Date | null
  closedPrice?: number
  status?: number
}

export interface GetCoinsParams {
  statuses: number[]
  whereFilter?: Prisma.TrackingCoinWhereInput
}

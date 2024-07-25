import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export type SaleType = Infer<typeof saleValidator>

export const saleValidator = vine.compile(
  vine.object({
    clientId: vine.number().positive(),
    productId: vine.number().positive(),
    quantity: vine.number().positive(),
  })
)

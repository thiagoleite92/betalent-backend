import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export type CreateProductType = Infer<typeof createProductValidator>

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(1).maxLength(255),
    description: vine.string().minLength(10).maxLength(255),
    price: vine.number().positive().decimal(2),
    stock: vine.number().positive(),
  })
)

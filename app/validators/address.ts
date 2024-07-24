import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export type AddressType = Infer<typeof addressValidator>

export const addressValidator = vine.object({
  uf: vine.string().minLength(2).maxLength(2),
  city: vine.string().minLength(1).maxLength(255),
  neighborhood: vine.string().minLength(1).maxLength(255),
  street: vine.string().minLength(1).maxLength(255),
  number: vine.string().minLength(1).maxLength(10),
  complement: vine.string().maxLength(255).optional(),
  zip_code: vine
    .string()
    .fixedLength(9)
    .regex(/^\d{5}-\d{3}$/),
  country: vine.string().minLength(1).maxLength(255),
  is_primary: vine.boolean().optional(),
})

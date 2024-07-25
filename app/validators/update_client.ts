import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export type UpdateClientType = Infer<typeof updateClientValidator>

export const updateClientValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255),
    cpf: vine
      .string()
      .fixedLength(14)
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
  })
)

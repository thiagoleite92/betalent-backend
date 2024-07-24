import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { addressValidator } from './address.js'
import { phoneNumberValidator } from './phone.js'

export type CreateClientType = Infer<typeof createClientValidator>

export const createClientValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255),
    cpf: vine
      .string()
      .fixedLength(14)
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
    address: addressValidator.clone(),
    phoneNumber: phoneNumberValidator.clone(),
  })
)

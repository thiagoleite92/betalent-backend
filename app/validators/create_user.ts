import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export type CreateUserType = Infer<typeof createUserValidator>

export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(6).maxLength(10),
  })
)

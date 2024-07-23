import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export type AuthenticateType = Infer<typeof authenticateValidator>

export const authenticateValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(3).maxLength(20),
  })
)

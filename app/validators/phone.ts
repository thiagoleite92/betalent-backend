import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export type PhoneType = Infer<typeof phoneNumberValidator>

export const phoneNumberValidator = vine.string().minLength(10).maxLength(15).regex(/^\d+$/)

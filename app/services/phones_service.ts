import { PhoneType } from '#validators/phone'
import { inject } from '@adonisjs/core'

@inject()
export default class PhonesService {
  async store({ phone }: PhoneType) {}
}

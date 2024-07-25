import Phone from '#models/phone'
import { inject } from '@adonisjs/core'

@inject()
export default class PhonesService {
  async findPhoneNumber(phoneNumber: string) {
    return await Phone.findBy('phoneNumber', phoneNumber)
  }

  async findPhoneNumberByClientId(clientId: number) {
    return Phone.findBy('clientId', clientId)
  }
}

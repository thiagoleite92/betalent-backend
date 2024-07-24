import Phone from '#models/phone'
import { inject } from '@adonisjs/core'

@inject()
export default class PhonesService {
  async findPhoneNumber(phoneNumber: string) {
    return Phone.findBy('phoneNumber', phoneNumber)
  }
}

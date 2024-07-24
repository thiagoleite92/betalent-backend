import { inject } from '@adonisjs/core'
import { AddressType } from '#validators/address'

@inject()
export default class AddressesService {
  async store(address: AddressType) {}
}

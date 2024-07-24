import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'
import Client from '#models/client'
import { CreateClientType } from '#validators/create_client'

@inject()
export default class ClientsService {
  constructor(protected client: Client = new Client()) {}

  async store({ name, cpf, address, phoneNumber }: CreateClientType) {
    await db.transaction(async (trx) => {
      this.client.name = name
      this.client.cpf = cpf

      this.client.useTransaction(trx)
      await this.client.save()

      await this.client.related('addresses').create({ ...address })
      await this.client.related('phones').create({ phoneNumber })
    })
  }
}

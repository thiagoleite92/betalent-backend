import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'
import Client from '#models/client'
import { CreateClientType } from '#validators/create_client'
import ResourceConflictException from '#exceptions/resource_conflict_exception'
import PhonesService from './phones_service.js'

@inject()
export default class ClientsService {
  constructor(
    protected client: Client = new Client(),
    protected phonesService: PhonesService
  ) {}

  async store({ name, cpf, address, phoneNumber }: CreateClientType) {
    const findClient = await this.findByCPF(cpf)

    if (findClient) {
      throw new ResourceConflictException('CPF já cadastrado na base de dados', 409)
    }

    const findPhoneNumber = await this.phonesService.findPhoneNumber(phoneNumber)

    if (findPhoneNumber) {
      throw new ResourceConflictException('Número de telefone já cadastro na base de dados', 409)
    }

    await db.transaction(async (trx) => {
      this.client.name = name
      this.client.cpf = cpf

      this.client.useTransaction(trx)
      await this.client.save()

      await this.client.related('phones').create({ phoneNumber })
      await this.client.related('addresses').create({ ...address })
    })
  }

  async index() {
    const clients = await Client.query().orderBy('id')

    return clients
  }

  // async show(id: number) {
  //   await this.findById(id)

  //   const clients = await Client.query().where({ id }).has('sales')

  //   console.log(clients)

  //   return clients
  // }

  async findById(id: number) {
    return Client.findOrFail(id)
  }

  async findByCPF(cpf: string) {
    return Client.findBy('cpf', cpf)
  }
}

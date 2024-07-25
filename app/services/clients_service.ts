import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'
import Client from '#models/client'
import { CreateClientType } from '#validators/create_client'
import ResourceConflictException from '#exceptions/resource_conflict_exception'
import PhonesService from './phones_service.js'
import ResourceNotFoundException from '#exceptions/resource_not_found_exception'
import { UpdateClientType } from '#validators/update_client'

@inject()
export default class ClientsService {
  constructor(protected phonesService: PhonesService) {}

  async store({ name, cpf, address, phoneNumber }: CreateClientType) {
    const findClient = await this.findByCPF(cpf)

    if (findClient) {
      throw new ResourceConflictException('CPF já cadastrado na base de dados', 409)
    }

    const findPhoneNumber = await this.phonesService.findPhoneNumber(phoneNumber)

    if (findPhoneNumber) {
      throw new ResourceConflictException('Número de telefone já cadastro na base de dados', 409)
    }

    const trx = await db.transaction()

    try {
      await db.transaction(async () => {
        const client = new Client()

        client.name = name
        client.cpf = cpf

        client.useTransaction(trx)
        await client.save()

        await client.related('phones').create({ phoneNumber })
        await client.related('addresses').create({ ...address })

        await trx.commit()
      })
    } catch (error) {
      await trx.rollback()
    }
  }

  async index() {
    const clients = await Client.query().orderBy('id')

    return clients
  }

  async update(id: number, { name, cpf }: UpdateClientType) {
    const client = await this.findById(id)

    if (!client) {
      throw new ResourceNotFoundException('Cliente não encontrado')
    }

    if (cpf !== client?.cpf) {
      const findByClientCPF = await this.findByCPF(cpf)

      if (findByClientCPF) {
        throw new ResourceConflictException('CPF já cadastrado na base de dados')
      }
    }

    client.name = name
    client.cpf = cpf

    await client.save()
  }

  // async show(id: number) {
  //   await this.findById(id)

  //   const clients = await Client.query().where({ id }).has('sales')

  //   console.log(clients)

  //   return clients
  // }

  async findById(id: number) {
    return Client.find(id)
  }

  async findByCPF(cpf: string) {
    return Client.findBy('cpf', cpf)
  }
}

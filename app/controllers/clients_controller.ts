import ClientsService from '#services/clients_service'
import { createClientValidator } from '#validators/create_client'
import { updateClientValidator } from '#validators/update_client'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ClientsController {
  constructor(protected clientsService: ClientsService) {}

  async index({ response }: HttpContext) {
    return response.status(200).send(await this.clientsService.index())
  }

  async store({ request, response }: HttpContext) {
    const body = await request.validateUsing(createClientValidator)

    await this.clientsService.store(body)

    return response.status(201)
  }

  async show({ params, response, request }: HttpContext) {
    const { date } = request?.qs()

    let queryDate

    if (date) {
      queryDate = new Date(date).toISOString()
    }

    const result = await this.clientsService.show(Number(params?.id), queryDate)
    return response.status(200).send(result)
  }

  async update({ params, request, response }: HttpContext) {
    const body = await request.validateUsing(updateClientValidator)

    const product = await this.clientsService.update(Number(params.id), body)

    return response.status(202).send(product)
  }

  async destroy({ params, response }: HttpContext) {
    await this.clientsService.delete(params.id)

    response.noContent()
  }
}

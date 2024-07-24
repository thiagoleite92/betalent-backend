import ProductsService from '#services/products_service'
import { createProductValidator } from '#validators/create_product'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ProductsController {
  constructor(protected productsService: ProductsService) {}

  async index({ response }: HttpContext) {
    return response.status(200).send(await this.productsService.index())
  }

  async store({ request, response }: HttpContext) {
    const body = await request.validateUsing(createProductValidator)

    await this.productsService.store(body)

    return response.status(201)
  }

  async show({ params, response }: HttpContext) {
    const product = await this.productsService.show(Number(params.id))

    return response.status(200).send(product)
  }

  async update({ params, request, response }: HttpContext) {
    const body = await request.validateUsing(createProductValidator)

    const product = await this.productsService.update(Number(params.id), body)

    return response.status(202).send(product)
  }

  async destroy({ params, response }: HttpContext) {
    await this.productsService.softDelete(params.id)

    response.noContent()
  }
}

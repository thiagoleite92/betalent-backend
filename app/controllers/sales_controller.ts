import SalesService from '#services/sales_service'
import { saleValidator } from '#validators/sale'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class SalesController {
  constructor(protected salesService: SalesService) {}

  async handle({ request }: HttpContext) {
    const body = await request.validateUsing(saleValidator)

    await this.salesService.execute(body)
  }
}

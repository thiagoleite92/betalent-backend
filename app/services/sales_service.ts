import { SaleType } from '#validators/sale'
import { inject } from '@adonisjs/core'
import ClientsService from './clients_service.js'
import ProductsService from './products_service.js'
import ResourceNotFoundException from '#exceptions/resource_not_found_exception'
import SaleQuantitySuparssStock from '#exceptions/sale_quantity_suparss_stock'
import db from '@adonisjs/lucid/services/db'

@inject()
export default class SalesService {
  constructor(
    protected clientsService: ClientsService,
    protected productsService: ProductsService
  ) {}

  async execute({ clientId, productId, quantity }: SaleType) {
    const client = await this.clientsService.findById(clientId)

    if (!client) {
      throw new ResourceNotFoundException('Cliente não encontrado')
    }

    const product = await this.productsService.findById(productId)

    if (!product) {
      throw new ResourceNotFoundException('Produto não encontrado')
    }

    if (quantity > product?.stock) {
      throw new SaleQuantitySuparssStock('Estoque insuficiente')
    }

    await db.table('sales').insert({
      client_id: clientId,
      product_id: productId,
      quantity,
      unit_price: product.price,
      total_price: quantity * product.price,
    })

    product.stock -= quantity
    await product.save()

    return
  }
}

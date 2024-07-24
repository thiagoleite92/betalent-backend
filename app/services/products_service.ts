import Product from '#models/product'
import { CreateProductType } from '#validators/create_product'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'

@inject()
export default class ProductsService {
  async store({ description, name, price, stock }: CreateProductType) {
    await Product.create({ description, name, price, stock })
  }

  async index() {
    const products = await db
      .from('products')
      .select('id', 'name', 'price', 'description', 'stock')
      .whereNull('deleted_at')
      .orderBy('name', 'asc')

    return products
  }

  async show(id: number) {
    const product = await this.findById(id)

    return product
  }

  async findById(id: number) {
    return Product.findOrFail(id)
  }

  async update(id: number, { description, name, price, stock }: CreateProductType) {
    const findProduct = await this.findById(id)

    findProduct.description = description
    findProduct.name = name
    findProduct.price = price
    findProduct.stock = stock

    await findProduct.save()
  }

  async softDelete(id: number) {
    const findProduct = await this.findById(id)

    await findProduct.delete()
  }
}

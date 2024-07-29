import ResourceConflictException from '#exceptions/resource_conflict_exception'
import ResourceNotFoundException from '#exceptions/resource_not_found_exception'
import Product from '#models/product'
import { CreateProductType } from '#validators/create_product'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'

@inject()
export default class ProductsService {
  async store({ description, name, price, stock }: CreateProductType) {
    const findProduct = await this.findByName(name)

    if (findProduct) {
      throw new ResourceConflictException('Produto já cadastrado', 409)
    }

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

    if (!product) {
      throw new ResourceNotFoundException('Produto não encontrado')
    }

    return product
  }

  async findById(id: number) {
    return Product.findBy('id', id)
  }

  async update(id: number, { description, name, price, stock }: CreateProductType) {
    const product = await this.findById(id)

    if (!product) {
      throw new ResourceNotFoundException('Produto não encontrado')
    }

    const findProduct = await this.findByName(name)

    if (findProduct?.id !== id) {
      throw new ResourceConflictException('Produto já cadastrado', 409)
    }

    product.description = description
    product.name = name
    product.price = price
    product.stock = stock
    await product.save()
  }

  async softDelete(id: number) {
    const product = await this.findById(id)

    if (!product) {
      throw new ResourceNotFoundException('Produto não encontrado')
    }

    await product.delete()
  }

  async findByName(name: string) {
    return Product.findBy('name', name)
  }
}

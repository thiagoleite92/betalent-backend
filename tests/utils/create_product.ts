import { ApiClient } from '@japa/api-client'
import { createAndAuthenticateUser } from './create_and_authenticate_user.js'
import { CreateProductType } from '#validators/create_product'
import Product from '#models/product'

export const createProduct = async (client: ApiClient, productData: CreateProductType) => {
  const token = await createAndAuthenticateUser(client)

  await client
    .post('/api/product')
    .json(productData)
    .header('Authorization', 'Bearer ' + token)

  const products = await Product.all()

  return {
    id: products[0].id,
    name: products[0].name,
    description: products[0].description,
    price: products[0].price,
    token,
  }
}

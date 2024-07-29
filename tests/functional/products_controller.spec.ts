import Product from '#models/product'
import { VALID_PRODUCT_DATA } from '#tests/data_mass/data_mass'
import { createAndAuthenticateUser } from '#tests/utils/create_and_authenticate_user'
import { createProduct } from '#tests/utils/create_product'
import { isSortedByProperty } from '#tests/utils/verify_order_array_by_propertie'
import db from '@adonisjs/lucid/services/db'
import { test } from '@japa/runner'

const endpoint = '/api/product'

test.group('e2e.products', (group) => {
  group.each.setup(async () => {
    await db.from('users').delete()
    await db.from('products').delete()
  })

  group.each.teardown(async () => {
    await db.from('users').delete()
    await db.from('products').delete()
  })

  test('[POST] should create a product, and return with status 201')
    .with(VALID_PRODUCT_DATA)
    .run(async ({ client, assert }, data) => {
      const token = await createAndAuthenticateUser(client)

      const response = await client
        .post(endpoint)
        .json(data)
        .header('Authorization', 'Bearer ' + token)

      const products = await Product.all()

      response.assertStatus(201)

      assert.equal(products?.length, 1)
    })

  test('[POST] shouldnt create a product wit name already taken, and return with status 409')
    .with(VALID_PRODUCT_DATA)
    .run(async ({ client, assert }, data) => {
      const { token } = await createProduct(client, data)

      const response = await client
        .post(endpoint)
        .json(data)
        .header('Authorization', 'Bearer ' + token)

      const products = await Product.all()

      response.assertStatus(409)

      assert.equal(products?.length, 1)
    })

  test('[GET] should detail a product, and return with status 200')
    .with(VALID_PRODUCT_DATA)
    .run(async ({ client, assert }, data) => {
      const { token, id } = await createProduct(client, {
        name: 'SmartPhone X',
        description: 'Ultima geração de smartphones',
        price: 2999.99,
        stock: 50,
      })

      const response = await client
        .get(`${endpoint}/${id}`)
        .json(data)
        .header('Authorization', 'Bearer ' + token)

      const body = response.body()

      response.assertStatus(200)
      assert.properties(body, [
        'id',
        'name',
        'description',
        'price',
        'stock',
        'createdAt',
        'updatedAt',
        'deletedAt',
      ])
    })

  test('[GET] should get a product list ordered by name, with return with status 200')
    .with(VALID_PRODUCT_DATA)
    .run(async ({ client, assert }, data) => {
      const token = await createAndAuthenticateUser(client)

      for (let i = 1; i <= 3; i++) {
        await client
          .post(endpoint)
          .json({
            name: `Telefone-${i}`,
            description: 'Ótimo aparelho',
            price: 2999.99,
            stock: 50,
          })
          .header('Authorization', 'Bearer ' + token)
      }

      const response = await client
        .get(`${endpoint}`)
        .json(data)
        .header('Authorization', 'Bearer ' + token)

      const body = response.body()

      response.assertStatus(200)
      assert.lengthOf(body, 3)
      assert.isTrue(isSortedByProperty(body, 'name'))
      response.assertStatus(200)
      assert.onlyProperties(body[0], ['id', 'name', 'description', 'price', 'stock'])
    })

  test('[PUT] shouldnt update a product name already taken, and return with status 409')
    .with(VALID_PRODUCT_DATA)
    .run(async ({ client }, data) => {
      const { id, token } = await createProduct(client, {
        name: 'mamao3',
        description: 'Fruta que ajuda na evacuação intestinal',
        price: 50.99,
        stock: 50,
      })

      await client
        .post(endpoint)
        .json({
          name: 'mamao',
          description: 'Fruta que ajuda na evacuação intestinal',
          price: 50.99,
          stock: 50,
        })
        .header('Authorization', 'Bearer ' + token)

      const response = await client
        .put(`${endpoint}/${id}`)
        .json(data)
        .header('Authorization', 'Bearer ' + token)

      response.assertStatus(409)

      response.assertBodyContains({ reason: 'Produto já cadastrado' })
    })

  test('[DELETE] should make a soft delete, and return with status 204')
    .with(VALID_PRODUCT_DATA)
    .run(async ({ client, expect }, data) => {
      const { token, id } = await createProduct(client, data)

      const product = await db.from('products').where({ id })

      expect(product[0]?.deleted_at).toBeNull()

      const response = await client
        .delete(`${endpoint}/${id}`)
        .json(data)
        .header('Authorization', 'Bearer ' + token)

      const softDeleteProduct = await db.from('products').where({ id })

      expect(softDeleteProduct[0]?.deleted_at).toBeDefined()

      response.assertStatus(204)
    })
})

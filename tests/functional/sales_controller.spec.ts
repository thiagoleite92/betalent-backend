import Client from '#models/client'
import Product from '#models/product'
import Sale from '#models/sale'
import { createClient } from '#tests/utils/create_client'
import { createProduct } from '#tests/utils/create_product'
import db from '@adonisjs/lucid/services/db'
import { test } from '@japa/runner'

const endpoint = '/api/sale'

test.group('e2e.sales', (group) => {
  group.each.setup(async () => {
    await db.from('users').delete()
    await db.from('products').delete()
    await db.from('clients').delete()
    await db.from('sales').delete()
  })

  group.each.teardown(async () => {
    await db.from('users').delete()
    await db.from('products').delete()
    await db.from('clients').delete()
    await db.from('sales').delete()
  })

  test('[POST] shouldnt make a sale with no authentication').run(async ({ client, assert }) => {
    await createProduct(client, {
      name: 'Mamao',
      description: 'ótimo para evacuação fecal',
      price: 2999.99,
      stock: 50,
    })

    const response = await client
      .post(endpoint)
      .json({ clientId: 'invalid', productId: 'invalid', quantity: 10 })

    const sales = await Sale.all()

    response.assertStatus(401)

    assert.equal(sales?.length, 0)
  })

  test('[POST] shouldnt make a sale with not found product').run(async ({ client, assert }) => {
    const { token, id } = await createClient(client, {
      name: 'Thiago Leite',
      cpf: '123.456.789-05',
      address: {
        uf: 'PE',
        city: 'Recife',
        neighborhood: 'Jardim Paulista',
        street: 'Rua dos Bobos',
        number: '123',
        complement: 'Apto 45',
        zip_code: '50711-181',
        country: 'Brasil',
        is_primary: true,
      },
      phoneNumber: '81999999998',
    })

    const response = await client
      .post(endpoint)
      .json({ clientId: id, productId: 321321, quantity: 10 })
      .header('Authorization', 'Bearer ' + token)

    const sales = await Sale.all()

    response.assertStatus(404)
    assert.equal(sales?.length, 0)
    response.assertBodyContains({ reason: 'Produto não encontrado' })
  })

  test('[POST] shouldnt make a sale with not found client').run(async ({ client, assert }) => {
    const { token, id } = await createProduct(client, {
      name: 'Telefone',
      description: 'Ótimo aparelho',
      price: 50.99,
      stock: 50,
    })

    await client
      .post('/api/client')
      .json({
        name: 'Thiago Leite',
        cpf: '123.456.789-05',
        address: {
          uf: 'PE',
          city: 'Recife',
          neighborhood: 'Jardim Paulista',
          street: 'Rua dos Bobos',
          number: '123',
          complement: 'Apto 45',
          zip_code: '50711-181',
          country: 'Brasil',
          is_primary: true,
        },
        phoneNumber: '81999999998',
      })
      .header('Authorization', 'Bearer ' + token)

    const response = await client
      .post(endpoint)
      .json({ clientId: 321321312, productId: id, quantity: 10 })
      .header('Authorization', 'Bearer ' + token)

    const sales = await Sale.all()

    response.assertStatus(404)

    assert.equal(sales?.length, 0)
    response.assertBodyContains({ reason: 'Cliente não encontrado' })
  })

  test('[POST] shouldnt make a sale with quantity suparssing stock').run(
    async ({ client, assert }) => {
      const { token, id } = await createProduct(client, {
        name: 'Telefone',
        description: 'Ótimo aparelho',
        price: 50.99,
        stock: 50,
      })

      await client
        .post('/api/client')
        .json({
          name: 'Thiago Leite',
          cpf: '123.456.789-05',
          address: {
            uf: 'PE',
            city: 'Recife',
            neighborhood: 'Jardim Paulista',
            street: 'Rua dos Bobos',
            number: '123',
            complement: 'Apto 45',
            zip_code: '50711-181',
            country: 'Brasil',
            is_primary: true,
          },
          phoneNumber: '81999999998',
        })
        .header('Authorization', 'Bearer ' + token)

      const findClient = await Client.all()

      const response = await client
        .post(endpoint)
        .json({ clientId: findClient[0].id, productId: id, quantity: 51 })
        .header('Authorization', 'Bearer ' + token)

      const sales = await Sale.all()

      response.assertStatus(406)

      assert.equal(sales?.length, 0)

      response.assertBodyContains({ reason: 'Estoque insuficiente' })
    }
  )

  test('[POST] should make a sale and return status 200').run(async ({ client, assert }) => {
    const { token, id } = await createProduct(client, {
      name: 'Telefone',
      description: 'Ótimo aparelho',
      price: 50.99,
      stock: 50,
    })

    await client
      .post('/api/client')
      .json({
        name: 'Thiago Leite',
        cpf: '123.456.789-05',
        address: {
          uf: 'PE',
          city: 'Recife',
          neighborhood: 'Jardim Paulista',
          street: 'Rua dos Bobos',
          number: '123',
          complement: 'Apto 45',
          zip_code: '50711-181',
          country: 'Brasil',
          is_primary: true,
        },
        phoneNumber: '81999999998',
      })
      .header('Authorization', 'Bearer ' + token)

    const findClient = await Client.all()

    const response = await client
      .post(endpoint)
      .json({ clientId: findClient[0].id, productId: id, quantity: 50 })
      .header('Authorization', 'Bearer ' + token)

    const sales = await Sale.all()
    const products = await Product.all()

    response.assertStatus(200)
    assert.equal(sales?.length, 1)
    assert.equal(products[0]?.stock, 0)
  })
})

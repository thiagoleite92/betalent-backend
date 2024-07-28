import Client from '#models/client'
import {
  VALID_CLIENT_DATA_POST,
  VALID_CLIENT_DATA_PUT,
  VALID_CLIENT_DATA_CPF_TAKEN,
} from '#tests/data_mass/data_mass'
import { createAndAuthenticateUser } from '#tests/utils/create_and_authenticate_user'
import { createClient } from '#tests/utils/create_client'
import { isSortedByProperty } from '#tests/utils/verify_order_array_by_propertie'
import db from '@adonisjs/lucid/services/db'
import { test } from '@japa/runner'

const endpoint = '/api/client'

test.group('e2e.client', (group) => {
  group.each.setup(async () => {
    await db.from('users').delete()
    await db.from('clients').delete()
  })

  group.each.teardown(async () => {
    await db.from('users').delete()
    await db.from('clients').delete()
  })

  test('[POST] should create a client, and return with status 201')
    .with(VALID_CLIENT_DATA_POST)
    .run(async ({ client, assert }, data) => {
      const token = await createAndAuthenticateUser(client)

      const response = await client
        .post(endpoint)
        .json(data)
        .header('Authorization', 'Bearer ' + token)

      const clients = await Client.all()

      response.assertStatus(201)

      assert.equal(clients?.length, 1)
    })

  test('[POST] a non-authenticated user shouldnt create a client, and return with status 401')
    .with([VALID_CLIENT_DATA_POST])
    .run(async ({ client, assert }, data) => {
      const response = await client
        .post(endpoint)
        .json(data)
        .header('Authorization', 'Bearer ' + 'invalid_token')

      const clients = await Client.all()

      response.assertStatus(401)

      assert.equal(clients?.length, 0)
    })

  test('[POST] shouldnt create a client with cpf already taken, and return with status 409')
    .with([
      {
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
      },
    ])
    .run(async ({ client, assert }, data) => {
      const { token } = await createClient(client, {
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
        .json(data)
        .header('Authorization', 'Bearer ' + token)

      const clients = await Client.all()

      response.assertStatus(409)
      response.assertBodyContains({ reason: 'CPF já cadastrado na base de dados' })
      assert.equal(clients?.length, 1)
    })

  test('[POST] shouldnt create a client with phone already taken, and return with status 409')
    .with(VALID_CLIENT_DATA_POST)
    .run(async ({ client, assert }, data) => {
      const { token } = await createClient(client, {
        name: 'Thiago Leite',
        cpf: '123.456.789-01',
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
        .json(data)
        .header('Authorization', 'Bearer ' + token)

      const clients = await Client.all()
      const responseBody = response.body()

      response.assertStatus(409)
      assert.equal(clients?.length, 1)

      assert.equal(responseBody.reason, 'Número de telefone já cadastro na base de dados')
    })

  test('[PUT] should update a client name and cpf, and return with status 202')
    .with(VALID_CLIENT_DATA_PUT)
    .run(async ({ client, assert }, data) => {
      const { id, token } = await createClient(client, {
        name: 'Nome Errado',
        cpf: '123.456.789-01',
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
        .put(`${endpoint}/${id}`)
        .json(data)
        .header('Authorization', 'Bearer ' + token)

      const updatedClient = await Client.find(id)

      response.assertStatus(202)

      assert.equal(updatedClient?.name, 'Thiago Leite')
      assert.equal(updatedClient?.cpf, '123.456.789-05')
    })

  test('[PUT] shouldnt update a client cpf already taken, and return with status 409')
    .with(VALID_CLIENT_DATA_CPF_TAKEN)
    .run(async ({ client }, data) => {
      const { id, token } = await createClient(client, {
        name: 'Thiago Leite',
        cpf: '123.456.789-01',
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

      await client
        .post(endpoint)
        .json({
          name: 'Thiago Leite',
          cpf: '123.456.789-02',
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
          phoneNumber: '81999999991',
        })
        .header('Authorization', 'Bearer ' + token)

      const response = await client
        .put(`${endpoint}/${id}`)
        .json(data)
        .header('Authorization', 'Bearer ' + token)

      response.assertStatus(409)

      response.assertBodyContains({ reason: 'CPF já cadastrado na base de dados' })
    })

  test('[GET] should list clients with status 200, and order by id').run(
    async ({ client, assert }) => {
      const token = await createAndAuthenticateUser(client)

      for (let i = 1; i <= 3; i++) {
        await client
          .post(endpoint)
          .json({
            name: 'Thiago Leite',
            cpf: `123.456.789-0${i}`,
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
            phoneNumber: `8199999999${i}`,
          })
          .header('Authorization', 'Bearer ' + token)
      }

      const response = await client.get(endpoint).header('Authorization', 'Bearer ' + token)

      const body = response?.body()

      response.assertStatus(200)

      assert.properties(body[0], ['id', 'name', 'cpf'])

      assert.isTrue(isSortedByProperty(body, 'id'))
    }
  )

  test('[GET] should list client details by id with status 200').run(async ({ client, assert }) => {
    const { id, token } = await createClient(client, {
      name: 'Thiago Leite',
      cpf: `123.456.789-01`,
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
      phoneNumber: `81999999991`,
    })

    const response = await client
      .get(`${endpoint}/${id}`)
      .header('Authorization', 'Bearer ' + token)

    const body = response?.body()

    response.assertStatus(200)

    assert.properties(body, ['id', 'name', 'cpf', 'sales'])
  })

  test('[DELETE] should delete a client by id, and return with status 201')
    .with(VALID_CLIENT_DATA_POST)
    .run(async ({ client, assert }, data) => {
      const { token, id } = await createClient(client, data)

      const response = await client
        .delete(`${endpoint}/${id}`)
        .json(data)
        .header('Authorization', 'Bearer ' + token)

      const clients = await Client.all()

      response.assertStatus(204)

      assert.equal(clients?.length, 0)
    })
})

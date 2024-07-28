import User from '#models/user'
import db from '@adonisjs/lucid/services/db'
import { test } from '@japa/runner'

const endpoint = '/api/login'

const VALID_LOGIN = [{ email: 'user1@gmail.com', password: 'Senha123' }]
const INVALID_LOGIN = [{ email: 'invalid@email.com', password: 'Senha123' }]

test.group('e2e.login', (group) => {
  group.each.setup(async () => {
    await User.create({
      email: 'user1@gmail.com',
      password: 'Senha123',
    })
  })

  group.each.teardown(async () => {
    await db.from('users').delete()
  })

  test('[POST] should pass with status 200, and return a token')
    .with(VALID_LOGIN)
    .run(async ({ client, assert }, { email, password }) => {
      const response = await client.post(endpoint).json({ email, password })

      response.assertStatus(200)

      const responseBody = response.body()?.token

      assert.properties(responseBody, ['token', 'type'])
    })

  test('[POST] should not pass with status 400, and return a error message')
    .with(INVALID_LOGIN)
    .run(async ({ client, assert }, { email, password }) => {
      const response = await client.post(endpoint).json({ email, password })

      response.assertStatus(400)

      const responseBody = response.body()?.errors[0]

      assert.properties(responseBody, ['message'])

      assert.equal(responseBody.message, 'Invalid user credentials')
    })
})

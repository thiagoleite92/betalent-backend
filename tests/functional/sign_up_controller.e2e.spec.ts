import User from '#models/user'
import { INVALID_EMAIL, INVALID_PASSWORD, VALID_DATA } from '#tests/data_mass/data_mass'
import db from '@adonisjs/lucid/services/db'
import { test } from '@japa/runner'

const endpoint = '/api/signup'

test.group('e2e.signup', (group) => {
  group.each.setup(async () => {
    await db.from('users').delete()
  })

  test('[POST] should pass with status 201')
    .with(VALID_DATA)
    .run(async ({ client, assert }, { email, password }) => {
      const response = await client.post(endpoint).json({ email, password })

      const user = await User.all()

      response.assertStatus(201)
      assert.equal(user?.length, 1)
    })

  test('[POST] should fail with status 409')
    .with(VALID_DATA)
    .run(async ({ client, assert }, { email, password }) => {
      await User.create({
        email: 'user1@gmail.com',
        password: 'Senha123',
      })

      const response = await client.post(endpoint).json({ email, password })
      const user = await User.all()

      response.assertStatus(409)
      response.assertBody({ reason: 'Email já cadastrado' })
      assert.equal(user?.length, 1)
    })

  test('[POST] should not pass with wrong email format, and status 422')
    .with(INVALID_EMAIL)
    .run(async ({ client, assert }, data) => {
      const response = await client
        .post(endpoint)
        .json({ email: data?.email, password: data?.password })

      const user = await User.all()
      assert.equal(user?.length, 0)

      response.assertStatus(422)
      response.assertBody({
        errors: [
          {
            message: 'The email field must be a valid email address',
            rule: 'email',
            field: 'email',
          },
        ],
      })
    })

  test('[POST] should not pass with wrong password format, and status 422')
    .with(INVALID_PASSWORD)
    .run(async ({ client, assert }, { email, password, rule, meta, field, message }) => {
      const response = await client.post(endpoint).json({ email, password })

      const user = await User.all()
      assert.equal(user?.length, 0)

      response.assertStatus(422)
      response.assertBody({
        errors: [
          {
            message,
            rule,
            field,
            meta,
          },
        ],
      })
    })
})

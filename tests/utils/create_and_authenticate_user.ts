import User from '#models/user'
import { ApiClient } from '@japa/api-client'

export const createAndAuthenticateUser = async (client: ApiClient) => {
  await User.create({
    email: 'user1@gmail.com',
    password: 'Senha123',
  })

  const authResponse = await client
    .post('/api/login')
    .json({ email: 'user1@gmail.com', password: 'Senha123' })

  const {
    token: { token },
  } = authResponse.body()

  return token
}

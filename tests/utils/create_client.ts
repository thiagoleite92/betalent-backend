import { ApiClient } from '@japa/api-client'
import { createAndAuthenticateUser } from './create_and_authenticate_user.js'
import Client from '#models/client'
import { CreateClientType } from '#validators/create_client'

export const createClient = async (client: ApiClient, clientData: CreateClientType) => {
  const token = await createAndAuthenticateUser(client)

  await client
    .post('/api/client')
    .json(clientData)
    .header('Authorization', 'Bearer ' + token)

  const clients = await Client.all()

  return { id: clients[0].id, name: clients[0].name, cpf: clients[0].cpf, token }
}

import User from '#models/user'
import { inject } from '@adonisjs/core'

interface SaveUserDTO {
  email: string
  password: string
}

@inject()
export default class CreateUserService {
  constructor(protected userModel: User) {}

  async handle({ email, password }: SaveUserDTO) {
    const user = await User.create({ email, password })

    return User.accessTokens.create(user)
  }
}

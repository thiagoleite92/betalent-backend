import User from '#models/user'
import { AuthenticateType } from '#validators/authenticate'
import { inject } from '@adonisjs/core'
import hash from '@adonisjs/core/services/hash'

@inject()
export default class AuthenticateService {
  constructor(protected userModel: User) {}

  async execute({ email, password }: AuthenticateType) {
    const user = await User.verifyCredentials(email, password)

    if (await hash.verify(user.password, password)) {
      return User.accessTokens.create(user)
    }

    return false
  }
}

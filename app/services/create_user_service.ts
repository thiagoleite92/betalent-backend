import { CreateUserType } from '#validators/create_user'
import { inject } from '@adonisjs/core'
import User from '#models/user'

@inject()
export default class CreateUserService {
  constructor(protected userModel: User) {}

  async execute({ email, password }: CreateUserType) {
    await User.create({ email, password })
  }
}

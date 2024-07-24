import { CreateUserType } from '#validators/create_user'
import { inject } from '@adonisjs/core'
import User from '#models/user'
import ResourceConflictException from '#exceptions/resource_conflict_exception'

@inject()
export default class CreateUserService {
  constructor(protected userModel: User) {}

  async execute({ email, password }: CreateUserType) {
    const findUser = await User.findBy('email', email)

    if (findUser) {
      throw new ResourceConflictException('Email já cadastrado', 409)
    }

    await User.create({ email, password })
  }
}

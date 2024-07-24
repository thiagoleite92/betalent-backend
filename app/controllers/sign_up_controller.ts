import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import CreateUserService from '#services/create_user_service'
import { createUserValidator } from '#validators/create_user'

@inject()
export default class SignUpController {
  constructor(protected createUserService: CreateUserService) {}

  async handle({ request, response }: HttpContext) {
    const data = await request.validateUsing(createUserValidator)

    const result = await this.createUserService.execute(data)

    return response.status(201).send(result)
  }
}

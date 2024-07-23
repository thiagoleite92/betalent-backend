import AuthenticateService from '#services/authenticate_service'
import { authenticateValidator } from '#validators/authenticate'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class LoginController {
  constructor(protected authenticateServce: AuthenticateService) {}

  async handle({ request, response }: HttpContext) {
    const data = await request.validateUsing(authenticateValidator)

    const token = await this.authenticateServce.login(data)

    return response.status(200).json({ token })
  }
}

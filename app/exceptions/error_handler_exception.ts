import { Exception } from '@adonisjs/core/exceptions'

export default class ErrorHandlerException extends Exception {
  constructor(message: string, status: number) {
    super()
    this.message = message
    this.status = status
  }
}

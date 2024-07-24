import ErrorHandlerException from './error_handler_exception.js'

export default class ResourceConflictException extends ErrorHandlerException {
  constructor(message: string, status: number = 409) {
    super(message, status)
  }
}

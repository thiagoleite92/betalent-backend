import ErrorHandlerException from './error_handler_exception.js'

export default class ResourceNotFoundException extends ErrorHandlerException {
  constructor(message: string, status: number = 404) {
    super(message, status)
  }
}

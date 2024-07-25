import ErrorHandlerException from './error_handler_exception.js'

export default class SaleQuantitySuparssStock extends ErrorHandlerException {
  constructor(message: string, status: number = 406) {
    super(message, status)
  }
}

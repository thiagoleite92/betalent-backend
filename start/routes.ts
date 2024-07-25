const SalesController = () => import('#controllers/sales_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const SignUpController = () => import('#controllers/sign_up_controller')
const AuthenticateController = () => import('#controllers/login_controller')
const ClientsController = () => import('#controllers/clients_controller')
const ProductsController = () => import('#controllers/products_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router
      .group(() => {
        router.resource('client', ClientsController).apiOnly()
        router.resource('product', ProductsController).apiOnly()
        router.post('sale', [SalesController])
      })
      .use(middleware.auth())

    router.post('signup', [SignUpController])
    router.post('login', [AuthenticateController])
  })
  .prefix('api')

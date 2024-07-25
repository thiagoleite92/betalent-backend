const SalesController = () => import('#controllers/sales_controller')
import router from '@adonisjs/core/services/router'

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
    router.group(() => {
      router.resource('client', ClientsController).apiOnly().except(['show'])
      router.get('client/:id', [ClientsController, 'show'])
      router.resource('product', ProductsController).apiOnly()
      router.post('sale', [SalesController])
    })

    router.post('signup', [SignUpController])
    router.post('login', [AuthenticateController])
  })
  .prefix('api')

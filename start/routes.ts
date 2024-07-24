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
    router.post('/signup', [SignUpController])
    router.post('/login', [AuthenticateController])
    router.resource('/client', ClientsController).except(['create'])
    router.resource('/product', ProductsController).except(['create'])
  })
  .prefix('/api')

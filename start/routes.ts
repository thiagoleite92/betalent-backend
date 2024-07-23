import router from '@adonisjs/core/services/router'

const SignUpController = () => import('#controllers/sign_up_controller')
const AuthenticateController = () => import('#controllers/login_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('/signup', [SignUpController])
    router.post('/login', [AuthenticateController])
  })
  .prefix('/api')

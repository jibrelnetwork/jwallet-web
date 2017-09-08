import CoreLayout from 'layouts/CoreLayout'
import AuthRoute from './Auth'
import JWalletRoute from './JWallet'

const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  childRoutes: [
    AuthRoute(store),
    JWalletRoute(store),
  ],
})

export default createRoutes

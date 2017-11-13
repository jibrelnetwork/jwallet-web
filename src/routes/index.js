import CoreLayout from 'layouts/CoreLayout'
import JWalletRoute from './JWallet'

const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  childRoutes: [
    JWalletRoute(store),
  ],
})

export default createRoutes

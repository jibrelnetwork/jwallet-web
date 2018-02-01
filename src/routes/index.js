import CoreLayout from 'layouts/CoreLayout'
import JWalletRoute from './JWallet'
import KeysRoute from './Keys'

const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: JWalletRoute(store),
  childRoutes: [
    KeysRoute(store),
  ],
})

export default createRoutes

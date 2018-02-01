import CoreLayout from 'layouts/CoreLayout'
import JWalletRoute from './JWallet'
import KeysRoute from './Keys'
import StartRoute from './Start'

const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: JWalletRoute(store),
  childRoutes: [
    KeysRoute(store),
    StartRoute(store),
  ],
})

export default createRoutes

import CoreLayout from 'layouts/CoreLayout'
import JWalletRoute from './JWallet'
import KeysRoute from './Keys'
import StartRoute from './Start'
import DigitalAssetsRoute from './DigitalAssets'

const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: JWalletRoute(store),
  childRoutes: [
    KeysRoute(store),
    StartRoute(store),
    DigitalAssetsRoute(store),
  ],
})

export default createRoutes

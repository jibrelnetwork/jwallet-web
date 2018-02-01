import CoreLayout from 'layouts/CoreLayout'
import JWalletRoute from './JWallet'
import KeysRoute from './Keys'
import StartRoute from './Start'
import DigitalAssetsRoute from './DigitalAssets'
import CreateKeyRoute from './CreateKey'
import ImportKeyRoute from './ImportKey'
import SendFundsRoute from './SendFunds'

const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: JWalletRoute(store),
  childRoutes: [
    KeysRoute(store),
    StartRoute(store),
    DigitalAssetsRoute(store),
    CreateKeyRoute(store),
    ImportKeyRoute(store),
    SendFundsRoute(store),
  ],
})

export default createRoutes

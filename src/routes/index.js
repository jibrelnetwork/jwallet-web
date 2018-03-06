import CoreLayout from 'layouts/CoreLayout'
import JWallet from './JWallet'
import DigitalAssets from './DigitalAssets'
import AddCustomAsset from './AddCustomAsset'
import Funds from './Funds'
import Wallets from './Wallets'

const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: JWallet(store),
  childRoutes: [
    DigitalAssets(store),
    AddCustomAsset(store),
    Funds(store),
    Wallets(store),
  ],
})

export default createRoutes

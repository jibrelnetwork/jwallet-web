import CoreLayout from 'layouts/CoreLayout'
import JWallet from './JWallet'
import Wallets from './Wallets'
import DigitalAssets from './DigitalAssets'
import SendFunds from './SendFunds'
import ReceiveFunds from './ReceiveFunds'
// import ConvertFunds from './ConvertFunds'
import AddCustomAsset from './AddCustomAsset'

const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: JWallet(store),
  childRoutes: [
    Wallets(store),
    DigitalAssets(store),
    SendFunds(store),
    ReceiveFunds(store),
    // ConvertFunds(store),
    AddCustomAsset(store),
  ],
})

export default createRoutes

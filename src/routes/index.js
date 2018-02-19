import CoreLayout from 'layouts/CoreLayout'
import JWalletRoute from './JWallet'
import KeysRoute from './Keys'
import DigitalAssetsRoute from './DigitalAssets'
import SendFundsRoute from './SendFunds'
import ReceiveFundsRoute from './ReceiveFunds'
// import ConvertFundsRoute from './ConvertFunds'
import AddCustomAssetRoute from './AddCustomAsset'

const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: JWalletRoute(store),
  childRoutes: [
    KeysRoute(store),
    DigitalAssetsRoute(store),
    SendFundsRoute(store),
    ReceiveFundsRoute(store),
    // ConvertFundsRoute(store),
    AddCustomAssetRoute(store),
  ],
})

export default createRoutes

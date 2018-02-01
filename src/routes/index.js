import CoreLayout from 'layouts/CoreLayout'
import JWalletRoute from './JWallet'
import KeysRoute from './Keys'
import StartRoute from './Start'
import DigitalAssetsRoute from './DigitalAssets'
import CreateKeyRoute from './CreateKey'
import ImportKeyRoute from './ImportKey'
import SendFundsRoute from './SendFunds'
import ReceiveFundsRoute from './ReceiveFunds'
import EditKeyRoute from './EditKey'
import ChangePasswordRoute from './ChangePassword'
import BackupKeysRoute from './BackupKeys'

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
    ReceiveFundsRoute(store),
    EditKeyRoute(store),
    ChangePasswordRoute(store),
    BackupKeysRoute(store),
  ],
})

export default createRoutes

import WalletsLayout from 'layouts/WalletsLayout'

import Start from './routes/Start'
import Addresses from './routes/Addresses'
import CreateWallet from './routes/CreateWallet'
import ImportWallet from './routes/ImportWallet'
import EditWallet from './routes/EditWallet'
import BackupWallet from './routes/BackupWallet'
import ChangeWalletPassword from './routes/ChangeWalletPassword'
import RemoveWallet from './routes/RemoveWallet'

export default store => ({
  path: 'wallets',
  component: WalletsLayout,
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        const Wallets = require('./containers/WalletsContainer').default
        cb(null, Wallets)
      }, 'wallets')
    },
  },
  childRoutes: [
    Start(store),
    Addresses(store),
    CreateWallet(store),
    ImportWallet(store),
    EditWallet(store),
    BackupWallet(store),
    ChangeWalletPassword(store),
    RemoveWallet(store),
  ],
})

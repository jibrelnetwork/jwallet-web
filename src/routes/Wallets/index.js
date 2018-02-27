import KeysLayout from 'layouts/KeysLayout'

import Start from './routes/Start'
import CreateWallet from './routes/CreateWallet'
import ImportKey from './routes/ImportKey'
import EditKey from './routes/EditKey'
import BackupWallet from './routes/BackupWallet'
import ChangeWalletPassword from './routes/ChangeWalletPassword'
import RemoveWallet from './routes/RemoveWallet'

export default store => ({
  path: 'wallets',
  component: KeysLayout,
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
    CreateWallet(store),
    ImportKey(store),
    EditKey(store),
    BackupWallet(store),
    ChangeWalletPassword(store),
    RemoveWallet(store),
  ],
})

import WalletsLayout from 'layouts/WalletsLayout'

import Start from './routes/Start'
import Addresses from './routes/Addresses'
import Create from './routes/Create'
import Import from './routes/Import'
import Edit from './routes/Edit'
import Backup from './routes/Backup'
import ChangePassword from './routes/ChangePassword'
import Remove from './routes/Remove'

export default store => ({
  path: 'wallets',
  component: WalletsLayout,
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        const View = require('./containers/WalletsViewContainer').default
        cb(null, View)
      }, 'wallets')
    },
  },
  childRoutes: [
    Start(store),
    Addresses(store),
    Create(store),
    Import(store),
    Edit(store),
    Backup(store),
    ChangePassword(store),
    Remove(store),
  ],
})

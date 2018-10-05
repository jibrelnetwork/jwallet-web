import WalletsLayout from 'layouts/WalletsLayout'

import Start from './routes/Start'
import Create from './routes/Create'
import Import from './routes/Import'
/*
import Addresses from './routes/Addresses'
import Edit from './routes/Edit'
import Backup from './routes/Backup'
import ChangePassword from './routes/ChangePassword'
import Remove from './routes/Remove'
*/

export default store => ({
  path: 'wallets',
  component: WalletsLayout,
  indexRoute: {
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        const View = require('./containers/WalletsIndexViewContainer').default
        cb(null, View)
      }, 'wallets')
    },
  },
  childRoutes: [
    Start(store),
    Create,
    Import,
    /*
    Addresses(store),
    Edit(store),
    Backup(store),
    ChangePassword(store),
    Remove(store),
    */
  ],
})

// @flow

import WalletsLayout from 'layouts/WalletsLayout'

import Start from './routes/Start'
import Create from './routes/Create'
import Import from './routes/Import'
import Rename from './routes/Rename'
import WalletsIndex from './WalletsIndexViewContainer'
/*
import Addresses from './routes/Addresses'
import Backup from './routes/Backup'
import ChangePassword from './routes/ChangePassword'
import Remove from './routes/Remove'
*/

export default {
  path: 'wallets',
  component: WalletsLayout,
  indexRoute: {
    component: WalletsIndex,
  },
  childRoutes: [
    Start,
    Create,
    Import,
    Rename,
    /*
    Addresses(store),
    Backup(store),
    ChangePassword(store),
    Remove(store),
    */
  ],
}

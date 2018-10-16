// @flow

import WalletsLayout from 'layouts/WalletsLayout'

import Start from './routes/Start'
import Create from './routes/Create'
import Import from './routes/Import'
import Rename from './routes/Rename'
import Delete from './routes/Delete'
import WalletsIndex from './WalletsIndexViewContainer'
/*
import Addresses from './routes/Addresses'
import Backup from './routes/Backup'
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
    Delete,
    /*
    Addresses(store),
    Backup(store),
    */
  ],
}

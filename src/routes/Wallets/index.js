// @flow

import WalletsLayout from 'layouts/WalletsLayout'

import Start from './routes/Start'
import Create from './routes/Create'
import Import from './routes/Import'
import View from './WalletsIndexViewContainer'
/*
import Addresses from './routes/Addresses'
import Edit from './routes/Edit'
import Backup from './routes/Backup'
import ChangePassword from './routes/ChangePassword'
import Remove from './routes/Remove'
*/

export default {
  path: 'wallets',
  component: WalletsLayout,
  indexRoute: {
    component: View,
  },
  childRoutes: [
    Start,
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
}

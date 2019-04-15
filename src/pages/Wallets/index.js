// @flow

import WalletsLayout from 'layouts/WalletsLayout'

import Start from './routes/Start'
import Create from './routes/Create'
import Import from './routes/Import'
import Rename from './routes/Rename'
import Backup from './routes/Backup'
import Delete from './routes/Delete'
import Addresses from './routes/Addresses'
import RenameAddress from './routes/RenameAddress'
import WalletsIndex from './WalletsIndexViewContainer'

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
    Backup,
    Delete,
    Addresses,
    RenameAddress,
  ],
}

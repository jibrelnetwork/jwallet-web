// @flow

import MenuLayout from 'layouts/MenuLayout'

import AddAsset from './routes/AddAsset'
import EditAsset from './routes/EditAsset'
import Manage from './routes/Manage'
import Receive from './routes/Receive'

export default {
  path: 'digital-assets',
  component: MenuLayout,
  indexRoute: {
    onEnter: (nextState: AppState, replace: (string) => void) => replace('/'),
  },
  childRoutes: [
    Manage,
    AddAsset,
    EditAsset,
    Receive,
  ],
}

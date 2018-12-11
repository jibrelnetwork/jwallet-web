// @flow

import MenuLayout from 'layouts/MenuLayout'

import Grid from './routes/Grid'
import AddAsset from './routes/AddAsset'
import EditAsset from './routes/EditAsset'
import Manage from './routes/Manage'
import Send from './routes/Send'

export default {
  path: 'digital-assets',
  component: MenuLayout,
  indexRoute: {
    onEnter: (nextState: AppState, replace: (string) => void) => replace('/digital-assets/grid'),
  },
  childRoutes: [
    Grid,
    Manage,
    AddAsset,
    EditAsset,
    ...Send,
  ],
}

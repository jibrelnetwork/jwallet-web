// @flow

import { AsideLayout } from 'layouts'

import Grid from './routes/Grid'
import AddAsset from './routes/AddAsset'
import EditAsset from './routes/EditAsset'
import Manage from './routes/Manage'

export default {
  path: 'digital-assets',
  component: AsideLayout,
  indexRoute: {
    onEnter: (nextState: AppState, replace: (string) => void) => replace('/digital-assets/grid'),
  },
  childRoutes: [
    Grid,
    Manage,
    AddAsset,
    EditAsset,
  ],
}

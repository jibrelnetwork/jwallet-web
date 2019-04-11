// @flow

import MenuLayout from 'layouts/MenuLayout'

import Grid from './routes/Grid'
import AddAsset from './routes/AddAsset'
import EditAsset from './routes/EditAsset'
import Manage from './routes/Manage'
import Send from './routes/Send'
import SendWizard from './routes/SendWizard'
import Receive from './routes/Receive'

export default {
  path: 'digital-assets',
  component: MenuLayout,
  indexRoute: {
    onEnter: (nextState: AppState, replace: (string) => void) => replace('/'),
  },
  childRoutes: [
    SendWizard,
    Grid,
    Manage,
    AddAsset,
    EditAsset,
    Send,
    Receive,
  ],
}

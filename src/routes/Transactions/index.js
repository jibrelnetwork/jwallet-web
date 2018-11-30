// @flow

import MenuLayout from 'layouts/MenuLayout'

import Asset from './routes/Asset'
import TransactionsIndex from './TransactionsIndexViewContainer'

export default {
  path: 'transactions',
  component: MenuLayout,
  indexRoute: {
    component: TransactionsIndex,
  },
  childRoutes: [
    Asset,
  ],
}

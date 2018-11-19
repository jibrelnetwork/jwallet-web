// @flow

import AsideLayout from 'layouts/AsideLayout'

import Asset from './routes/Asset'
import TransactionsIndex from './TransactionsIndexViewContainer'

export default {
  path: 'transactions',
  component: AsideLayout,
  indexRoute: {
    component: TransactionsIndex,
  },
  childRoutes: [
    Asset,
  ],
}

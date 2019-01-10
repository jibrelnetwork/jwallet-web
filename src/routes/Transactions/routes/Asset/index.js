// @flow

import { ga } from 'utils/analytics'
import View from './TransactionsAssetViewContainer'

export default {
  path: ':asset',
  onEnter: (nextState: ReactRouterState): void =>
    ga(
      'send',
      'pageview',
      nextState.location.pathname
    ),
  component: View,
}

// @flow

import { gaSendPageView } from 'utils/analytics'
import View from './TransactionsAssetViewContainer'

export default {
  path: ':asset',
  onEnter: (nextState: ReactRouterState): void =>
    gaSendPageView(
      nextState.location.pathname
    ),
  component: View,
}

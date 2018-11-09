// @flow

import CoreLayout from 'layouts/CoreLayout'

/*
import Funds from './Funds'
import Transactions from './Transactions'
*/
import DigitalAssets, {
  type DigitalAssetsAllActions,
} from './DigitalAssets'

import Wallets from './Wallets'
import NotFound from './NotFound'
import Terms from './Terms'

export type AppActions = DigitalAssetsAllActions

export default {
  path: '/',
  component: CoreLayout,
  indexRoute: {
    onEnter: (nextState: AppState, replace: (string) => void) => replace('/transactions'),
  },
  childRoutes: [
    /*
    Funds(store),
    Transactions(store),
    */
    DigitalAssets,
    Wallets,
    Terms,
    NotFound,
  ],
}

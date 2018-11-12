// @flow

import CoreLayout from 'layouts/CoreLayout'

/*
import Funds from './Funds'
import Transactions from './Transactions'
*/

import DigitalAssets from './DigitalAssets'
import Wallets from './Wallets'
import NotFound from './NotFound'
import Terms from './Terms'

import {
  type CoreActions,
} from './modules'

import {
  type DigitalAssetsAllActions,
} from './DigitalAssets/modules'

export type AppActions = DigitalAssetsAllActions |
  CoreActions

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

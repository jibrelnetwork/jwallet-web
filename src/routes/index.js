// @flow

import CoreLayout from 'layouts/CoreLayout'

/*
import Funds from './Funds'
import Transactions from './Transactions'
*/

import Terms from './Terms'
import Wallets from './Wallets'
import Settings from './Settings'
import NotFound from './NotFound'
import DigitalAssets from './DigitalAssets'

import {
  type CoreAction,
} from './modules'

import {
  type DigitalAssetsModuleAction,
} from './DigitalAssets/modules'

import {
  type NotFoundAction,
} from './NotFound/modules/notFound'

export type AppAction = DigitalAssetsModuleAction |
  CoreAction |
  NotFoundAction

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
    Terms,
    Wallets,
    Settings,
    DigitalAssets,
    NotFound,
  ],
}

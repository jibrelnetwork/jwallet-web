// @flow

import CoreLayout from 'layouts/CoreLayout'

/*
import Funds from './Funds'
*/

import Terms from './Terms'
import Wallets from './Wallets'
import Settings from './Settings'
import NotFound from './NotFound'
import Transactions from './Transactions'
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

export type AppAction =
  CoreAction |
  NotFoundAction |
  DigitalAssetsModuleAction

export default {
  path: '/',
  component: CoreLayout,
  indexRoute: {
    onEnter: (nextState: AppState, replace: (string) => void) => replace('/wallets'),
  },
  childRoutes: [
    /*
    Funds(store),
    */
    Terms,
    Wallets,
    Settings,
    Transactions,
    DigitalAssets,
    NotFound,
  ],
}

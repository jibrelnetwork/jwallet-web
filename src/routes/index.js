// @flow

import CoreLayout from 'layouts/CoreLayout'
import {
  reactRouterOnChangePageView,
  reactRouterOnEnterPageView,
} from 'utils/analytics'

/*
import Funds from './Funds'
*/

import Wallets from './Wallets'
import Settings from './Settings'
import NotFound from './NotFound'
import Transactions from './Transactions'
import DigitalAssets from './DigitalAssets'
import Favorites from './Favorites'
import Verify from './Verify'

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

const customAnalyticsRoutes = [
  /^\/transactions\/.+/,
]

export default {
  path: '/',
  component: CoreLayout,
  onEnter: reactRouterOnEnterPageView(customAnalyticsRoutes),
  onChange: reactRouterOnChangePageView(customAnalyticsRoutes),
  indexRoute: {
    onEnter: (nextState: AppState, replace: (string) => void) => replace('/digital-assets'),
  },
  childRoutes: [
    /*
    Funds(store),
    */
    Wallets,
    Settings,
    Transactions,
    DigitalAssets,
    Favorites,
    Verify,
    NotFound,
  ],
}

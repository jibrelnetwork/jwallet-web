// @flow

import CoreLayout from 'layouts/CoreLayout'
import {
  reactRouterOnChangePageView,
  reactRouterOnEnterPageView,
} from 'utils/analytics'

import Wallets from './Wallets'
import Settings from './Settings'
import NotFound from './NotFound'
import Transactions from './Transactions'
import DigitalAssets from './DigitalAssets'
import Favorites from './Favorites'
import Upgrade from './Upgrade'
import Agreements from './Agreements'

import type { CoreAction } from './modules'
import type { NotFoundAction } from './NotFound/modules/notFound'
import type { DigitalAssetsModuleAction } from './DigitalAssets/modules'

export type AppAction =
  CoreAction |
  NotFoundAction |
  DigitalAssetsModuleAction

const customAnalyticsRoutes = [
  /^\/transactions\/.+/,
  /^\/digital-assets\/edit-asset\/.+/,
]

export default {
  path: '/',
  component: CoreLayout,
  onEnter: reactRouterOnEnterPageView(customAnalyticsRoutes),
  onChange: reactRouterOnChangePageView(customAnalyticsRoutes),
  childRoutes: [
    /*
    Funds(store),
    */
    Wallets,
    Settings,
    Transactions,
    DigitalAssets,
    Favorites,
    Upgrade,
    Agreements,
    NotFound,
  ],
}

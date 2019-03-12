// @flow

import CoreLayout from 'layouts/CoreLayout'

import {
  reactRouterOnChangePageView,
  reactRouterOnEnterPageView,
} from 'utils/analytics'

import { type CoreAction } from 'store/modules/core'
import { type NotFoundAction } from 'store/modules/notFound'
import { type DigitalAssetsModuleAction } from 'store/modules/digitalAssets'

import Wallets from './Wallets'
import Settings from './Settings'
import NotFound from './NotFound'
import Transactions from './Transactions'
import DigitalAssets from './DigitalAssets'
import Favorites from './Favorites'
import Upgrade from './Upgrade'
import Agreements from './Agreements'

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

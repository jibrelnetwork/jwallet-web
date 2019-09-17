// @flow strict

import {
  combineReducers,
  type Reducer,
} from 'redux'

import { router5Reducer as router } from 'redux-router5'

import blocks from 'store/modules/blocks'
import ticker from 'store/modules/ticker'
import balances from 'store/modules/balances'
import comments from 'store/modules/comments'
import networks from 'store/modules/networks'
import transactions from 'store/modules/transactions'
import favorites from 'store/modules/favorites'

// digital assets
import digitalAssets from 'store/modules/digitalAssets'
import digitalAssetsAdd from 'store/modules/addAsset'

// wallets
import wallets from 'store/modules/wallets'
import walletsCreate from 'store/modules/walletsCreate'
import walletsAddresses from 'store/modules/walletsAddresses'

// user
import user from 'store/modules/user'

// toasts
import toasts from 'store/modules/toasts'

import { type AppAction } from 'store/modules'
import { password } from 'store/modules/password'

import { persistReducers } from './persistReducers'

export function makeRootReducer(): Reducer<AppState, AppAction> {
  const rootReducer: Reducer<AppState, AppAction> = combineReducers({
    router,
    toasts,
    walletsCreate,
    digitalAssetsAdd,
    ...persistReducers({
      blocks,
      ticker,
      wallets,
      balances,
      comments,
      networks,
      password,
      favorites,
      transactions,
      digitalAssets,
      walletsAddresses,
      user,
    }),
  })

  return rootReducer
}

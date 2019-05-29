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
import upgrade from 'store/modules/upgrade'
import transactions from 'store/modules/transactions'
import settings from 'store/modules/settings'
import favorites from 'store/modules/favorites'

// digital assets
import digitalAssets from 'store/modules/digitalAssets'
import digitalAssetsAdd from 'store/modules/addAsset'
import digitalAssetsEdit from 'store/modules/editAsset'
import digitalAssetsSend from 'store/modules/digitalAssetsSend'
import digitalAssetsGrid from 'store/modules/digitalAssetsGrid'
import digitalAssetsManage from 'store/modules/digitalAssetsManage'

// wallets
import wallets from 'store/modules/wallets'
import walletsCreate from 'store/modules/walletsCreate'
import walletsAddresses from 'store/modules/walletsAddresses'
import walletsRenameAddress from 'store/modules/walletsRenameAddress'

// user
import user from 'store/modules/user'

import { type AppAction } from 'store/modules'
import { password } from 'store/modules/password'

import { persistReducers } from './persistReducers'

export function makeRootReducer(): Reducer<AppState, AppAction> {
  const rootReducer: Reducer<AppState, AppAction> = combineReducers({
    router,
    upgrade,
    // wallets
    walletsCreate,
    walletsRenameAddress,
    // digitalAssets
    digitalAssetsAdd,
    digitalAssetsEdit,
    digitalAssetsSend,
    digitalAssetsGrid,
    digitalAssetsManage,
    ...persistReducers({
      blocks,
      ticker,
      wallets,
      balances,
      comments,
      networks,
      password,
      settings,
      favorites,
      transactions,
      digitalAssets,
      walletsAddresses,
      user,
    }),
  })

  return rootReducer
}

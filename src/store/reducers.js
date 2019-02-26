// @flow

import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import type { Reducer } from 'redux'

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
import walletsImport from 'store/modules/walletsImport'
import walletsBackup from 'store/modules/walletsBackup'
import walletsAddresses from 'store/modules/walletsAddresses'
import walletsRenameAddress from 'store/modules/walletsRenameAddress'

import type { AppAction } from 'routes'

import persistReducers from './persistReducers'

export function makeRootReducer() {
  const rootReducer: Reducer<AppState, AppAction> = combineReducers({
    router,
    upgrade,
    // wallets
    walletsCreate,
    walletsImport,
    walletsBackup,
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
      settings,
      favorites,
      transactions,
      digitalAssets,
      walletsAddresses,
    }),
  })

  return rootReducer
}

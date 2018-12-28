// @flow

import storage from 'localforage'
import { combineReducers, type Reducer } from 'redux'
import { persistReducer } from 'redux-persist'
import { routerReducer as router } from 'react-router-redux'

import { type AppAction } from 'routes'

// wallets
import wallets from 'routes/Wallets/modules/wallets'
import walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'
import walletsImport from 'routes/Wallets/routes/Import/modules/walletsImport'
import walletsBackup from 'routes/Wallets/routes/Backup/modules/walletsBackup'
import walletsAddresses from 'routes/Wallets/routes/Addresses/modules/walletsAddresses'
import walletsRenameAddress from 'routes/Wallets/routes/RenameAddress/modules/walletsRenameAddress'

// Digital ssets
import digitalAssets from 'routes/DigitalAssets/modules/digitalAssets'
import addAsset from 'routes/DigitalAssets/routes/AddAsset/modules/addAsset'
import editAsset from 'routes/DigitalAssets/routes/EditAsset/modules/editAsset'
import digitalAssetsGrid from 'routes/DigitalAssets/routes/Grid/modules/digitalAssetsGrid'
import digitalAssetsManage from 'routes/DigitalAssets/routes/Manage/modules/digitalAssetsManage'

// Send digital asset
import digitalAssetsSend from 'routes/DigitalAssets/routes/Send/modules/digitalAssetsSend'

// networks
import networks from 'routes/modules/networks'

// blocks
import blocks from 'routes/modules/blocks'

// balances
import balances from 'routes/modules/balances'

// comments
import comments from 'routes/modules/comments'

// transactions
import transactions from 'routes/modules/transactions'

// settings
import settings from 'routes/Settings/modules/settings'

// favorites
import favorites from 'routes/Favorites/modules/favorites'

const persistConfig = {
  storage,
  key: 'jwallet-web',
  whitelist: [
    'blocks',
    'wallets',
    'balances',
    'comments',
    'favorites',
    'transactions',
    'digitalAssets',
    'walletsAddresses',
  ],
}

export function makeRootReducer() {
  const rootReducer: Reducer<AppState, AppAction> = combineReducers({
    // wallets
    wallets,
    walletsCreate,
    walletsImport,
    walletsBackup,
    walletsAddresses,
    walletsRenameAddress,
    // networks
    networks,
    // digitalAssets
    digitalAssets,
    digitalAssetsGrid,
    digitalAssetsManage,
    addAsset,
    editAsset,
    // send asset
    digitalAssetsSend,
    // blocks
    blocks,
    // balances
    balances,
    // comments
    comments,
    // transactions
    transactions,
    // settings
    settings,
    // favorites
    favorites,
    // router
    router,
  })

  return persistReducer/* :: < AppState, AppAction > */(persistConfig, rootReducer)
}

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

// networks
import networks from 'routes/modules/networks'

// blocks
import blocks from 'routes/modules/blocks'

// balances
import balances from 'routes/modules/balances'

// transactions
import transactions from 'routes/modules/transactions'

const persistConfig = {
  storage,
  key: 'jwallet-web',
  whitelist: ['wallets', 'walletsAddresses'],
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
    addAsset,
    editAsset,
    // transactions
    transactions,
    // blocks
    blocks,
    // balances
    balances,
    // router
    router,
  })

  return persistReducer/* :: < AppState, AppAction > */(persistConfig, rootReducer)
}

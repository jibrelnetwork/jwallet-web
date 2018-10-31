// @flow

import storage from 'localforage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import { routerReducer as router } from 'react-router-redux'

import type { Store, Reducer } from 'react-redux'

// wallets
import wallets from 'routes/Wallets/modules/wallets'
import transactions from 'routes/Transactions/modules/transactions'
import walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'
import walletsImport from 'routes/Wallets/routes/Import/modules/walletsImport'
import walletsBackup from 'routes/Wallets/routes/Backup/modules/walletsBackup'
import walletsAddresses from 'routes/Wallets/routes/Addresses/modules/walletsAddresses'
import walletsRenameAddress from 'routes/Wallets/routes/RenameAddress/modules/walletsRenameAddress'

// networks
import networks from 'routes/modules/networks'

// digitalAssets
import digitalAssets from 'routes/DigitalAssets/modules/digitalAssets'
import customAsset from 'routes/CustomAsset/modules/customAsset'

type KeyReducer = { key: string, reducer: Reducer<State, *> }

const persistConfig = {
  storage,
  key: 'jwallet-web',
  whitelist: ['wallets', 'walletsAddresses'],
}

export function makeRootReducer(asyncReducers: ?Reducers): Reducer<State, *> {
  const rootReducer = combineReducers({
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
    customAsset,
    // transactions
    transactions,
    // router
    router,
    // async
    ...asyncReducers,
  })

  return persistReducer(persistConfig, rootReducer)
}

export function injectReducer(store: Store<State, *>, { key, reducer }: KeyReducer) {
  store.replaceReducer(makeRootReducer({
    ...store.asyncReducers,
    [key]: reducer,
  }))
}

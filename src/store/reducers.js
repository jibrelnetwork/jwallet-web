// @flow

import storage from 'localforage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import { routerReducer as router } from 'react-router-redux'

// wallets
import wallets from 'routes/Wallets/modules/wallets'
import transactions from 'routes/Transactions/modules/transactions'
import walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'
import walletsImport from 'routes/Wallets/routes/Import/modules/walletsImport'
import walletsBackup from 'routes/Wallets/routes/Backup/modules/walletsBackup'
import walletsAddresses from 'routes/Wallets/routes/Addresses/modules/walletsAddresses'

// networks
import networks from 'routes/modules/networks'

// digitalAssets
import digitalAssets from 'routes/DigitalAssets/modules/digitalAssets'

type KeyReducer = { key: string, reducer: Reducer<any, any> }

const persistConfig = {
  storage,
  key: 'jwallet-web',
  whitelist: ['wallets'],
}

export function makeRootReducer(asyncReducers: ?Reducers): Reducer<any, any> {
  const rootReducer = combineReducers({
    // wallets
    wallets,
    walletsCreate,
    walletsImport,
    walletsBackup,
    walletsAddresses,
    // networks
    networks,
    // digitalAssets
    digitalAssets,
    // transactions
    transactions,
    // router
    router,
    // async
    ...asyncReducers,
  })

  return persistReducer(persistConfig, rootReducer)
}

export function injectReducer(store: Store, { key, reducer }: KeyReducer) {
  store.replaceReducer(makeRootReducer({
    ...store.asyncReducers,
    [key]: reducer,
  }))
}

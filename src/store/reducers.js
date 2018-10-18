// @flow

import storage from 'localforage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import { routerReducer as router } from 'react-router-redux'

import networks from 'routes/modules/networks'

import wallets from 'routes/Wallets/modules/wallets'
import transactions from 'routes/Transactions/modules/transactions'
import walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'
import walletsImport from 'routes/Wallets/routes/Import/modules/walletsImport'

import digitalAssets from 'routes/DigitalAssets/modules/digitalAssets'
import customAsset from 'routes/CustomAsset/modules/customAsset'

type KeyReducer = { key: string, reducer: Reducer<any, any> }

const persistConfig = {
  storage,
  key: 'jwallet-web',
  whitelist: ['wallets'],
}

export function makeRootReducer(asyncReducers: ?Reducers): Reducer<any, any> {
  const rootReducer = combineReducers({
    networks,
    wallets,
    walletsCreate,
    walletsImport,
    digitalAssets,
    customAsset,
    transactions,
    router,
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

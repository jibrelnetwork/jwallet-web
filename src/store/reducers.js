// @flow

import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import { routerReducer as router } from 'react-router-redux'

import networks from 'routes/modules/networks'

import wallets from 'routes/Wallets/modules/wallets'
import walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'

import digitalAssets from 'routes/DigitalAssets/modules/digitalAssets'

const persistConfig = {
  storage,
  key: 'jwallet-web',
  whitelist: ['wallets'],
}

export function makeRootReducer(asyncReducers) {
  const rootReducer = combineReducers({
    networks,
    wallets,
    walletsCreate,
    digitalAssets,
    router,
    ...asyncReducers,
  })

  return persistReducer(persistConfig, rootReducer)
}

export function injectReducer(store, { key, reducer }) {
  store.replaceReducer(makeRootReducer({
    ...store.asyncReducers,
    [key]: reducer,
  }))
}

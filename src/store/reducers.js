// @flow

import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import networks from 'routes/modules/networks'

import wallets from 'routes/Wallets/modules/wallets'
import walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'

import digitalAssets from 'routes/DigitalAssets/modules/digitalAssets'

export function makeRootReducer(asyncReducers: Object): Object {
  return combineReducers({
    networks,
    wallets,
    walletsCreate,
    digitalAssets,
    router,
    ...asyncReducers,
  })
}

/* eslint-disable no-param-reassign */
export function injectReducer(store: Object, { key, reducer }: Object): void {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}
/* eslint-enable no-param-reassign */

import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import networks from 'routes/modules/networks'
import wallets from 'routes/Wallets/modules/wallets'
import digitalAssets from 'routes/DigitalAssets/modules/digitalAssets'

export const makeRootReducer = (asyncReducers: Object) => combineReducers({
  networks,
  wallets,
  digitalAssets,
  router,
  ...asyncReducers,
})

/* eslint-disable no-param-reassign */
export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

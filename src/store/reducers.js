import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import funds from 'routes/JWallet/modules/funds'
import keys from 'routes/JWallet/modules/keys'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    funds,
    keys,
    router,
    ...asyncReducers,
  })
}

/* eslint-disable no-param-reassign */
export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

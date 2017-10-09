import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import currencies from 'routes/JWallet/modules/currencies'
import funds from 'routes/JWallet/modules/funds'
import keystore from 'routes/JWallet/modules/keystore'
import networks from 'routes/JWallet/modules/networks'
import transactions from 'routes/JWallet/modules/transactions'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    currencies,
    funds,
    keystore,
    networks,
    transactions,
    router,
    ...asyncReducers,
  })
}

/* eslint-disable no-param-reassign */
export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

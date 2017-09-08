import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import accounts from 'routes/JWallet/modules/accounts'
import funds from 'routes/JWallet/modules/funds'
import keys from 'routes/JWallet/modules/keys'
import transactions from 'routes/JWallet/modules/transactions'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    accounts,
    funds,
    keys,
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

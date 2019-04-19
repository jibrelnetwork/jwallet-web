// @flow strict

import storage from 'localforage'
import { persistReducer } from 'redux-persist'
import { type Reducer } from 'redux'
import { type PersistConfig } from 'redux-persist/lib/types.js.flow'

type PersistableReducerName =
  'blocks' |
  'ticker' |
  'wallets' |
  'balances' |
  'comments' |
  'networks' |
  'password' |
  'settings' |
  'favorites' |
  'transactions' |
  'digitalAssets' |
  'walletsAddresses'

type PersistableReducer = Reducer<any, any>
type PersistableReducers = { [PersistableReducerName]: ?PersistableReducer }

function persistConfig(reducerName: PersistableReducerName): PersistConfig {
  return {
    storage,
    whitelist: ['persist'],
    key: `jwallet-web-${reducerName}`,
  }
}

function getPersistableReducer(
  name: PersistableReducerName,
  reducer: ?PersistableReducer,
): ?PersistableReducer {
  return reducer && persistReducer/* :: < any, any > */(persistConfig(name), reducer)
}

export function persistReducers(reducers: PersistableReducers) {
  const persistableReducers: PersistableReducers = Object.keys(reducers).reduce((
    result: PersistableReducers,
    reducerName: PersistableReducerName,
  ): PersistableReducers => {
    const persistableReducer: ?PersistableReducer
      = getPersistableReducer(reducerName, reducers[reducerName])

    if (!persistableReducer) {
      return result
    }

    return {
      ...result,
      [reducerName]: persistableReducer,
    }
  }, {})

  return persistableReducers
}

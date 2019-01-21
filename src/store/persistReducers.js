// @flow

import storage from 'localforage'
import { persistReducer } from 'redux-persist'

import type { Reducer } from 'redux'
import type { AppAction } from 'routes'
import type { PersistConfig } from 'redux-persist/lib/types.js.flow'

type PersistableReducerName =
  'blocks' |
  'ticker' |
  'wallets' |
  'balances' |
  'comments' |
  'networks' |
  'favorites' |
  'transactions' |
  'digitalAssets' |
  'walletsAddresses'

type PersistableReducer = Reducer<any, AppAction>
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
  return reducer && persistReducer/* :: < any, AppAction > */(persistConfig(name), reducer)
}

function persistReducers(reducers: PersistableReducers) {
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

export default persistReducers

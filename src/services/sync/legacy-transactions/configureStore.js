// @flow strict

import createSagaMiddleware from 'redux-saga'

import {
  compose,
  createStore,
  applyMiddleware,
  type Store,
} from 'redux'

import { type HistoryAction } from './modules/core'
import { type HistoryState } from './types'

import sagas from './sagas'
import reducers from './reducers'

const sagaMiddleware = createSagaMiddleware()

export function configureStore(
  initialState: $Shape<HistoryState> = {},
) {
  const composeEnhancers = (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      name: 'Ethereum Blockchain Synchronization',
    })
    : compose

  const enhancer = composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
    ),
  )

  const store: Store<HistoryState, HistoryAction> = createStore(
    reducers,
    initialState,
    enhancer,
  )

  // ======================================================
  // Run sagas
  // ======================================================
  sagas.forEach(saga => sagaMiddleware.run(saga))

  return store
}

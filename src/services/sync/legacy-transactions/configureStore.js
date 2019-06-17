// @flow

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
import { makeRootReducer } from './reducers'

const sagaMiddleware = createSagaMiddleware()

export function configureStore(
  initialState: $Shape<HistoryState> = {},
) {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    sagaMiddleware,
  ]

  // ======================================================
  // Store Enhancers, redux developer tools
  // ======================================================
  const composeEnhancers =
    typeof window === 'object'
    && __DEV__
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: 'Ethereum Blockchain Synchronization',
      })
      : compose

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const rootReducer = makeRootReducer()

  const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
  )

  const store: Store<HistoryState, HistoryAction> = createStore(rootReducer, initialState, enhancer)

  // ======================================================
  // Run sagas
  // ======================================================
  sagas.forEach(saga => sagaMiddleware.run(saga))

  return store
}

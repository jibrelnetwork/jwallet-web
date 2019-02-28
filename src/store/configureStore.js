// @flow

import createSagaMiddleware from 'redux-saga'

import { persistStore } from 'redux-persist'
import { routerMiddleware } from 'react-router-redux'

import {
  compose,
  createStore,
  applyMiddleware,
} from 'redux'

import sagas from './sagas'
import workers from '../workers'
import middlewares from '../middlewares'
import { makeRootReducer } from './reducers'
import { redirect } from '../middlewares/redirect'

const sagaMiddleware = createSagaMiddleware()

function configureStore(initialState: $Shape<AppState> = {}, history: Object) {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [sagaMiddleware, redirect, routerMiddleware(history), ...middlewares]

  if (__DEV__ && !window.localStorage.hideReduxLogger) {
    const { logger } = require('redux-logger')

    /* eslint-disable fp/no-mutating-methods */
    middleware.push(logger)
    /* eslint-enable fp/no-mutating-methods */
  }

  // ======================================================
  // Store Enhancers, redux developer tools
  // ======================================================
  const composeEnhancers =
    typeof window === 'object' && __DEV__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const rootReducer = makeRootReducer()
  const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
  )
  const store = createStore(rootReducer, initialState, enhancer)
  const persistor = persistStore(store)

  // ======================================================
  // Run sagas
  // ======================================================
  sagas.forEach(saga => sagaMiddleware.run(saga))

  // ======================================================
  // Start workers
  // ======================================================
  workers.forEach(worker => worker.run(store))

  return {
    store,
    persistor,
  }
}

export default configureStore

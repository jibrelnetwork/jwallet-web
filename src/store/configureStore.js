// @flow
import { forOwn, isObject } from 'lodash-es'

import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist'
import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, compose, createStore } from 'redux'

import sagas from 'store/sagas'
import { makeRootReducer } from './reducers'
import workers from '../workers'
import middlewares from '../middlewares'
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
  forOwn(sagas, saga =>
    isObject(saga) ?
      forOwn(saga, sagaMiddleware.run)
      : sagaMiddleware.run(saga)
  )

  // ======================================================
  // Start workers
  // ======================================================
  workers.forEach(worker => worker.run(store))

  return { store, persistor }
}

export default configureStore

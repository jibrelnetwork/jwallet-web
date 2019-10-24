// @flow

import createSagaMiddleware from 'redux-saga'

import { forOwn } from 'lodash-es'
import { persistStore } from 'redux-persist'

import {
  reduxPlugin,
  router5Middleware,
} from 'redux-router5'

import {
  compose,
  createStore,
  applyMiddleware,
  type Store,
} from 'redux'

import { type AppAction } from 'store/modules'

import sagas from './sagas'
import middlewares from '../middlewares'
import { makeRootReducer } from './reducers'
import * as plugins from './plugins'

const sagaMiddleware = createSagaMiddleware()

export function configureStore({
  initialState = {},
  router,
}: {
  initialState: $Shape<AppState>,
  router: Object,
}) {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    sagaMiddleware,
    router5Middleware(router),
    // redirect,
    ...middlewares,
  ]

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

  const store: Store<AppState, AppAction> = createStore(rootReducer, initialState, enhancer)
  const persistor = persistStore(store)
  router.usePlugin(reduxPlugin(store.dispatch))

  // ======================================================
  // Run sagas
  // ======================================================
  sagas.forEach(saga => sagaMiddleware.run(saga))

  // ======================================================
  // Connect plugins
  // ======================================================
  forOwn(plugins, plugin => plugin.connect(store))

  return {
    store,
    persistor,
  }
}

// @flow

import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist'
import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, compose, createStore } from 'redux'

import sagas from './sagas'
import workers from '../workers'
import middlewares from '../middlewares'
import { makeRootReducer } from './reducers'

const sagaMiddleware = createSagaMiddleware()

function configureStore(initialState: InitialState = {}, history: Object): {|
  +store: Store,
  +persistor: Persistor,
|} {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [sagaMiddleware, routerMiddleware(history), ...middlewares]

  if (__DEV__) {
    const { logger } = require('redux-logger')

    /* eslint-disable fp/no-mutating-methods */
    middleware.push(logger)
    /* eslint-enable fp/no-mutating-methods */
  }

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const rootReducer = makeRootReducer()
  const enhancer = compose(applyMiddleware(...middleware), ...enhancers)
  const store = createStore(rootReducer, initialState, enhancer)
  const persistor = persistStore(store)

  store.asyncReducers = {}

  // ======================================================
  // Inject sagas
  // ======================================================
  Object.keys(sagas).forEach(sagaName => sagaMiddleware.run(sagas[sagaName]))

  // ======================================================
  // Start workers
  // ======================================================
  workers.forEach(worker => worker.run(store))

  const hmr: HMR = (module: any).hot

  if (hmr) {
    hmr.accept('./reducers', () => {
      const reducers = require('./reducers').makeRootReducer

      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return { store, persistor }
}

export default configureStore

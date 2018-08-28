import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, compose, createStore } from 'redux'

import sagas from './sagas'
import middlewares from '../middlewares'
import { makeRootReducer } from './reducers'

const sagaMiddleware = createSagaMiddleware()

function configureStore(initialState = {}, history) {
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
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  store.asyncReducers = {}

  // ======================================================
  // Inject sagas
  // ======================================================
  Object.keys(sagas).forEach(sagaName => sagaMiddleware.run(sagas[sagaName]))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').makeRootReducer

      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}

export default configureStore

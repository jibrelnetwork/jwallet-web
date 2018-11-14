// @flow

import React from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import type { Persistor } from 'redux-persist/lib/types'
import { type Store, type Dispatch } from 'redux'
import { type AppAction } from 'routes'

type Props = {
  store: Store<AppState, AppAction, Dispatch<AppAction>>,
  routes: Object,
  history: Object,
  persistor: Persistor,
}

const AppContainer = ({ history, routes, store, persistor }: Props) => (
  <Provider store={store}>
    <div style={{ height: '100%' }}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          {routes}
        </Router>
      </PersistGate>
    </div>
  </Provider>
)

export default AppContainer

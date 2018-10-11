// @flow

import React from 'react'
import { css } from 'glamor'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'

const toastStyles = css({
  right: '45px',
  width: '365px',
  padding: '5px',
  boxShadow: 'none',
})

type Props = {
  store: Object,
  routes: Object,
  history: Object,
  persistor: Object,
}

const AppContainer = ({ history, routes, store, persistor }: Props) => (
  <Provider store={store}>
    <div style={{ height: '100%' }}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          {routes}
        </Router>
      </PersistGate>
      <ToastContainer toastClassName={toastStyles} />
    </div>
  </Provider>
)

export default AppContainer

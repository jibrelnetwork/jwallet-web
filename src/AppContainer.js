// @flow

import React from 'react'
import { css } from 'glamor'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const toastStyles = css({
  right: '45px',
  width: '365px',
  padding: '5px',
  boxShadow: 'none',
})

const AppContainer = ({ history, routes, store }: Props) => (
  <Provider store={store}>
    <div style={{ height: '100%' }}>
      <Router history={history}>
        {routes}
      </Router>
      <ToastContainer toastClassName={toastStyles} />
    </div>
  </Provider>
)

type Props = {
  history: Object,
  routes: Object,
  store: Object,
}

export default AppContainer

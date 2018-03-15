import React from 'react'
import { css } from 'glamor'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'

const toastStyles = css({
  right: '45px',
  width: '365px',
  padding: '5px',
  boxShadow: 'none',
})

const AppContainer = ({ history, routes, store }) => (
  <Provider store={store}>
    <div style={{ height: '100%' }}>
      <Router history={history} children={routes} />
      <ToastContainer toastClassName={toastStyles} />
    </div>
  </Provider>
)

/* eslint-disable react/forbid-prop-types */
AppContainer.propTypes = {
  history: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
}

export default AppContainer

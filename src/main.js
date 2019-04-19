// @flow

import React from 'react'
import ReactDOM from 'react-dom'

import { router } from 'store/router'
import { configureStore } from 'store/configureStore'

import {
  DIMENSIONS,
  gaSetUserDimension,
} from 'utils/analytics'

import './data/lang'
import browsercheck from './browsercheck'
import { AppContainer } from './AppContainer'

// ========================================================
// Store and History Instantiation
// ========================================================
// Create redux store and sync with redux-router5
const initialState = window.___INITIAL_STATE__

const {
  store,
  persistor,
} = configureStore({
  initialState,
  router,
})

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE: ?HTMLElement = document.getElementById('root')

if (!MOUNT_NODE) {
  throw new Error('MOUNT_NODE does not exist')
}

// FIXME: move to analytics middleware after language selection implementation
if (navigator.language) {
  gaSetUserDimension(DIMENSIONS.LANGUAGE, navigator.language.toLowerCase())
}

const renderApp = () => {
  browsercheck()
    .then(
      () => {
        // router starts only after browser check is ok
        router.start()

        const appContainer = (
          <AppContainer
            store={store}
            persistor={persistor}
            router={router}
          />
        )

        ReactDOM.render(appContainer, MOUNT_NODE)
      },
      (err) => {
        console.error(err)
      },
    )
    .catch((err) => {
      throw err
    })
}

if (!__DEV__) {
  renderApp()
} else {
  // ========================================================
  // HMR Setup
  // ========================================================
  const hmr: HMR = (module /* :: : Object */).hot

  if (hmr) {
    // Development render functions
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    const renderDev = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    hmr.accept('./pages/index', () => {
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)

        renderDev()
      })
    })
  }

  renderApp()
}

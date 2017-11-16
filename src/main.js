import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore'
import router from './routes/index'
import AppContainer from './AppContainer'

// ========================================================
// Browser History Setup
// ========================================================
const browserHistory = createBrowserHistory()

// ========================================================
// Store and History Instantiation
// ========================================================
// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the routerKey "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const initialState = window.___INITIAL_STATE__

const store = configureStore(initialState, browserHistory)

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: state => state.router,
})

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = router(store)

  ReactDOM.render(
    <AppContainer store={store} history={history} routes={routes} />,
    MOUNT_NODE
  )
}

// ========================================================
// HMR Setup
// ========================================================
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () => {
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    })
  }
}

// ========================================================
// Go!
// ========================================================
render()

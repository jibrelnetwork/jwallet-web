// @flow

import React from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import type { Persistor } from 'redux-persist/lib/types'
import { type Store, type Dispatch } from 'redux'
import { type AppAction } from 'routes'

import startSessionWatcher from 'utils/browser/startSessionWatcher'
import SingularTabBlockScreen from 'components/SingularTabBlockScreen/SingularTabBlockScreen'

type Props = {
  store: Store<AppState, AppAction, Dispatch<AppAction>>,
  routes: Object,
  history: Object,
  persistor: Persistor,
}

type State = {
  isSingleInstance: boolean,
}

class AppContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isSingleInstance: true,
    }
  }

  componentDidMount() {
    const { persistor, store } = this.props
    startSessionWatcher(
      persistor,
      store.dispatch,
      (isSingleInstance) => {
        this.setState({ isSingleInstance })
      }
    )
  }

  render() {
    const { store, persistor, history, routes } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          {this.state.isSingleInstance ?
            <PersistGate persistor={persistor}>
              <Router history={history}>
                {routes}
              </Router>
            </PersistGate> :
            <SingularTabBlockScreen />
          }
        </div>
      </Provider>
    )
  }
}

export default AppContainer

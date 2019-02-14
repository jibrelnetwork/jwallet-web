// @flow

import React from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import type { Persistor } from 'redux-persist/lib/types'

import type {
  Store,
  Dispatch,
} from 'redux'

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
  isPrimaryInstance: boolean,
}

class AppContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isPrimaryInstance: true,
    }
  }

  componentDidMount() {
    const {
      store,
      persistor,
    } = this.props

    startSessionWatcher(
      persistor,
      store.dispatch,
      (isPrimaryInstance) => {
        this.setState({ isPrimaryInstance })
      }
    )
  }

  render() {
    const {
      store,
      routes,
      history,
      persistor,
    } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          {this.state.isPrimaryInstance ?
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

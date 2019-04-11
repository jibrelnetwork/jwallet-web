// @flow

import React from 'react'
import { RouterProvider } from 'react-router5'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { type Persistor } from 'redux-persist/lib/types'

import {
  type Store,
  type Dispatch,
} from 'redux'

import { type AppAction } from 'store/modules'

import startSessionWatcher from 'utils/browser/startSessionWatcher'
import SingularTabBlockScreen from 'components/SingularTabBlockScreen/SingularTabBlockScreen'

import AppRouterContainer from './AppRouter'

type Props = {
  store: Store<AppState, AppAction, Dispatch<AppAction>>,
  router: Object,
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
      },
    )
  }

  render() {
    const {
      store,
      router,
      persistor,
    } = this.props

    return (
      <Provider store={store}>
        {this.state.isPrimaryInstance ? (
          <PersistGate persistor={persistor}>
            <RouterProvider router={router}>
              <AppRouterContainer />
            </RouterProvider>
          </PersistGate>
        ) :
          <SingularTabBlockScreen />
        }
      </Provider>
    )
  }
}

export default AppContainer

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

import startSessionWatcher from 'utils/browser/startSessionWatcher'
import SingularTabBlockScreen from 'components/SingularTabBlockScreen/SingularTabBlockScreen'
import { type AppAction } from 'store/modules'

import { AppRouter } from './AppRouter'

type Props = {|
  +router: Object,
  +persistor: Persistor,
  +store: Store<AppState, AppAction, Dispatch<AppAction>>,
|}

type ComponentState = {|
  +isPrimaryInstance: boolean,
|}

export class AppContainer extends React.Component<Props, ComponentState> {
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
      isPrimaryInstance => this.setState({ isPrimaryInstance }),
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
        {!this.state.isPrimaryInstance ? <SingularTabBlockScreen /> : (
          <PersistGate persistor={persistor}>
            <RouterProvider router={router}>
              <AppRouter />
            </RouterProvider>
          </PersistGate>
        )}
      </Provider>
    )
  }
}

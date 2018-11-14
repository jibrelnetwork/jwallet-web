// @flow

import CoreLayout from 'layouts/CoreLayout'

/*
import DigitalAssets from './DigitalAssets'
import Funds from './Funds'
import Transactions from './Transactions'
*/
import Terms from './Terms'
import Wallets from './Wallets'
import Settings from './Settings'
import NotFound from './NotFound'
import CustomAsset from './CustomAsset'

export default {
  path: '/',
  component: CoreLayout,
  indexRoute: {
    onEnter: (nextState: AppState, replace: (string) => void) => replace('/transactions'),
  },
  childRoutes: [
    /*
    DigitalAssets(store),
    Funds(store),
    Transactions(store),
    */
    Terms,
    Wallets,
    Settings,
    CustomAsset,
    NotFound,
  ],
}

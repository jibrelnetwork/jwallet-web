// @flow

import CoreLayout from 'layouts/CoreLayout'

/*
import DigitalAssets from './DigitalAssets'
import Funds from './Funds'
import Transactions from './Transactions'
*/
import CustomAsset from './CustomAsset'
import Wallets from './Wallets'
import NotFound from './NotFound'

export default {
  path: '/',
  component: CoreLayout,
  indexRoute: {
    onEnter: (nextState: State, replace: (string) => void) => replace('/transactions'),
  },
  childRoutes: [
    /*
    DigitalAssets(store),
    CustomAsset(store),
    Funds(store),
    Transactions(store),
    */
    CustomAsset,
    Wallets,
    NotFound,
  ],
}

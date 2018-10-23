// @flow

import CoreLayout from 'layouts/CoreLayout'

/*
import Funds from './Funds'
import Transactions from './Transactions'
*/
import DigitalAssets from './DigitalAssets'
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
    CustomAsset(store),
    Funds(store),
    Transactions(store),
    */
    DigitalAssets,
    CustomAsset,
    Wallets,
    NotFound,
  ],
}

// @flow

import CoreLayout from 'layouts/CoreLayout'

/*
import DigitalAssets from './DigitalAssets'
import CustomAsset from './CustomAsset'
import Funds from './Funds'
import Transactions from './Transactions'
*/
import Wallets from './Wallets'
import NotFound from './NotFound'

const createRoutes = () => ({
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
    Wallets,
    NotFound(),
  ],
})

export default createRoutes

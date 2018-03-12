import CoreLayout from 'layouts/CoreLayout'

import DigitalAssets from './DigitalAssets'
import AddCustomAsset from './AddCustomAsset'
import Funds from './Funds'
import Transactions from './Transactions'
import Wallets from './Wallets'

const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: { onEnter: (nextState, replace) => replace('/transactions') },
  childRoutes: [
    DigitalAssets(store),
    AddCustomAsset(store),
    Funds(store),
    Transactions(store),
    Wallets(store),
  ],
})

export default createRoutes

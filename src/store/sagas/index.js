// @flow

import { coreRootSaga } from './core'
import { tickerRootSaga } from './ticker'
import { balancesRootSaga } from './balances'
import { commentsRootSaga } from './comments'
import { upgradeRootSaga } from './upgrade'
import { favoritesRootSaga } from './favorites'
import { settingsRootSaga } from './settings'
import walletsSagas from './wallets'
import digitalAssetsSagas from './digitalAssets'

export default [
  coreRootSaga,
  tickerRootSaga,
  balancesRootSaga,
  commentsRootSaga,
  upgradeRootSaga,
  favoritesRootSaga,
  settingsRootSaga,
  ...walletsSagas,
  ...digitalAssetsSagas,
]

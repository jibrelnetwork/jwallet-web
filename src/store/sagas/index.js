// @flow

import { coreRootSaga } from './core'
import { notFoundRootSaga } from './notFound'
import { blocksRootSaga } from './blocks'
import { tickerRootSaga } from './ticker'
import { balancesRootSaga } from './balances'
import { commentsRootSaga } from './comments'
import { transactionsRootSaga } from './transactions'
import { upgradeRootSaga } from './upgrade'
import { favoritesRootSaga } from './favorites'
import { settingsRootSaga } from './settings'
import walletsSagas from './wallets'
import digitalAssetsSagas from './digitalAssets'

export default [
  coreRootSaga,
  notFoundRootSaga,
  blocksRootSaga,
  tickerRootSaga,
  balancesRootSaga,
  commentsRootSaga,
  transactionsRootSaga,
  upgradeRootSaga,
  favoritesRootSaga,
  settingsRootSaga,
  ...walletsSagas,
  ...digitalAssetsSagas,
]

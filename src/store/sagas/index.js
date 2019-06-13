// @flow strict

import { coreRootSaga } from './core'
import { blocksRootSaga } from './blocks'
import { tickerRootSaga } from './ticker'
import { balancesRootSaga } from './balances'
import { commentsRootSaga } from './comments'
import { transactionsRootSaga } from './transactions'
import { favoritesRootSaga } from './favorites'
import { settingsRootSaga } from './settings'
import walletsSagas from './wallets'
import digitalAssetsSagas from './digitalAssets'

export default [
  coreRootSaga,
  blocksRootSaga,
  tickerRootSaga,
  balancesRootSaga,
  commentsRootSaga,
  transactionsRootSaga,
  favoritesRootSaga,
  settingsRootSaga,
  ...walletsSagas,
  ...digitalAssetsSagas,
]

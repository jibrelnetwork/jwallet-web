// @flow strict

import { coreRootSaga } from './core'
import { blocksRootSaga } from './blocks'
import { tickerRootSaga } from './ticker'
import { toastsRootSaga } from './toasts'
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
  toastsRootSaga,
  balancesRootSaga,
  commentsRootSaga,
  transactionsRootSaga,
  favoritesRootSaga,
  settingsRootSaga,
  ...walletsSagas,
  ...digitalAssetsSagas,
]

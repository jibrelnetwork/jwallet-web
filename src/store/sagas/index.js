// @flow strict

import { userRootSaga } from './user'
import { blocksRootSaga } from './blocks'
import { tickerRootSaga } from './ticker'
import { balancesRootSaga } from './balances'
import { commentsRootSaga } from './comments'
import { transactionsRootSaga } from './transactions'
import walletsSagas from './wallets'
import digitalAssetsSagas from './digitalAssets'

export default [
  userRootSaga,
  blocksRootSaga,
  tickerRootSaga,
  balancesRootSaga,
  commentsRootSaga,
  transactionsRootSaga,
  ...walletsSagas,
  ...digitalAssetsSagas,
]

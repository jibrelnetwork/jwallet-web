// @flow

import { coreRootSaga } from './core'
import { blocksRootSaga } from './blocks'
import { tickerRootSaga } from './ticker'
import { balancesRootSaga } from './balances'
import { commentsRootSaga } from './comments'
import { transactionsRootSaga } from './transactions'

export default {
  coreRootSaga,
  blocksRootSaga,
  tickerRootSaga,
  balancesRootSaga,
  commentsRootSaga,
  transactionsRootSaga,
}

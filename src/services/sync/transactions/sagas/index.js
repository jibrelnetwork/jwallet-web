// @flow

import { coreRootSaga } from './core'
import { blocksRootSaga } from './blocks'
import { transactionsRootSaga } from './transactions'

export default [
  coreRootSaga,
  blocksRootSaga,
  transactionsRootSaga,
]

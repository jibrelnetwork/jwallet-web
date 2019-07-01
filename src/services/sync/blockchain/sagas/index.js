// @flow

import { coreRootSaga } from './core'
import { blocksRootSaga } from './blocks'

export default [
  coreRootSaga,
  blocksRootSaga,
]

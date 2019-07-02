// @flow strict

import { walletsRootSaga } from './core'
import { walletsCreateRootSaga } from './create'
import { walletsRenameRootSaga } from './rename'

export default [
  walletsRootSaga,
  walletsCreateRootSaga,
  walletsRenameRootSaga,
]

// @flow strict

import { walletsRootSaga } from './core'
import { walletsCreateRootSaga } from './create'

export default [
  walletsRootSaga,
  walletsCreateRootSaga,
]

// @flow strict

import { digitalAssetsRootSaga } from './core'
import { digitalAssetsAddRootSaga } from './add'

export default [
  digitalAssetsRootSaga,
  digitalAssetsAddRootSaga,
]

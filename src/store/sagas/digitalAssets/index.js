// @flow

import { digitalAssetsRootSaga } from './core'
import { digitalAssetsAddRootSaga } from './add'
import { digitalAssetsEditRootSaga } from './edit'

export default [
  digitalAssetsRootSaga,
  digitalAssetsAddRootSaga,
  digitalAssetsEditRootSaga,
]

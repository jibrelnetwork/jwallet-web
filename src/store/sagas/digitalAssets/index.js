// @flow

import { digitalAssetsRootSaga } from './core'
import { digitalAssetsAddRootSaga } from './add'
import { digitalAssetsEditRootSaga } from './edit'
import { digitalAssetsGridRootSaga } from './grid'

export default [
  digitalAssetsRootSaga,
  digitalAssetsAddRootSaga,
  digitalAssetsEditRootSaga,
  digitalAssetsGridRootSaga,
]

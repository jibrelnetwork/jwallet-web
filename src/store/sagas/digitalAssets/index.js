// @flow

import { digitalAssetsRootSaga } from './core'
import { digitalAssetsAddRootSaga } from './add'
import { digitalAssetsEditRootSaga } from './edit'
import { digitalAssetsGridRootSaga } from './grid'
import { digitalAssetsSendRootSaga } from './send'

export default [
  digitalAssetsRootSaga,
  digitalAssetsAddRootSaga,
  digitalAssetsEditRootSaga,
  digitalAssetsGridRootSaga,
  digitalAssetsSendRootSaga,
]

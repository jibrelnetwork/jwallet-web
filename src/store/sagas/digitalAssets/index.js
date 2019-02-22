// @flow

import { coreRootSaga } from './core'
import { addAssetRootSaga } from './addAsset'
import { editAssetRootSaga } from './editAsset'
import { gridRootSaga } from './grid'
import { sendRootSaga } from './send'

export default {
  coreRootSaga,
  addAssetRootSaga,
  editAssetRootSaga,
  gridRootSaga,
  sendRootSaga,
}

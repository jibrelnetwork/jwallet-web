// @flow

import {
  digitalAssetsRootSaga,
} from './core'

import {
  addAssetRootSaga,
} from './addAsset'

import {
  editAssetRootSaga,
} from './editAsset'

import {
  digitalAssetsGridRootSaga,
} from './digitalAssetsGrid'

import {
  digitalAssetsSendRootSaga,
} from './digitalAssetsSend'

export default {
  addAssetRootSaga,
  editAssetRootSaga,
  digitalAssetsRootSaga,
  digitalAssetsGridRootSaga,
  digitalAssetsSendRootSaga,
}

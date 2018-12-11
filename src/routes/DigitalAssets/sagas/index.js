// @flow

import {
  digitalAssetsRootSaga,
} from './digitalAssets'

import {
  addAssetRootSaga,
} from '../routes/AddAsset/sagas/addAsset'

import {
  editAssetRootSaga,
} from '../routes/EditAsset/sagas/editAsset'

import {
  digitalAssetsGridRootSaga,
} from '../routes/Grid/sagas/digitalAssetsGrid'

import {
  digitalAssetsSendRootSaga,
} from '../routes/Send/sagas/digitalAssetsSend'

export default {
  addAssetRootSaga,
  editAssetRootSaga,
  digitalAssetsRootSaga,
  digitalAssetsGridRootSaga,
  digitalAssetsSendRootSaga,
}

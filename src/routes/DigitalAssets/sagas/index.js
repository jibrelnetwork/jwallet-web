// @flow

import {
  digitalAssetsRootSaga,
} from './digitalAssets'

import {
  addAssetRootSaga,
} from '../routes/AddAsset/sagas/addAsset'

import {
  digitalAssetsGridRootSaga,
} from '../routes/Grid/sagas/digitalAssetsGrid'

export default {
  addAssetRootSaga,
  digitalAssetsRootSaga,
  digitalAssetsGridRootSaga,
}

// @flow

import {
  type DigitalAssetsActions,
} from './digitalAssets'

import {
  type DigitalAssetsGridActions,
} from '../routes/Grid/modules/digitalAssetsGrid'

import {
  type AddAssetActions,
} from '../routes/AddAsset/modules/addAsset'

import {
  type EditAssetActions,
} from '../routes/EditAsset/modules/editAsset'

export type DigitalAssetsAllActions = DigitalAssetsActions |
  DigitalAssetsGridActions |
  AddAssetActions |
  EditAssetActions

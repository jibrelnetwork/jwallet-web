// @flow

import {
  type DigitalAssetsAction,
} from './digitalAssets'

import {
  type DigitalAssetsGridAction,
} from '../routes/Grid/modules/digitalAssetsGrid'

import {
  type AddAssetAction,
} from '../routes/AddAsset/modules/addAsset'

import {
  type EditAssetAction,
} from '../routes/EditAsset/modules/editAsset'

export type DigitalAssetsModuleAction = DigitalAssetsAction |
  DigitalAssetsGridAction |
  AddAssetAction |
  EditAssetAction

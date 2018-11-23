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

// exported interface
export {
  setAssetIsActive,
  deleteCustomAsset,
  ADD_CUSTOM_ASSET_SUCCESS,
  SET_ASSET_IS_ACTIVE,
  DELETE_ASSET_REQUEST, // calls called before delete asset from db
  DELETE_ASSET_SUCCESS, // calls when asset removed from db
} from './digitalAssets'

export type DigitalAssetsModuleAction = DigitalAssetsAction |
  DigitalAssetsGridAction |
  AddAssetAction |
  EditAssetAction

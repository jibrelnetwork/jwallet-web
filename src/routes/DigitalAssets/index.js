// @flow

import { AsideLayout } from 'layouts'

import digitalAssets, {
  type DigitalAssetsActions,
} from './modules/digitalAssets'

import digitalAssetsGrid, {
  type DigitalAssetsGridActions,
} from './routes/Grid/modules/digitalAssetsGrid'

import addAsset, {
  type AddAssetActions,
} from './routes/AddAsset/modules/addAsset'

import { digitalAssetsRootSaga } from './sagas/digitalAssets'
import { addAssetRootSaga } from './routes/AddAsset/sagas/addAsset'

import Grid from './routes/Grid'
import AddAsset from './routes/AddAsset'

export const reducers = {
  digitalAssets,
  digitalAssetsGrid,
  addAsset,
}

export const sagas = {
  addAssetRootSaga,
  digitalAssetsRootSaga,
}

export {
  ADD_ASSET,
  REMOVE_ASSET,
  UPDATE_ASSET,
} from './modules/digitalAssets'

export type DigitalAssetsAllActions = DigitalAssetsActions |
  DigitalAssetsGridActions |
  AddAssetActions

export default {
  path: 'digital-assets',
  component: AsideLayout,
  indexRoute: {
    onEnter: (nextState: AppState, replace: (string) => void) => replace('/digital-assets/grid'),
  },
  childRoutes: [
    Grid,
    AddAsset,
  ],
}

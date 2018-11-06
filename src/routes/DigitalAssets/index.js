// @flow

import { AsideLayout } from 'layouts'

import digitalAssets, {
  type DigitalAssetsActions,
} from './modules/digitalAssets'

import digitalAssetsGrid, {
  type DigitalAssetsGridActions,
} from './routes/Grid/modules/digitalAssetsGrid'

// import addAssetForm from './routes/Add/modules/addAssetForm'

import { digitalAssetsRootSaga } from './sagas/digitalAssets'

import Grid from './routes/Grid'

export const reducers = {
  digitalAssets,
  digitalAssetsGrid,
  // addAssetForm,
}

export const sagas = {
  digitalAssetsRootSaga,
}

export {
  ADD_ASSET,
  REMOVE_ASSET,
  UPDATE_ASSET,
} from './modules/digitalAssets'

export type DigitalAssetsAllActions = DigitalAssetsActions
  | DigitalAssetsGridActions

export default {
  path: 'digital-assets',
  component: AsideLayout,
  indexRoute: {
    onEnter: (nextState: AppState, replace: (string) => void) => replace('/digital-assets/grid'),
  },
  childRoutes: [
    Grid,
  ],
}

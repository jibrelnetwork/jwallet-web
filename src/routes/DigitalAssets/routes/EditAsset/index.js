// @flow

import { ga } from 'utils/analytics'
import EditAssetContainer from './EditAssetContainer'

const EditAsset = {
  path: 'edit-asset/:assetAddress',
  onEnter: (nextState: ReactRouterState): void =>
    ga(
      'send',
      'pageview',
      nextState.location.pathname
    ),
  component: EditAssetContainer,
}

export default EditAsset

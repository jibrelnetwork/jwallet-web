// @flow

import { gaSendPageView } from 'utils/analytics'
import EditAssetContainer from './EditAssetContainer'

const EditAsset = {
  path: 'edit-asset/:assetAddress',
  onEnter: (nextState: ReactRouterState): void =>
    gaSendPageView(
      nextState.location.pathname,
    ),
  component: EditAssetContainer,
}

export default EditAsset

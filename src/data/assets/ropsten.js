// @flow

import transformation from 'utils/digitalAssets/transformation'
import assetsRopsten from '../../../assets/ropsten/assets.json'

// Add here addresses if asset `isCustom`
const customAssets = []

const ROPSTEN_ASSETS = transformation(assetsRopsten, customAssets)

export default ROPSTEN_ASSETS

// @flow

import { connect } from 'react-redux'

import getActiveDigitalAssetsData from 'utils/digitalAssets/getActiveDigitalAssetsData'

import AssetPicker from './AssetPicker'

const mapStateToProps: Function = ({ digitalAssets }: State): {
  activeAssets: Array<DigitalAssetMainDataWithBalance>,
} => ({
  activeAssets: getActiveDigitalAssetsData(digitalAssets),
})

export default connect(mapStateToProps)(AssetPicker)


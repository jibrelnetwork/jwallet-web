// @flow

import { connect } from 'react-redux'

import getActiveDigitalAssetsData from 'utils/digitalAssets/getActiveDigitalAssetsData'

import AssetPicker from './AssetPicker'

const mapStateToProps: Function = ({ digitalAssets }: State): {
  activeAssets: Array<DigitalAssetMainDataWithBalance>,
  isLoading: boolean,
} => ({
  activeAssets: getActiveDigitalAssetsData(digitalAssets),
  isLoading: digitalAssets.isBalancesLoading,
})

export default connect(mapStateToProps)(AssetPicker)


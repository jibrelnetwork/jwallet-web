// @flow

import { connect } from 'react-redux'

import AssetPicker from './AssetPicker'

const mapStateToProps: Function = ({ digitalAssets }: State): {
  items: DigitalAssets,
  balances: Balances,
} => ({
  items: digitalAssets.items,
  balances: digitalAssets.balances,
})

export default connect(mapStateToProps)(AssetPicker)


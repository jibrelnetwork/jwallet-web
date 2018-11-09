// @flow

import { compose } from 'ramda'
import { connect } from 'react-redux'
import { withState } from 'recompose'

import { setActive } from 'routes/DigitalAssets/modules/digitalAssets'

// temporary disable this
// import { setEditAddress } from 'routes/CustomAsset/modules/customAsset'

import DigitalAssets from './DigitalAssets'

const mapStateToProps: Function = ({ digitalAssets }: AppState): DigitalAssetsData => digitalAssets

const mapDispatchToProps: {
  setActive: Function,
  editCustomAsset: Function,
} = {
  setActive,
  // temporary disable this
  editCustomAsset: () => null, // setEditAddress,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('hoveredAsset', 'hover', null),
)(DigitalAssets)

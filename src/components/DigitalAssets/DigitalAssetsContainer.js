// @flow

import { compose } from 'ramda'
import { connect } from 'react-redux'
import { withState } from 'recompose'

import { setActive } from 'routes/DigitalAssets/modules/digitalAssets'
import { setEditAddress } from 'routes/CustomAsset/modules/customAsset'

import DigitalAssets from './DigitalAssets'

const mapStateToProps: Function = ({ digitalAssets }: State): DigitalAssetsData => digitalAssets

const mapDispatchToProps: {
  setActive: Function,
  editCustomAsset: Function,
} = {
  setActive,
  editCustomAsset: setEditAddress,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('hoveredAsset', 'hover', null),
)(DigitalAssets)

// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import { init as initNetworks } from 'routes/modules/networks'

import {
  setActive,
} from 'routes/DigitalAssets/modules/digitalAssets'

import AssetsStep from '../components/AssetsStep'

const mapStateToProps = ({ digitalAssets }: State): DigitalAssetsData => digitalAssets

const mapDispatchToProps = {
  initNetworks,
  setActive,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.initNetworks() },
  }),
)(AssetsStep)

// @flow

import { connect } from 'react-redux'

import DigitalAssetsGridView from './DigitalAssetsGridView'

import {
  openView,
  closeView,
} from '../../modules/digitalAssets'

const mapStateToProps = ({ digitalAssets }: State) => ({
  items: digitalAssets.items,
  balances: digitalAssets.balances,
})

const mapDispatchToProps = {
  openView,
  closeView,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DigitalAssetsGridView)

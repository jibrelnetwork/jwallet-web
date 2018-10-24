// @flow

import { connect } from 'react-redux'

import { DigitalAssetsGrid } from 'components'

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
)(DigitalAssetsGrid)

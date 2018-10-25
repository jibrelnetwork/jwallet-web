// @flow

import { connect } from 'react-redux'

import DigitalAssetsGridView from './DigitalAssetsGridView'

import {
  openView,
  closeView,
  setSearchQuery,
} from '../../modules/digitalAssets'

const mapStateToProps = ({ digitalAssets }: State) => ({
  items: digitalAssets.items,
  balances: digitalAssets.balances,
  searchQuery: digitalAssets.searchQuery,
})

const mapDispatchToProps = {
  openView,
  closeView,
  setSearchQuery,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DigitalAssetsGridView)

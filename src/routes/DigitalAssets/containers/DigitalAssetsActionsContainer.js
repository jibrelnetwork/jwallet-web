// @flow

import { connect } from 'react-redux'

import DigitalAssetsActions from '../components/DigitalAssetsActions'
import { search } from '../modules/digitalAssets'

const mapStateToProps = ({ digitalAssets }: State): {
  searchQuery: string,
} => ({
  searchQuery: digitalAssets.searchQuery,
})

const mapDispatchToProps = {
  search,
}

export default connect(mapStateToProps, mapDispatchToProps)(DigitalAssetsActions)

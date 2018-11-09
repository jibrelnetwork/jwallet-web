// @flow

import lifecycle from 'recompose/lifecycle'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { open, close, search } from 'routes/DigitalAssets/modules/digitalAssets'

import DigitalAssetsLayout from './DigitalAssetsLayout'

const mapStateToProps: Function = ({ digitalAssets }: AppState): {
  searchQuery: string,
} => ({
  searchQuery: digitalAssets.searchQuery,
})

const mapDispatchToProps: {
  open: Function,
  close: Function,
  search: Function,
  goToCustomAssetAdd: Function,
} = {
  open,
  close,
  search,
  goToCustomAssetAdd: () => push('/custom-asset/add'),
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open() },
    componentWillUnmount() { this.props.close() },
  }),
)(DigitalAssetsLayout)

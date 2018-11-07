// @flow

import { connect } from 'react-redux'
import { selectAddAsset } from 'store/stateSelectors'

import {
  openView,
  closeView,
  setField,
} from './modules/addAsset'

import AddAssetView from './AddAssetView'

function mapStateToProps(state: AppState) {
  const { formFields, invalidFields, isAssetLoading } = selectAddAsset(state)

  return {
    formFields,
    invalidFields,
    isAddressLoading: isAssetLoading,
  }
}

const mapDispatchToProps = {
  open: openView,
  close: closeView,
  setField,
  // submit
  // closeClick
}

type OwnProps = {||}

/* eslint-disable no-undef */
export default (
  connect < AppState, any, OwnProps, _, _ > (mapStateToProps, mapDispatchToProps)
)(AddAssetView)
/* eslint-enable no-undef */

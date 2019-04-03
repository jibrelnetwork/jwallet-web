// @flow

import { connect } from 'react-redux'

import { router5BackOrFallbackFunctionCreator } from 'utils/browser'
import { selectAddAsset } from 'store/selectors/digitalAssets'

import {
  openView,
  setField,
  closeView,
  submitAssetForm,
} from 'store/modules/addAsset'

import AddAssetView from './AddAssetView'

function mapStateToProps(state: AppState) {
  const {
    formFields,
    invalidFields,
    isAssetLoading,
  }: AddAssetState = selectAddAsset(state)

  return {
    formFields,
    invalidFields,
    isAddressLoading: isAssetLoading,
    close: router5BackOrFallbackFunctionCreator(
      state.router.previousRoute,
      'Wallet',
    ),
  }
}

const mapDispatchToProps = {
  openView,
  setField,
  closeView,
  submit: submitAssetForm,
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(AddAssetView)

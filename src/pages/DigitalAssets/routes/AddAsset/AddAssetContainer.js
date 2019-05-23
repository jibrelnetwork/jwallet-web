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

// eslint-disable-next-line import/no-duplicates
import AddAssetView from './AddAssetView'

// eslint-disable-next-line import/no-duplicates
import { type Props } from './AddAssetView'

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
  connect< Props, OwnPropsEmpty, _, _, _, _ >(mapStateToProps, mapDispatchToProps)
)(AddAssetView)

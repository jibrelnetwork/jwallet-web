// @flow strict

import { connect } from 'react-redux'

import { selectAddAsset } from 'store/selectors/digitalAssets'

import {
  openView,
  setField,
  closeView,
  submitAssetForm,
} from 'store/modules/addAsset'

// eslint-disable-next-line import/no-duplicates
import {
  type Props,
  AddAssetView,
} from './AddAssetView'

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
  }
}

const mapDispatchToProps = {
  openView,
  setField,
  closeView,
  submit: submitAssetForm,
}

export const AssetsItemAdd = connect<Props, OwnPropsEmpty, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(AddAssetView)

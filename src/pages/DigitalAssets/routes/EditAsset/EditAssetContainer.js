// @flow

import { connect } from 'react-redux'

import { router5BackOrFallbackFunctionCreator } from 'utils/browser'
import { selectEditAsset } from 'store/selectors/digitalAssets'

import {
  openView,
  setField,
  submitAssetForm,
} from 'store/modules/editAsset'

// eslint-disable-next-line import/no-duplicates
import EditAssetView from './EditAssetView'

// eslint-disable-next-line import/no-duplicates
import { type Props } from './EditAssetView'

type OwnProps = {|
  +params: {|
    +assetAddress: Address,
  |},
|}

function mapStateToProps(state: AppState, ownProps: OwnProps) {
  const {
    formFields,
    invalidFields,
  }: EditAssetState = selectEditAsset(state)

  const { assetAddress } = ownProps.params

  return {
    formFields,
    invalidFields,
    address: assetAddress,
    close: router5BackOrFallbackFunctionCreator(
      state.router.previousRoute,
      'Wallet',
    ),
  }
}

const mapDispatchToProps = {
  openView,
  setField,
  submit: submitAssetForm,
}

export default (
  connect< Props, OwnProps, _, _, _, _ >(mapStateToProps, mapDispatchToProps)
)(EditAssetView)

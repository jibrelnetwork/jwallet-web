// @flow

import { connect } from 'react-redux'

import { router5BackOrFallbackFunctionCreator } from 'utils/browser'
import { selectEditAsset } from 'store/selectors/digitalAssets'

import {
  openView,
  setField,
  submitAssetForm,
} from 'store/modules/editAsset'

import EditAssetView from './EditAssetView'

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
  connect/* :: < AppState, any, OwnProps, _, _ > */(mapStateToProps, mapDispatchToProps)
)(EditAssetView)

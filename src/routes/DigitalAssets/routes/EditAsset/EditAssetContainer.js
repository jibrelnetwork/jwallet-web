// @flow

import { connect } from 'react-redux'

import { reactRouterBack } from 'utils/browser'
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
  }
}

const mapDispatchToProps = {
  openView,
  setField,
  submit: submitAssetForm,
  close: () => reactRouterBack({ fallbackUrl: '/digital-assets' }),
}

export default (
  connect/* :: < AppState, any, OwnProps, _, _ > */(mapStateToProps, mapDispatchToProps)
)(EditAssetView)

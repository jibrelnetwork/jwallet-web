// @flow

import { connect } from 'react-redux'
import { selectEditAsset } from 'store/stateSelectors'
import { reactRouterBack } from 'utils/browser'

import {
  openView,
  setField,
  submitAssetForm,
} from './modules/editAsset'

import EditAssetView from './EditAssetView'

type OwnProps = {|
  +params: {|
    +assetAddress: Address,
  |},
|}

function mapStateToProps(state: AppState, ownProps: OwnProps) {
  const { formFields, invalidFields } = selectEditAsset(state)
  const {
    params: {
      assetAddress,
    },
  } = ownProps

  return {
    formFields,
    invalidFields,
    address: assetAddress,
  }
}

const mapDispatchToProps = {
  openView,
  submit: submitAssetForm,
  setField,
  closeClick: () => reactRouterBack({ fallbackUrl: '/digital-assets' }),
}

export default (
  connect/* :: < AppState, any, OwnProps, _, _ > */(mapStateToProps, mapDispatchToProps)
)(EditAssetView)

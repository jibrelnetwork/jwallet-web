// @flow

import { connect } from 'react-redux'
import { selectEditAsset } from 'store/stateSelectors'
import { backOrFallback } from 'routes/modules'
import { type AppActions } from 'routes'

import {
  openView,
  submitAssetForm,
} from './modules/editAsset'

import EditAssetView from './EditAssetView'

type OwnProps = {|
  params: {|
    assetAddress: Address,
  |},
|}

type Dispatch = AppActions => AppActions

function mapStateToProps(state: AppState) {
  const { formFields, invalidFields } = selectEditAsset(state)

  return {
    formFields,
    invalidFields,
  }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => ({
  openView: () => dispatch(openView(ownProps.params.assetAddress)),
  submit: () => dispatch(submitAssetForm()),
  closeClick: () => dispatch(backOrFallback('/digital-assets')),
})

export default (
  connect/* :: < AppState, Dispatch, OwnProps, _, _ > */(mapStateToProps, mapDispatchToProps)
)(EditAssetView)

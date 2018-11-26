// @flow

import { connect } from 'react-redux'
import { selectAddAsset } from 'store/stateSelectors'
import { reactRouterBack } from 'utils/browser'

import {
  openView,
  closeView,
  setField,
  submitAssetForm,
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
  openView,
  closeView,
  setField,
  submit: submitAssetForm,
  closeClick: () => reactRouterBack({ fallbackUrl: '/digital-assets' }),
}

// eslint-disable-next-line no-unused-vars
type OwnProps = {||}

export default (
  connect/* :: < AppState, any, OwnProps, _, _ > */(mapStateToProps, mapDispatchToProps)
)(AddAssetView)

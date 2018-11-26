// @flow

import { connect } from 'react-redux'
import { selectAddAsset } from 'store/selectors/digitalAssets'
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

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(AddAssetView)

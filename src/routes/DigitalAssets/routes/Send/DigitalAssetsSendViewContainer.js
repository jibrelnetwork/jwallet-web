// @flow

import { connect } from 'react-redux'

import { reactRouterBack } from 'utils/browser'
import {
  selectDigitalAssetsSend,
} from 'store/selectors/digitalAssets'

import {
  openView,
  closeView,
  setField,
} from './modules/digitalAssetsSend'

import DigitalAssetsSendView from './DigitalAssetsSendView'

type OwnProps = {|
  +params: {
    +to?: string,
    +asset?: string,
    +txhash?: string,
  }
|}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
  const { params } = ownProps
  const {
    formFields,
    invalidFields,
  } = selectDigitalAssetsSend(state)

  return {
    params,
    formFields,
    invalidFields,
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
  setField,
  closeClick: () => reactRouterBack({ fallbackUrl: '/digital-assets' }),
}

export default (
  connect/* :: < AppState, any, OwnProps, _, _> */(mapStateToProps, mapDispatchToProps)
)(DigitalAssetsSendView)

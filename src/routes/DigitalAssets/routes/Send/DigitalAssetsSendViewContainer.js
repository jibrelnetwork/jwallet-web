// @flow

import { connect } from 'react-redux'

import { reactRouterBack } from 'utils/browser'

import {
  selectDigitalAsset,
  selectDigitalAssetsSend,
} from 'store/selectors/digitalAssets'

import {
  selectAddressName,
} from 'store/selectors/wallets'

import {
  openView,
  closeView,
  setField,
  submitSendForm,
  submitPasswordForm,
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
  const { params } = ownProps // router params
  const {
    step,
    formFields,
    invalidFields,
    isProcessing,
  } = selectDigitalAssetsSend(state)

  const {
    amount,
    assetAddress,
  } = formFields

  // get asset symbol
  const asset: ?DigitalAsset = selectDigitalAsset(state, assetAddress)
  const amountCurrency = (asset && asset.symbol) ? asset.symbol : ''

  const feeETH = '0.00'
  const fromName = selectAddressName(state, formFields.ownerAddress)
  const toName = selectAddressName(state, formFields.recepient)

  return {
    step,
    params,
    formFields,
    invalidFields,
    // step 2
    amount,
    amountCurrency,
    feeETH,
    fromName,
    toName,
    isLoading: isProcessing,
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
  setField,
  submitSendForm,
  submitPasswordForm,
  closeClick: () => reactRouterBack({ fallbackUrl: '/digital-assets' }),
}

export default (
  connect/* :: < AppState, any, OwnProps, _, _> */(mapStateToProps, mapDispatchToProps)
)(DigitalAssetsSendView)
